import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { environment as env } from 'environments/environment';

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
    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.getProduct();
    }

    getProduct(): void {
        this._apiService.getProduct().then((result) => {
            this.productArr = [...result];
        });
    }

    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    getProductDetail(id: string): void {
        this._apiService.getProductDetail(id).then((result) => {
            console.log(result);
            this.productDetail = result;
            this.showDetailPage = true;
        });
    }
}
