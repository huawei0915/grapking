/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment as env } from 'environments/environment';
import { TranslocoService } from '@ngneat/transloco';
import { ActivatedRoute } from '@angular/router';

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
    category = '';

    formArr = [];
    packageArr = [];

    lang = 'zh';

    closeTag = true;
    selectIdx = 0;

    popView = false;
    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
        private _route: ActivatedRoute,
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {
        const category = this._route.snapshot.queryParams['category'];
        this.getProduct(category);
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
    }

    // 取得產品
    getProduct(category: string): void {
        let isRecommand = '';
        if (!category) {
            isRecommand = '1';
            category = '';
        }
        this._apiService.getProduct('', isRecommand, '', category).then((result) => {
            this.productArr = [...result];
            if (category && this.productArr.length > 0) {
                this.showDetailPage = true;
                this.getProductDetail(this.productArr[0].id, 0);
            } else {
                // TODO: 顯示無產品alert
                this.showDetailPage = false;
            }
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
                        return -1; // 将满足条件的元素排在前面
                    } else if ((this.lang === 'zh' ? b.name_zh : b.name_en) === this.getFilteredCategories('FM000')[0]) {
                        return 1; // 将满足条件的元素排在后面
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
                        return -1; // 将满足条件的元素排在前面
                    } else if ((this.lang === 'zh' ? b.name_zh : b.name_en) === this.getFilteredCategories('PK000')[0]) {
                        return 1; // 将满足条件的元素排在后面
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

    getNoteText(event: string): void {
        this.productDetail.note = event;
    }

    handleOK(event: string): void {
        this.popView = false;

        const data = {
            // eslint-disable-next-line quotes
            "product_id": this.productDetail.id,
            // eslint-disable-next-line quotes
            "note": this.productDetail.note
        };
        this._apiService.addClientProduct(data).then((result) => {
            console.log(result);
            console.log('success');
        }).catch((err) => {
            console.log(err);
            console.log('fail');
        }).finally(() => {

        });
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
