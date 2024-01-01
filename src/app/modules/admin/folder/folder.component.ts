import { filter } from 'rxjs';
import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { environment as env } from 'environments/environment';
import 'hammerjs';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from '../api.service';

@Component({
    selector: 'folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.comonent.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FolderComponent implements OnInit {
    currentIndex = 0;

    slidePosition = 0;
    slideWidth = 300;

    closeMenu = true;

    vr = false;
    ai = false;
    vrUrl: SafeUrl;
    aiUrl: SafeUrl;

    picIsLoading = false;
    picArray = [];

    productArr = [];
    showDetailPage = false;
    showDetailTable = false;

    productDetail: any;

    formArr = [];
    packageArr = [];

    //!!my own param

    deleteCheck = false;
    deleteData: any;

    editCheck = false;
    editData: any;

    lang = 'zh';
    /**
     * Constructor
     */
    constructor(
        public _domSanitizer: DomSanitizer,
        private _splashScreenService: FuseSplashScreenService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _apiService: ApiService,
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {
        // this.vrUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.vrUrl);
        // this.aiUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.aiUrl);
        this.slideWidth = window.innerWidth;
        const lang = this._translocoService.getActiveLang();
        this._apiService.getComponey().then((result) => {
            result.filter(item => item.language === lang).forEach((item) => {
                this.picArray.push(env.apiServer + '/api/files/' + item.image);
            });
        }).finally(() => { setTimeout(() => { this.picIsLoading = true; this._changeDetectorRef.detectChanges(); }, 800); });



        //!!my own workflow
        this.getClientProduct();
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
    }

    handleBtn(selectedItem: any): void {
        setTimeout(() => {
            this._splashScreenService.show();
        }, 100);

        switch (selectedItem) {
            case 'vr':
                this.vr = true;
                this.ai = false;
                break;
            case 'ai':
                this.vr = false;
                this.ai = true;
                break;
            default:
                break;
        }
    }

    // hideLoader(): void {
    //     this._splashScreenService.hide();
    // }

    // moveLeft(): void {
    //     this.slidePosition += this.slideWidth;
    //     this.currentIndex--;
    //     this.checkBoundaries();
    // }

    // moveRight(): void {
    //     this.slidePosition -= this.slideWidth;
    //     this.currentIndex++;
    //     this.checkBoundaries();
    // }

    checkBoundaries(): void {
        const totalWidth = this.picArray.length * this.slideWidth;
        if (this.slidePosition > 0) {
            this.slidePosition = 0;

        } else if (Math.abs(this.slidePosition) > totalWidth - this.slideWidth) {
            this.slidePosition = -(totalWidth - this.slideWidth);
        }
    }

    handleRightPanel(idx: number): void {
        this.currentIndex = idx;
        this.slidePosition = -(this.slideWidth * idx);
    }

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    getFilteredCategories(cateString: string): void {
        // eslint-disable-next-line max-len
        return this.productDetail.categories.filter(category => category.parent === cateString && category.level === 2).map(category => this.lang === 'zh' ? category.name_zh : category.name_en);
    }

    // 顯示包裝/劑量詳細
    showDetail(type: string): void {
        this.showDetailTable = true;
        if (type === 'form') {
            this.packageArr = [];
            this._apiService.getForm().then((result) => {
                this.formArr = [...result];
            });
        } else if (type === 'package') {
            this.formArr = [];
            this._apiService.getPackage().then((result) => {
                this.packageArr = [...result];
            });
        } else {
        }
    }

    // 儲存產品
    saveProduct(): void {
    }

    // 取得商品詳細
    getProductDetail(id: string): void {
        // this._apiService.getProductDetail(id).then((result) => {
        //     this.productDetail = result;
        //     this.showDetailPage = true;
        // });
    }

    // ==========!!my own function


    // 取得客戶配方清單
    async getClientProduct(): Promise<void> {
        await this._apiService.getClientProduct().then((result) => {
            this.productArr = [...result];
        });
    }

    // 刪除客戶配方
    async delClientProduct(product: any) {
        await this._apiService.delClientProduct(product);
    }

    // 編輯客戶配方
    async editClientProduct(product: any) {
        await this._apiService.updateClientProduct(product);
    }

    // 觸發刪除視窗
    openDeleteModal(product: any) {
        this.deleteData = product;
        this.deleteCheck = true;
    }

    // 確認刪除
    async confrimDelete() {
        await this.delClientProduct(this.deleteData);
        await this.getClientProduct();
        this.closeDeleteModal();
    }

    // 關閉刪除視窗
    closeDeleteModal() {
        this.deleteCheck = false;
    }


    // 觸發編輯視窗
    openEditModal(product: any) {
        this.editData = product;
        this.editCheck = true;
    }

    // 確認編輯
    async confrimEdit(viewEditData: any) {
        this.editData.note = viewEditData.memo;
        await this.editClientProduct(this.editData);
        await this.getClientProduct();
        this.closeEditModal();
    }

    // 關閉編輯視窗
    closeEditModal() {
        this.editCheck = false;
    }
}
