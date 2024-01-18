import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslocoService, setValue } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import 'hammerjs';
import { Router } from '@angular/router';
import { ApiService } from 'app/modules/admin/api.service';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'folder-form',
    templateUrl: './folder-form.component.html',
    styleUrls: ['./folder-form.comonent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FolderFormComponent implements OnInit {
    @ViewChildren('clientDetailView') clientDetailView: QueryList<ElementRef>;
    @ViewChildren('gridVerCheckboxView') gridVerCheckboxView: QueryList<MatCheckbox>;
    @ViewChildren('normalVerCheckboxView') normalVerCheckboxView: QueryList<MatCheckbox>;
    @Input() querySpecCientDemand = false;
    @Input() specCientId = '';
    @Input() needFullHeight = false;
    @Input() needArrowLeft = false;
    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //肯定事件
    folderForm: FormGroup;

    productArr = [];
    filterData = [];

    clientData = [];
    clientMultiSelectData = [];
    clientMultiSelectCheck = false;

    deleteCheck = false;
    deleteData: any;

    clientBindingCheck = false;
    bindingData: any;
    clientBindingId = '';

    editCheck = false;
    editData: any;
    searchText = '';

    lang = 'zh';

    /**
     * Constructor
     */
    constructor(
        public _domSanitizer: DomSanitizer,
        private _apiService: ApiService,
        private _translocoService: TranslocoService,
        private _formBuilder: FormBuilder,
        private _renderer: Renderer2,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.getClientProduct();
        this.getClient();
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });

        this.folderForm = this._formBuilder.group({
            filterCheckBox: ['noClient']
        });

        this.folderForm.get('filterCheckBox')?.valueChanges.subscribe(
            (value) => {
                this.clientMultiSelectCheck = false;
                this.clientMultiSelectData = [];
                this.filterCheckboxOnchange(value);
            });
    }

    //==============================================================
    //api callback
    //==============================================================

    // 取得客戶配方清單
    async getClientProduct(): Promise<void> {
        if (this.querySpecCientDemand) {
            await this._apiService.getClientProduct(this.specCientId).then((result) => {
                this.productArr = [...result];
                this.filterData = this.productArr;
                this.clientMultiSelectCheck = false;
                this.clientMultiSelectData = [];
                this.folderForm.get('filterCheckBox').setValue('all');
            });
        } else {
            await this._apiService.getClientProduct().then((result) => {
                this.productArr = [...result];
                this.filterData = this.productArr;
                this.clientMultiSelectCheck = false;
                this.clientMultiSelectData = [];
                if(this._apiService.folderClientStatus !== ''){
                    this.folderForm.get('filterCheckBox').setValue(this._apiService.folderClientStatus);
                    this._apiService.folderClientStatus = '';

                } else {
                    this.filterCheckboxOnchange(this.folderForm.get('filterCheckBox').value);
                }
            });
        }
    }

    // 刪除客戶配方
    async delClientProduct(product: any): Promise<void> {
        await this._apiService.delClientProduct(product);
    }

    // 綁定客戶
    async bindingClient(product: any, clientId: string): Promise<void> {
        await this._apiService.updateBindingClientProduct(product, clientId);
    }

    // 編輯客戶配方
    async editClientProduct(product: any): Promise<void> {
        await this._apiService.updateClientProduct(product);
    }

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

    // 觸發刪除視窗
    openDeleteModal(product: any, event: any): void {
        this.deleteData = product;
        this.deleteCheck = true;
    }

    // 確認刪除
    async confrimDelete(): Promise<void> {
        if (this.deleteData.length) {
            let localCount = 0;
            await this.deleteData.forEach(async (dataRaw) => {
                await this.delClientProduct(dataRaw).then(() => {
                    localCount++;
                    if (this.deleteData.length === localCount) { this.getClientProduct(); }
                });
            });
        } else {
            await this.delClientProduct(this.deleteData);
        }
        await this.getClientProduct();
        this.closeDeleteModal();
    }

    // 關閉刪除視窗
    closeDeleteModal(): void {
        this.deleteCheck = false;
    }

    // 觸發綁定帳戶視窗
    openClientModal(product: any, event: any): void {
        this.bindingData = product;
        this.searchText = '';
        this.clientBindingCheck = true;
        this.clientBindingId = '';
    }

    // 確認綁定帳戶
    async confrimClientModal(): Promise<void> {
        if (this.bindingData.length) {
            let localCount = 0;
            await this.bindingData.forEach(async (dataRaw) => {
                await this.bindingClient(dataRaw, this.clientBindingId).then(() => {
                    localCount++;
                    if (this.bindingData.length === localCount) { this.getClientProduct(); }
                });
            });
        } else {
            await this.bindingClient(this.bindingData, this.clientBindingId);
        }
        await this.getClientProduct();
        this.closeClientModal();
    }

    // 關閉綁定帳戶視窗
    closeClientModal(): void {
        this.clientBindingCheck = false;
    }

    // 觸發編輯視窗
    openEditModal(product: any, event: any): void {
        this.editData = product;
        this.editCheck = true;
    }

    // 確認編輯
    async confrimEdit(viewEditData: any): Promise<void> {
        this.editData.note = viewEditData.memo;
        await this.editClientProduct(this.editData);
        await this.getClientProduct();
        this.closeEditModal();
    }

    // 關閉編輯視窗
    closeEditModal(): void {
        this.editCheck = false;
    }

    //==============================================================
    //Function method
    //==============================================================

    // 取得圖片
    getImage(img: string): string {
        if (img === null) {
            return '';
        } else if ((img.indexOf('http://') !== -1) || (img.indexOf('https://') !== -1)) {
            return img;
        } else {
            return `${env.apiServer}/api/files/${img}`;
        }
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

    // 多選擇checkbox
    mutliSelect(event: any, selectData: any[], index: number, whichVerBehavior?: string): void {
        if (event.source?.id) {
            if (whichVerBehavior === 'normalVer') {
                this.gridVerCheckboxView.toArray()[index].checked = !this.gridVerCheckboxView.toArray()[index].checked;
            } else if (whichVerBehavior === 'gridVer') {
                this.normalVerCheckboxView.toArray()[index].checked = !this.normalVerCheckboxView.toArray()[index].checked;
            }
        }
        if (event.checked) {
            this.clientMultiSelectData.push(selectData);
        } else if (!event.checked) {
            this.clientMultiSelectData = this.clientMultiSelectData.filter(item => item.id !== ((selectData as any).id));
        }
    }

    // 觸發多選按鈕
    clickMultiSelect(): void {
        if (this.clientMultiSelectCheck) {
            this.clientMultiSelectCheck = false;
            this.clientMultiSelectData = [];
        } else {
            this.clientMultiSelectCheck = true;
        }
    }

    // 綁定客戶，假設只能綁一個
    chooseClient(inputElement: any, dataInject: any): void {
        // inputElement.hasAttribute('isChosen')
        this.clientDetailView.forEach((elementRef: ElementRef) => {
            this._renderer.removeAttribute(elementRef.nativeElement, 'isChosen');
        });
        this._renderer.setAttribute(inputElement, 'isChosen', '');
        this.clientBindingId = dataInject.id;
    }

    // 前往商品詳細介紹頁面
    goToProductDetail(data: any): void {
        this._apiService.callFromFolder = true;
        this._apiService.folderClientStatus = this.folderForm.get('filterCheckBox').value;
        // TODO:詳細邏輯待修正
        if (!(this.clientMultiSelectCheck || this.clientBindingCheck || this.deleteCheck || this.editCheck)) {
            this._router.navigate(['/home/recommend'], {
                queryParams: {
                    function: data.product_id
                }
            });
        }
    }

    filterCheckboxOnchange(value: string): void {
        if (value === 'hasClient') {
            this.filterData = this.productArr?.filter((person: any) => (person?.['client_id'] !== null) && (person?.client));
        } else if (value === 'noClient') {
            this.filterData = this.productArr?.filter((person: any) => (person?.['client_id'] === null) || (!person?.client));
        } else {
            this.filterData = this.productArr;
        }
    }

    checkboxClick(index: number, selectData: any[]): void {
        if (this.clientMultiSelectCheck) {
            this.normalVerCheckboxView.toArray()[index].checked = !this.normalVerCheckboxView.toArray()[index].checked;
            this.gridVerCheckboxView.toArray()[index].checked = !this.gridVerCheckboxView.toArray()[index].checked;
            this.mutliSelect(this.normalVerCheckboxView.toArray()[index], selectData, index);
        }
    }
}
