/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit, QueryList, ElementRef, EventEmitter, Renderer2, ViewChildren, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { ApiService } from '../api.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

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
    showToast2 = false;

    i18nText: any;

    openCustomerFormCheck = false;
    editData: any;

    uploadImgformAvatar: any;
    uploadImgformNameCard: any;

    addClientCheck = false;
    agreementPageCheck = false;

    deleteCheck = false;
    deleteId = '';

    clientDetail: any;
    clientDetailCheck = false;

    selectedFile = '';
    selectedNameCard = '';
    needToZoom = false;
    zoomPhoto: any;

    demandArr = [];
    productArr = [];

    demandDetailData: any;
    editDemandCheck = false;
    editDemandData: any;

    odmPageCheck = false;
    folderPageCheck = false;

    updateCusDetailStatus = false;

    lang = 'zh';

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
        private _renderer: Renderer2,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.getClient();
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });

        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
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

    // 上傳客戶照片
    async uploadClientImage(imgFormData: any, clientId: string): Promise<void> {
        await this._apiService.uploadClientImage(imgFormData, clientId);
    }

    // 上傳客戶資料
    async addClient(customerFormData: any): Promise<void> {
        await this._apiService.addClient(customerFormData).then((result) => {
            this.uploadClientImage(this.uploadImgformAvatar, result.id).finally(() => {
                this.getClient();
            });
            this.uploadClientImage(this.uploadImgformNameCard, result.id).finally(() => {
                this.getClient();
            });
        }).finally(() => {
            this.getClient();
        });
    }

    // 遍及客戶資料
    async editClient(customerFormData: any, clientId: string): Promise<void> {
        this.updateCusDetailStatus = true;
        await this._apiService.updateClient(customerFormData, clientId).then((result) => {
            this.uploadClientImage(this.uploadImgformAvatar, result.id).finally(() => {
                this.getClient();
            });
            this.uploadClientImage(this.uploadImgformNameCard, result.id).finally(() => {
                this.getClient();
            });
        }).finally(async () => {
            await this.getClient().finally(() => {
                this.clientDetail = this.clientData.filter(
                    client => (
                        client.id?.toLowerCase().includes(this.clientDetail.id)
                    ))[0];
                this.updateCusDetailStatus = false;
            });
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

    // 取得需求詳情
    async getDemandDetail(demand: any): Promise<void> {
        await this._apiService.getDemandDetail(demand).then((result) => {
            this.demandDetailData = result;
        });
    }

    // 取得客戶配方清單
    async getClientProduct(clientId: string): Promise<void> {
        await this._apiService.getClientProduct(clientId).then((result) => {
            this.productArr = [...result];
            // this.filterData = this.productArr;
            // this.clientMultiSelectCheck = false;
            // this.clientMultiSelectData = [];
        });
    }

    //==============================================================
    //Common Function
    //==============================================================

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    getDefaultImg(input: any, clientName: string): void {
        const nameCheck = (clientName ?? '');
        input.src = 'assets/images/logo.png';
        this._renderer.setStyle(input, 'display', 'none');
        if (nameCheck !== '') {
            this._renderer.setProperty(input.parentNode, 'innerHTML', '<div class="text-white text-2xl">' + nameCheck.substring(0, 1) + '</div>');
        } else {
            // eslint-disable-next-line max-len
            this._renderer.setProperty(input.parentNode, 'innerHTML', '<mat-icon role="img" svgicon="mat_solid:person" class="text-white mat-icon notranslate mat-icon-no-color" aria-hidden="true" ng-reflect-svg-icon="mat_solid:person" data-mat-icon-type="svg" data-mat-icon-name="person" data-mat-icon-namespace="mat_solid"><svg viewBox="0 0 24 24" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></mat-icon>');
        }
    }

    getDefaultImgForRWD(input: any, clientName: string): void {
        const nameCheck = (clientName ?? '');
        input.src = 'assets/images/logo.png';
        this._renderer.setStyle(input, 'display', 'none');
        if (nameCheck !== '') {
            this._renderer.setProperty(input.parentNode, 'innerHTML', '<div class="text-sky-500 font-bold text-4xl">' + nameCheck.substring(0, 1) + '</div>');
        } else {
            // eslint-disable-next-line max-len
            this._renderer.setProperty(input.parentNode, 'innerHTML', '<mat-icon role="img" svgicon="mat_solid:person" class="text-sky-500 mat-icon notranslate mat-icon-no-color" aria-hidden="true" ng-reflect-svg-icon="mat_solid:person" data-mat-icon-type="svg" data-mat-icon-name="person" data-mat-icon-namespace="mat_solid"><svg viewBox="0 0 24 24" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M0 0h24v24H0z" fill="none"></path><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></mat-icon>');
        }
    }

    onFileSelected(event: any, type: string): void {
        const file = event.target.files[0];
        if (file) {
            this.readImage(file, type);
        }
        if (type === 'avatar') {
            this.uploadClientImage(this.uploadImgformAvatar, this.clientDetail.id).then(() => {
                this.showToast = true;
                setTimeout(() => {
                    this.showToast = false;
                }, 1500);
            });
        }
        if (type === 'namecard') {
            this.uploadClientImage(this.uploadImgformNameCard, this.clientDetail.id).then(() => {
                this.showToast = true;
                setTimeout(() => {
                    this.showToast = false;
                }, 1500);
            });
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

    async copyContent(input: string): Promise<void> {
        try {
            // 将内容复制到剪贴板
            await navigator.clipboard.writeText(input);
            console.log('複製成功');
            this.showToast2 = true;
            setTimeout(() => this.showToast2 = false, 1500);
        } catch (error) {
            console.error('複製失敗', error);
        }
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
        this.clientDetailCheck = false;
    }

    // 關閉刪除視窗
    closeDeleteModal(): void {
        this.deleteCheck = false;
    }

    // 觸發客戶詳情頁面
    openClientDetail(client: any): void {
        this.getDemand(client.id);
        this.getClientProduct(client.id);
        this.clientDetail = client;
        this.clientDetailCheck = true;
        this.selectedFile = '';
        this.selectedNameCard = '';
    }

    // 關閉客戶詳情頁面
    closeClientDetail(): void {
        this.clientDetailCheck = false;
        this.getClient();
    }

    // 放大照片
    openZoom(clientDetail: any): void {
        this.needToZoom = true;
        if(this.selectedNameCard){
            this.zoomPhoto = this.selectedNameCard;
        }else{
            this.zoomPhoto = this.getImage(clientDetail.namecard);
        }

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

    // 關閉odm頁面
    async closeOdmPage(): Promise<void> {
        this.odmPageCheck = false;
        await this.getDemand(this.clientDetail.id);
    }

    // 觸發folder頁面
    async openFolderPage(): Promise<void> {
        this.folderPageCheck = true;
    }

    // 關閉folder頁面
    async closeFolderPage(): Promise<void> {
        this.folderPageCheck = false;
        await this.getClientProduct(this.clientDetail.id);
    }

    // 前往商品詳細介紹頁面
    goToProductDetail(data: any): void {
        // TODO:詳細邏輯待修正
        this._router.navigate(['/home/recommend'], {
            queryParams: {
                function: data.product_id
            }
        });
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
    }

    closeCustomerForm(): void {
        this.openCustomerFormCheck = false;
    }

    addCustomer(ViewElement: any): void {
        this.uploadImgformAvatar = ViewElement.uploadImgformAvatar;
        this.uploadImgformNameCard = ViewElement.uploadImgformNameCard;
        this.addClient(ViewElement.customerForm.getRawValue());
        this.closeCustomerForm();
    }

    editCustomer(ViewElement: any): void {
        // ViewElement.customerForm
        // ViewElement.clientId
        this.editClient(ViewElement.customerForm.getRawValue(), ViewElement.clientId);
        this.closeCustomerForm();
    }

    backToCustomerList(): void {
        this.openCustomerFormCheck = false;
        this.clientDetailCheck = false;
    }

    //==============================================================
    //Input Behavior
    //==============================================================
    showDeleteButton(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.setAttribute(inputElement, 'mainSearchView', '');
    }

    hideDeleteButton(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.removeAttribute(inputElement, 'mainSearchView');
    }

    clearInputText(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        inputElement.value = '';
        this.searchText = '';
    }
}


