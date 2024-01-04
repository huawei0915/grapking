/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from 'app/modules/admin/api.service';
import { environment as env } from 'environments/environment';
import { take } from 'rxjs';

@Component({
    selector: 'app-shared-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomerFormComponent implements OnInit {
    // Template reference variable
    @ViewChildren('clientDetailView') clientDetailView: QueryList<ElementRef>;

    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //肯定事件

    @Input() dataInject: any;
    form: FormGroup;
    alertPOPUP = false;
    showToast = false;
    message = 'dialog_confirm_exit_message';
    confirmButtonOnly = false;

    clientBindingCheck = false;
    clientBindingData: any;
    clientData = [];
    searchText = '';
    confirmButtonClick = false;

    i18nText: any;


    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
        private _renderer: Renderer2
    ) {
    }

    ngOnInit(): void {
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });

        this.form = this._formBuilder.group({
            id: [(this.dataInject?.id) ?? ''],
            type: [(this.dataInject?.type) ?? ''],
            company_name_zh: [(this.dataInject?.company_name_zh) ?? ''],
            company_name_en: [(this.dataInject?.company_name_en) ?? ''],
            name: [(this.dataInject?.name) ?? ''],
            phone_number: [(this.dataInject?.phone_number) ?? ''],
            social_media: [(this.dataInject?.social_media) ?? ''],
            email: [(this.dataInject?.email) ?? ''],
            avatar: [(this.dataInject?.avatar) ?? ''],
            namecard: [(this.dataInject?.namecard) ?? ''],
            description: [(this.dataInject?.description) ?? ''],
            recommended_company: [(this.dataInject?.recommended_company) ?? ''],
            relationship: [(this.dataInject?.relationship) ?? ''],
            creator: [(this.dataInject?.creator) ?? ''],
            updater: [(this.dataInject?.updater) ?? ''],
            is_valid: [(this.dataInject?.is_valid) ?? ''],
            createdAt: [(this.dataInject?.createdAt) ?? ''],
            updatedAt: [(this.dataInject?.updatedAt) ?? '']
        });

    }

    //==============================================================
    //api callback
    //==============================================================
    // 取得客戶清單
    async getClient(): Promise<void> {
        await this._apiService.getClient().then((result) => {
            // console.log('result:::', [...result]);
            this.clientData = [...result];
        });
    }

    //==============================================================
    //Modal Behavior
    //==============================================================
    // 觸發綁定帳戶視窗
    openClientModal(): void {
        this.getClient().then(() => {
            this.searchText = '';
            this.clientBindingCheck = true;
            this.clientBindingData = [];
        });
    }

    // 確認綁定帳戶
    async confrimClientModal(): Promise<void> {
        this.form.get('name').setValue(this.clientBindingData['name']);
        this.form.get('client_id').setValue(this.clientBindingData['id']);
        this.closeClientModal();
    }

    // 關閉綁定帳戶視窗
    closeClientModal(): void {
        this.clientBindingCheck = false;
    }

    //==============================================================
    //Common Function
    //==============================================================

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    handleCancel(): void {
        this.confirmButtonClick = false;
        this.alertPOPUP = true;
        this.confirmButtonOnly = false;
        this.message = 'dialog_confirm_exit_message';
    }

    confrimCancel(): void {
        this.alertPOPUP = false;
        this.confirmButtonOnly = false;
    }

    confrimOK(): void {
        this.alertPOPUP = false;
        this.confirmButtonOnly = false;
        // this.form.reset();
        if (!this.confirmButtonClick) {
            this.cancelEvent.emit();
        }
    }

    handleSave(): void {
        this.confirmButtonClick = true;
        const data = this.form.getRawValue();
        this._apiService.updateDemand(data).then((result) => {
            console.log(result);
            this.showToast = true;
            setTimeout(() => this.showToast = false, 1500);
        }).catch((err) => {
            this.confirmButtonOnly = true;
            console.log('fail', err);
            this.alertPOPUP = true;
            this.message = 'an_error_occurred';
        }).finally(() => {
            this.submitEvent.emit();
        });
    }

    //==============================================================
    //Account choosen function
    //==============================================================
    // 綁定客戶，假設只能綁一個
    chooseClient(inputElement: any, dataInject: any): void {
        // inputElement.hasAttribute('isChosen')
        this.clientDetailView.forEach((elementRef: ElementRef) => {
            this._renderer.removeAttribute(elementRef.nativeElement, 'isChosen');
        });
        this._renderer.setAttribute(inputElement, 'isChosen', '');
        this.clientBindingData = dataInject;
    }

    // 過濾客戶清單
    getFilteredClient(cateString: string): any[] {
        if (cateString !== '') {
            cateString = cateString.toLowerCase();
            return this.clientData.filter(
                client => (
                    client.id?.toLowerCase().includes(cateString) ||
                    client.company_name_zh?.toLowerCase().includes(cateString) ||
                    client.company_name_en?.toLowerCase().includes(cateString) ||
                    client.name?.toLowerCase().includes(cateString)));
        } else {
            return this.clientData;
        }
    }

    // 寫入搜尋欄位
    setSearchText(event: any): void {
        this.searchText = event.target.value;
    }
}
