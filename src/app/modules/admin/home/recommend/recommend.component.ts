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

    productDetail: any;

    lang = 'zh';
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

    getProduct(): void {
        this._apiService.getProduct().then((result) => {
            this.productArr = [...result];
        });
    }

    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    getFilteredCategories(cateString: string): void {
        // eslint-disable-next-line max-len
        return this.productDetail.categories.filter(category => category.parent === cateString && category.level === 2).map(category => this.lang === 'zh' ? category.name_zh : category.name_en);
    }

    showDetail(id: string): void {
    }


    getProductDetail(id: string): void {
        this._apiService.getProductDetail(id).then((result) => {
            console.log(result);
            this.productDetail = result;
            this.showDetailPage = true;
        });
    }
}
