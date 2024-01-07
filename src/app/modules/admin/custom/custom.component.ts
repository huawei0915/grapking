/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit, QueryList, ElementRef, EventEmitter, Renderer2, ViewChildren, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { ApiService } from '../api.service';
import { take } from 'rxjs';

@Component({
    selector: 'custom',
    templateUrl: './custom.component.html',
    styleUrls: ['./custom.comonent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomComponent implements OnInit {
    // Template reference variable
    @ViewChildren('clientDetailView') clientDetailView: QueryList<ElementRef>;

    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //肯定事件

    @Input() dataInject: any;

    clientData = [];
    searchText = '';
    showToast = false;

    i18nText: any;

    openCustomerFormCheck = false;
    editData: any;

    uploadImgformData: any;

    addClientCheck = false;
    agreementPageCheck = false;

    deleteCheck = false;
    deleteId = '';

    clientDetail: any;
    clientDetailCheck = false;

    selectedFile = '';

    demandArr = [];

    demandDetailData: any;
    editDemandCheck = false;
    editDemandData: any;

    odmPageCheck = false;

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
        this.getClient();
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });
        //     client_id: [(this.dataInject?.client?.id) ?? ''],
        //     name: [(this.dataInject?.client?.name) ?? ''],
        //     title: [(this.dataInject?.title) ?? ''],
        //     form: [(this.dataInject?.form) ?? ''],
        //     daily_intake: [(this.dataInject?.daily_intake) ?? ''],
        //     package: [(this.dataInject?.package) ?? ''],
        //     validity: [(this.dataInject?.validity) ?? ''],
        //     estimate_cost: [(this.dataInject?.estimate_cost) ?? ''],
        //     sale_country: [(this.dataInject?.sale_country) ?? ''],
        //     sale_method: [(this.dataInject?.sale_method) ?? ''],
        //     health_demand: [(this.dataInject?.health_demand) ?? ''],
        //     health_group: [(this.dataInject?.health_group) ?? ''],
        //     effect: [(this.dataInject?.effect) ?? ''],
        //     flavor: [(this.dataInject?.flavor) ?? ''],
        //     competitor: [(this.dataInject?.competitor) ?? ''],
        //     certification: [(this.dataInject?.certification) ?? ''],
        //     requirement: [(this.dataInject?.requirement) ?? ''],
        //     note: [(this.dataInject?.note) ?? ''],
        //     department: [(this.dataInject?.department) ?? ''],
        //     id: [(this.dataInject?.id) ?? ''],
        // });

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

    // 上傳客戶照片
    async uploadClientImage(imgFormData: any, clientId: string): Promise<void> {
        await this._apiService.uploadClientImage(imgFormData, clientId);
    }

    // 上傳客戶資料
    async addClient(customerFormData: any): Promise<void> {
        await this._apiService.addClient(customerFormData).then((result) => {
            this.uploadClientImage(this.uploadImgformData, result.id).finally(() => {
                this.getClient();
            });
        }).finally(() => {
            this.getClient();
        });
    }

    // 遍及客戶資料
    async editClient(customerFormData: any, clientId: string): Promise<void> {
        await this._apiService.updateClient(customerFormData, clientId).then((result) => {
            this.uploadClientImage(this.uploadImgformData, result.id).finally(() => {
                this.getClient();
            });
        }).finally(() => {
            this.getClient();
        });
    }

    // 刪除客戶資料
    async delClient(clientId: string): Promise<void> {
        await this._apiService.delClient(clientId).finally(() => {
            this.getClient();
        });
    }

    // 取得需求清單
    async getDemand(clientId: string): Promise<void> {
        await this._apiService.getDemand(clientId).then((result) => {
            this.demandArr = [...result];
            // this.filterData = this.demandArr;
            // this.clientMultiSelectCheck = false;
            // this.clientMultiSelectData = [];
        });
    }

    // 取得需求清單
    async getDemandDetail(demand: any): Promise<void> {
        await this._apiService.getDemandDetail(demand).then((result) => {
            this.demandDetailData = result;
        });
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

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        if (file) {
            this.readImage(file);
        }
        this.uploadClientImage(this.uploadImgformData, this.clientDetail.id).then(() => {
            this.showToast = true;
            setTimeout(() => this.showToast = false, 1500);
        });
    }

    readImage(file: File): void {
        this.uploadImgformData = new FormData();
        this.uploadImgformData.append('file', file, file.name);
        const reader = new FileReader();
        reader.onload = (e: any): void => {
            this.selectedFile = e.target.result;
        };
        reader.readAsDataURL(file);
    }


    openAgreementPage(): void {
        this.agreementPageCheck = true;
        this.addClientCheck = true;
        this.editData = [];
    }

    cancelAgreementPage(): void {
        this.agreementPageCheck = false;
    }

    confirmAgreementPage(): void {
        this.agreementPageCheck = false;
        this.openCustomerFormCheck = true;
    }

    // 觸發刪除視窗
    openDeleteModal(client: any, event: any): void {
        event.stopPropagation();
        this.deleteId = client.id;
        this.deleteCheck = true;
    }

    // 確認刪除
    async confrimDelete(): Promise<void> {
        await this.delClient(this.deleteId);
        this.closeDeleteModal();
    }

    // 關閉刪除視窗
    closeDeleteModal(): void {
        this.deleteCheck = false;
    }

    // 觸發客戶詳情頁面
    openClientDetail(client: any): void {
        this.getDemand(client.id);
        this.clientDetail = client;
        this.clientDetailCheck = true;
    }

    // 關閉客戶詳情頁面
    closeClientDetail(): void {
        this.clientDetailCheck = false;
        this.getClient();
    }

    // 觸發編輯需求單
    async openEditDemandPage(client: any, event: any): Promise<void> {
        event.stopPropagation();
        await this.getDemandDetail(client);
        this.editDemandCheck = true;
    }

    // 關閉編輯需求單頁面
    async closeEditDemandPage(): Promise<void> {
        this.editDemandCheck = false;
        await this.getDemand(this.clientDetail.id);
    }

    // 觸發odm頁面
    async openOdmPage(): Promise<void> {
        this.odmPageCheck = true;
    }

    // 關閉頁面
    async closeOdmPage(): Promise<void> {
        this.odmPageCheck = false;
        await this.getDemand(this.clientDetail.id);
    }

    //==============================================================
    //Account choosen function
    //==============================================================
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
    //Customer Form
    //==============================================================
    // openCustomerFormCheck
    openCustomerForm(client: any): void {
        this.addClientCheck = false;
        this.editData = client;
        this.openCustomerFormCheck = true;
        console.log('TEST:::', this.editData);
    }

    closeCustomerForm(): void {
        this.openCustomerFormCheck = false;
    }

    addCustomer(ViewElement: any): void {
        this.uploadImgformData = ViewElement.uploadImgformData;
        this.addClient(ViewElement.customerForm.getRawValue());
        this.closeCustomerForm();
    }

    editCustomer(ViewElement: any): void {
        // ViewElement.customerForm
        // ViewElement.clientId
        this.editClient(ViewElement.customerForm.getRawValue(), ViewElement.clientId);
        this.closeCustomerForm();
    }
}


