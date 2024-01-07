/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from 'app/modules/admin/api.service';
import { environment as env } from 'environments/environment';
import { take } from 'rxjs';

@Component({
    selector: 'app-shared-demmand-form',
    templateUrl: './demmand-form.component.html',
    styleUrls: ['./demmand-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemmandFormComponent implements OnInit {
    // Template reference variable
    @ViewChildren('clientDetailView') clientDetailView: QueryList<ElementRef>;

    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //肯定事件

    @Input() dataInject: any;
    demmandForm: FormGroup;
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

    searchText3 = '';


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

        this.demmandForm = this._formBuilder.group({
            client_id: [(this.dataInject?.client?.id) ?? ''],
            name: [(this.dataInject?.client?.name) ?? ''],
            title: [(this.dataInject?.title) ?? ''],
            form: [(this.dataInject?.form) ?? ''],
            daily_intake: [(this.dataInject?.daily_intake) ?? ''],
            package: [(this.dataInject?.package) ?? ''],
            validity: [(this.dataInject?.validity) ?? ''],
            estimate_cost: [(this.dataInject?.estimate_cost) ?? ''],
            sale_country: [(this.dataInject?.sale_country) ?? ''],
            sale_method: [(this.dataInject?.sale_method) ?? ''],
            health_demand: [(this.dataInject?.health_demand) ?? ''],
            health_group: [(this.dataInject?.health_group) ?? ''],
            effect: [(this.dataInject?.effect) ?? ''],
            flavor: [(this.dataInject?.flavor) ?? ''],
            competitor: [(this.dataInject?.competitor) ?? ''],
            certification: [(this.dataInject?.certification) ?? ''],
            requirement: [(this.dataInject?.requirement) ?? ''],
            note: [(this.dataInject?.note) ?? ''],
            department: [(this.dataInject?.department) ?? ''],
            id: [(this.dataInject?.id) ?? ''],
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
        this.demmandForm.get('name').setValue(this.clientBindingData['name']);
        this.demmandForm.get('client_id').setValue(this.clientBindingData['id']);
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

    getDefaultImg(input: any): void {
        input.src = 'assets/images/logo.png';
        this._renderer.setStyle(input, 'display', 'none');
        // eslint-disable-next-line max-len
        this._renderer.setProperty(input.parentNode, 'innerHTML', '<mat-icon role="img" svgicon="mat_solid:person" class="text-white mat-icon notranslate mat-icon-no-color" aria-hidden="true" ng-reflect-svg-icon="mat_solid:person" data-mat-icon-type="svg" data-mat-icon-name="person" data-mat-icon-namespace="mat_solid"><svg viewBox="0 0 24 24" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></mat-icon>');
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
        const data = this.demmandForm.getRawValue();
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
                    // client.id?.toLowerCase().includes(cateString) ||
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


    //==============================================================
    //Input Behavior
    //==============================================================
    showDeleteButton(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.setAttribute(inputElement, inputElement.getAttribute('formControlName'), '');
    }

    hideDeleteButton(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.removeAttribute(inputElement, inputElement.getAttribute('formControlName'));
    }

    clearInputText(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        inputElement.value = '';
    }
}
