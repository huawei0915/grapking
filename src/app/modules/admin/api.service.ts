import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _activatedRoute: ActivatedRoute
    ) {
    }

    // B1-1 系統參數
    getCategory(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/category`).subscribe((result: any) => {
                console.log(result);
                resolve(result.result.data);
            }, (err) => {
                reject(err.error);
            });
        });
    }

    // B1-2 公司介紹
    getComponey(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/company`).subscribe((result: any) => {
                resolve(result.result.data);
            }, (err) => {
                reject(err.error);
            });
        });
    }

    // C1-1 查詢配方商品
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/product`).subscribe((result: any) => {
                resolve(result.result.data);
            }, (err) => {
                reject(err.error);
            });
        });
    }

    // C1-2 配方商品詳細
    getProductDetail(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/product/${id}`).subscribe((result: any) => {
                resolve(result.result);
            }, (err) => {
                reject(err.error);
            });
        });
    }

    add(rawValue): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient.post(`${env.apiServer.portal}/accessControl/header`, rawValue).subscribe((result: any) => {
            //     resolve(true);
            // }, (err) => {
            //     reject(err.error);
            // });
        });
    }

    update(): Promise<any> {
        return new Promise((resolve, reject) => {
            // rawValue.ID = rulerID;
            // this._httpClient.put(`${env.apiServer.portal}/accessControl/header`, rawValue).subscribe((result) => {
            //     resolve(true);
            // }, (err) => {
            //     reject(err.error);
            // });
        });
    }

    del(id): Promise<any> {
        return new Promise((resolve, reject) => {
            //     this._httpClient.delete(`${env.apiServer.portal}/dispatch/${id}`).subscribe((result: any) => {
            //         resolve(true);
            //     }, (err) => {
            //         reject(err.error);
            //     });
        });
    }

    getUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/user`).subscribe((result: any) => {
                resolve(result.result.user);
            }, (err) => {
                reject(err.error);
            });
        });
    }
}
