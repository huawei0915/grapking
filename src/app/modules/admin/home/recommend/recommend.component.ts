import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment as env } from 'environments/environment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
    selector: 'recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RecommendComponent implements OnInit {

    productArr = [];
    showDetailPage = false;
    showDetailTable = false;

    productDetail: any;

    formArr = [];
    packageArr = [];

    lang = 'zh';

    closeTag = true;
    selectIdx = 0;
    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {
        this.getProduct();
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
    }

    // 取得產品
    getProduct(): void {
        this._apiService.getProduct().then((result) => {
            this.productArr = [...result];
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
    getProductDetail(id: string, idx: number): void {
        this.selectIdx = idx;
        this._apiService.getProductDetail(id).then((result) => {
            this.productDetail = result;
            this.showDetailPage = true;
        });
    }
}
