import { filter } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { environment as env } from 'environments/environment';
import 'hammerjs';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.comonent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FolderComponent implements OnInit {
    folderForm: FormGroup;

    productArr = [];
    filterData = [];

    clientData = [];
    clientMultiSelectData = [];
    clientMultiSelectCheck = false;

    deleteCheck = false;
    deleteData: any;

    clientBindingCheck = false;

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
        private _formBuilder: FormBuilder
    ) {
    }

    ngOnInit(): void {
        //!!my own workflow
        this.getClientProduct();
        this.getClient();
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });

        this.folderForm = this._formBuilder.group({
            filterCheckBox: ['all']
        });

        this.folderForm.get('filterCheckBox')?.valueChanges.subscribe(
            (value) => {
                if (value === 'hasClient') {
                    this.filterData = this.productArr?.filter((person: any) => (person?.['client_id'] !== null));
                } else if (value === 'noClient') {
                    this.filterData = this.productArr?.filter((person: any) => (person?.['client_id'] === null));
                } else {
                    this.filterData = this.productArr;
                }
            });
    }

    // 取得圖片
    getImage(img: string): string {
        if(img === null){
            return '';
        }else if((img.indexOf('http://') !== -1) || (img.indexOf('https://') !== -1)){
            return img;
        }else{
            return `${env.apiServer}/api/files/${img}`;
        }
    }


    // 取得客戶配方清單
    async getClientProduct(): Promise<void> {
        await this._apiService.getClientProduct().then((result) => {
            this.productArr = [...result];
            this.filterData = this.productArr;
            this.clientMultiSelectCheck = false;
            this.clientMultiSelectData = [];
        });
    }

    // 刪除客戶配方
    async delClientProduct(product: any): Promise<void> {
        await this._apiService.delClientProduct(product);
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

    // 觸發刪除視窗
    openDeleteModal(product: any): void {
        this.deleteData = product;
        this.deleteCheck = true;
    }

    // 確認刪除
    async confrimDelete(): Promise<void> {
        if (this.deleteData.length) {
            await this.deleteData.forEach(async (dataRaw) => {
                await this.delClientProduct(dataRaw);
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
    openClientModal(): void {
        this.searchText = '';
        this.clientBindingCheck = true;
    }

    // 確認綁定帳戶
    confrimClientModal(): void {
        // TODO:  綁定客戶API
    }

    // 關閉綁定帳戶視窗
    closeClientModal(): void {
        this.clientBindingCheck = false;
    }

    // 觸發編輯視窗
    openEditModal(product: any): void {
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

    // 多選擇checkbox
    mutliSelect(event: any, selectData: any[]): void {
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

}
