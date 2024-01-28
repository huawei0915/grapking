/* eslint-disable max-len */
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

    level1 = [];
    level2 = [];
    level3 = [];
    level4 = [];
    level5 = [];
    level6 = [];
    level7 = [];
    level8 = [];
    level9 = [];

    searchFilterRecommandList = false;

    categoryData = [];

    productDetailKeyword = '';
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
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
        this._apiService.getCategory().then((result) => {
            this.categoryData = result;
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
        (document.activeElement as HTMLElement).blur();
    }

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    getFilteredCategories(cateString: string): void {
        // eslint-disable-next-line max-len
        return this.productDetail.categories.filter(category => category.parent === cateString && category.level === 2).map(category => this.lang === 'zh' ? category.name_zh : category.name_en);
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
    getProductDetail(product: any): void {
        this.productDetailKeyword = product.name_en;
        this.showDetailPage = true;
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
        if (event.key === 'Enter' && (event.target.value !== '')) {
            this.getProduct(event.target.value);
        }
    }

    //==============================================================
    //Input Behavior
    //==============================================================
    focusOnSearch(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.setAttribute(inputElement, 'mainSearchView', '');
        this.searchFilterRecommandList = true;
    }

    blurOutSearch(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        this._renderer.removeAttribute(inputElement, 'mainSearchView');
        this.searchFilterRecommandList = false;
    }

    clearInputText(inputElement: any, event: any): void {
        event.preventDefault();
        event.stopPropagation();
        inputElement.value = '';
        this.searchText = '';
        [this.level1, this.level2, this.level3, this.level4, this.level5, this.level6, this.level7, this.level8, this.level9] = [[], [], [], [], [], [], [], [], []];
    }

    searchList(event: any): void {
        this.searchText = event.target.value;
        [this.level1, this.level2, this.level3, this.level4, this.level5, this.level6, this.level7, this.level8, this.level9] = [[], [], [], [], [], [], [], [], []];

        if (event.target.value.trim() !== '') {
            this.categoryData.filter((item: any) => item.level === 2 && item.is_visible === 1 && (item.name_zh.includes(event.target.value) || item.name_en.includes(event.target.value))).forEach((data) => {
                if (data.parent.includes('F000')) {
                    this.level1.push(data);
                } else if (data.parent.includes('O000')) {
                    this.level2.push(data);
                } else if (data.parent.includes('AG000')) {
                    this.level3.push(data);
                } else if (data.parent.includes('GR000')) {
                    this.level4.push(data);
                } else if (data.parent.includes('CY000')) {
                    this.level5.push(data);
                } else if (data.parent.includes('FM000')) {
                    this.level6.push(data);
                } else if (data.parent.includes('PK000')) {
                    // // packageArr 中的 name_zh == data.name_zh 要塞回去this.level7
                    // const slicedString = this.packageArr.filter(str => str.name_zh.includes(data.name_zh));
                    // // console.log(slicedString);
                    // this.level7.push(slicedString[0]);
                    // console.log(this.level7);
                    this.level7.push(data);
                } else if (data.parent.includes('CE000')) {
                    this.level8.push(data);
                } else if (data.parent.includes('MV000')) {
                    this.level9.push(data);
                } else {
                }
            });
        }
        console.log(JSON.stringify(this.level1));
        // console.log(event.target.value);

    }

    //點擊符合條件
    searchForSpecFunction(level: any): void {
        this.getProduct('','',level[0].id);
    }

}
