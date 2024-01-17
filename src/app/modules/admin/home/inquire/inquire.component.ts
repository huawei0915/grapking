/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { ApiService } from '../../api.service';

@Component({
    selector: 'inquire',
    templateUrl: './inquire.component.html',
    styleUrls: ['./inquire.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class InquireComponent implements OnInit {
    productArr = [];
    showDetailPage = false;
    showDetailTable = false;

    productDetail: any;
    category = '';

    formArr = [];
    packageArr = [];

    lang = 'zh';

    closeTag = true;
    selectIdx = 0;

    popView = false;
    alertPOPUP = false;
    message = '';
    showToast = false;

    initFinished = false;

    searchText = '';
    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _translocoService: TranslocoService,
        private _renderer: Renderer2,
    ) {
    }

    ngOnInit(): void {
        // const keyword = this._route.snapshot.queryParams['keyword'];
        // const category = this._route.snapshot.queryParams['category'];
        // const func = this._route.snapshot.queryParams['function'];
        // this.getProduct(keyword, func, category);
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
    }

    // 取得產品
    getProduct(keyword?: string, func?: string, category?: string): void {
        let isRecommand = '';
        isRecommand = keyword || func || category ? '' : '1';
        keyword = keyword || '';
        func = func || '';
        category = category || '';

        this._apiService.getProduct(keyword, isRecommand, func, category).then((result) => {
            this.productArr = [...result];
            if ((keyword || func || category) && this.productArr.length > 0) {
                // this.showDetailPage = true;
                // this.getProductDetail(this.productArr[0].id, 0);
            } else if (this.productArr.length > 0) {
                this.showDetailPage = false;
            } else {
                // if (!this.initFinished) {
                    this.alertPOPUP = true;
                    this.message = 'product_not_found_message';
                // }
            }
            // this.initFinished = true;
        });
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
                this.formArr.sort((a, b) => {
                    if ((this.lang === 'zh' ? a.name_zh : a.name_en) === this.getFilteredCategories('FM000')[0]) {
                        return -1; // 將滿足條件的元素排在前面
                    } else if ((this.lang === 'zh' ? b.name_zh : b.name_en) === this.getFilteredCategories('FM000')[0]) {
                        return 1; // 將滿足條件的元素排在后面
                    } else {
                        return 0; // 保持原有顺序
                    }
                });
            });
        } else if (type === 'package') {
            this.formArr = [];
            this._apiService.getPackage().then((result) => {
                this.packageArr = [...result];
                this.packageArr.sort((a, b) => {
                    if ((this.lang === 'zh' ? a.name_zh : a.name_en) === this.getFilteredCategories('PK000')[0]) {
                        return -1; // 將滿足條件的元素排在前面
                    } else if ((this.lang === 'zh' ? b.name_zh : b.name_en) === this.getFilteredCategories('PK000')[0]) {
                        return 1; // 將滿足條件的元素排在后面
                    } else {
                        return 0; // 保持原有顺序
                    }
                });
            });
        } else {
        }
    }

    // 儲存產品
    saveProduct(): void {
        this.popView = true;
    }

    handleOK(event: any): void {
        this.popView = false;
        this.productDetail.note = event.memo;
        const data = {
            // eslint-disable-next-line quotes
            "product_id": this.productDetail.id,
            // eslint-disable-next-line quotes
            "note": this.productDetail.note
        };
        this._apiService.addClientProduct(data).then((result) => {
            console.log('success', result);
            this.showToast = true;
            setTimeout(() => this.showToast = false, 1500);
        }).catch((err) => {
            console.log('fail', err);
            this.alertPOPUP = true;
            this.message = 'an_error_occurred';
        }).finally(() => {

        });
    }

    confrimCancel(): void {
        this.alertPOPUP = false;
        // this._router.navigate(['/home/question']);
    }

    confrimOK(): void {
        this.alertPOPUP = false;
        // this.getProduct();
        this._router.navigate(['/home/recommend']);
    }

    // 取得商品詳細
    getProductDetail(id: string, idx: number): void {
        this.selectIdx = idx;
        this._apiService.getProductDetail(id).then((result) => {
            this.productDetail = result;
            this.showDetailPage = true;
        }).catch((err) => {
            this.alertPOPUP = true;
            this.showDetailPage = false;
            this.message = 'an_error_occurred';
        });
    }

    //==============================================================
    //Input Field Search
    //==============================================================
    // 過濾客戶清單
    getFilteredProduct(cateString: string): any[] {
        if (cateString !== '') {
            cateString = cateString.toLowerCase();
            return this.productArr.filter(
                product => (
                    // product.id?.toLowerCase().includes(cateString) ||
                    product.benefits?.toLowerCase().includes(cateString) ||
                    product.name_zh?.toLowerCase().includes(cateString) ||
                    product.name_en?.toLowerCase().includes(cateString)));
        } else {
            return [];
        }
    }

    // 寫入搜尋欄位
    setSearchText(event: any): void {
        // this.searchText = event.target.value;
        if (event.key === 'Enter' &&  (event.target.value !== '')) {
            this.getProduct(event.target.value);
        }
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
