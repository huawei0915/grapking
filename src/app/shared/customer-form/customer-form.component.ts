/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
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
    @Output() editEvent = new EventEmitter();  //肯定事件
    @Output() addEvent = new EventEmitter();  //新增客戶事件
    @Output() homeEvent = new EventEmitter();  //回到客戶清單

    @Input() dataInject: any;
    @Input() originName = '';
    @Input() addClientCheck = false;
    customerForm: FormGroup;
    alertPOPUP = false;
    showToast = false;
    message = 'dialog_confirm_exit_message';
    confirmButtonOnly = false;

    confirmButtonClick = false;

    i18nText: any;

    selectedFile: File | null = null;
    selectedNameCard: File | null = null;
    uploadImgformAvatar: any;
    uploadImgformNameCard: any;

    clientId = '';


    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
        private _renderer: Renderer2,
        private _httpClient: HttpClient
    ) {
    }

    ngOnInit(): void {
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });
        this.clientId = (this.dataInject?.id) ?? '';
        this.customerForm = this._formBuilder.group({
            type: [(this.dataInject?.type) ?? ''],
            company_name_zh: [(this.dataInject?.company_name_zh) ?? ''],
            company_name_en: [(this.dataInject?.company_name_en) ?? ''],
            name: [(this.dataInject?.name) ?? ''],
            phone_number: [(this.dataInject?.phone_number) ?? ''],
            social_media: [(this.dataInject?.social_media) ?? ''],
            email: [(this.dataInject?.email) ?? ''],
            namecard: [(this.dataInject?.namecard) ?? ''],
            description: [(this.dataInject?.description) ?? ''],
            recommended_company: [(this.dataInject?.recommended_company) ?? ''],
            relationship: [(this.dataInject?.relationship) ?? '']
        });

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
        if (this.addClientCheck) {
            this.addEvent.emit();
        } else {
            this.editEvent.emit();
        }

    }

    onFileSelected(event: any, type: string): void {
        const file = event.target.files[0];
        if (file) {
            this.readImage(file, type);
        }
    }

    readImage(file: File, type: string): void {
        if (type === 'avatar') {
            this.uploadImgformAvatar = new FormData();
            this.uploadImgformAvatar.append('file', file, file.name);
            this.uploadImgformAvatar.append('column', 'avatar');
            const reader = new FileReader();
            reader.onload = (e: any): void => {
                this.selectedFile = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        if (type === 'namecard') {
            this.uploadImgformNameCard = new FormData();
            this.uploadImgformNameCard.append('file', file, file.name);
            this.uploadImgformNameCard.append('column', 'namecard');
            const reader = new FileReader();
            reader.onload = (e: any): void => {
                this.selectedNameCard = e.target.result;
            };
            reader.readAsDataURL(file);
        }
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
