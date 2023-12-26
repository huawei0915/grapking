import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
    ) {
    }

    // A1-2 取得個人資料
    /**
     * @returns 個人資料
     * @description 取得個人資料
     */
    getUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/user`).subscribe({
                next: (result: any) => {
                    resolve(result.result.user);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // B1-1 系統參數
    /**
     * @returns 系統參數
     * @description 取得系統參數
     */
    getCategory(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/category`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // B1-2 公司介紹
    /**
     * @returns 公司介紹
     * @description 取得公司介紹
     */
    getComponey(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/company`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // C1-1 查詢配方商品
    /**
     * @returns 配方商品
     * @description 取得配方商品
     */
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/product`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // C1-2 配方商品詳細
    /**
     * @param id 商品ID
     * @returns 商品詳細
     * @description 取得商品詳細
     */
    getProductDetail(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/product/${id}`).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // C1-4 劑型清單
    /**
     * @returns 劑型清單
     * @description 取得劑型清單
     */
    getForm(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/form`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // C1-5 包裝清單
    /**
     * @returns 包裝清單
     * @description 取得包裝清單
     */
    getPackage(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/package`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
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
}
