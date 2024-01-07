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
    getProduct(keyword?: string, isRecommand?: any, func?: string, category?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const prams = `?keyword=${keyword}&category=${category}&is_recommand=${isRecommand}&function=${func}`;

            this._httpClient.get(`${env.apiServer}/api/v1/product${prams}`).subscribe({
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

    // D1-1 客戶清單
    /**
     * @returns 客戶清單
     * @description 取得客戶清單
     */
    getClient(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/client`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // D1-2 新增客戶
    /**
     * @param rawValue 客戶資料
     * @returns 客戶資料
     * @description 新增客戶
     */
    addClient(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${env.apiServer}/api/v1/client`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // D1-3 修改客戶
    /**
     * @param rawValue 客戶資料
     * @param clientId 客戶Id
     * @returns 客戶資料
     * @description 修改客戶
     */
    updateClient(rawValue: any, clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/client/${clientId}`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // D1-4 刪除客戶
    /**
     * @param clientId 客戶Id
     * @returns 客戶資料
     * @description 刪除客戶
     */
    delClient(clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${env.apiServer}/api/v1/client/${clientId}`).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // D1-5 上傳客戶圖像
    /**
     * @param rawValue 客戶照片
     * @param clientId 客戶Id
     * @returns 客戶資料
     * @description 上傳客戶圖像
     */
    uploadClientImage(rawValue: any, clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${env.apiServer}/api/v1/client/${clientId}/upload`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // E1-1 客戶配方清單
    /**
     * @param clientId 客戶id
     * @returns 客戶配方清單
     * @description 取得客戶配方清單
     */
    getClientProduct(clientId?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/client_product?client_id=${clientId??''}`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // E1-2 新增客戶配方
    /**
     * @param rawValue 客戶配方資料
     * @returns 新增客戶配方
     * @description 新增客戶配方
     */
    addClientProduct(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${env.apiServer}/api/v1/client_product`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // E1-3 修改客戶配方
    /**
     * @param rawValue 客戶配方資料
     * @returns 修改客戶配方
     * @description 修改客戶配方
     */
    updateClientProduct(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/client_product/${rawValue.id}`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // E1-3ver2 配方綁定客戶
    /**
     * @param rawValue 客戶配方資料
     * @param clientId 客戶Id
     * @returns 綁定狀況
     * @description 綁定客戶
     */
    updateBindingClientProduct(rawValue: any, clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/client_product/${rawValue.id}`,
                {
                    // eslint-disable-next-line @typescript-eslint/naming-convention, quotes, @typescript-eslint/quotes
                    client_id: clientId
                }
            ).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // E1-4 刪除客戶配方
    /**
     * @param rawValue 客戶配方資料
     * @returns 刪除客戶配方
     * @description 刪除客戶配方
     */
    delClientProduct(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${env.apiServer}/api/v1/client_product/${rawValue.id}`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-1 需求單清單
    /**
     * @param clientId 客戶id
     * @returns 需求單清單
     * @description 取得需求單清單
     */
    getDemand(clientId?: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/demand?client_id=${clientId??''}`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-2 需求單詳細
    /**
     * @param rawValue 需求單資料
     * @returns 需求單詳細
     * @description 取得需求單詳細
     */
    getDemandDetail(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/demand/${rawValue.id}`).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-3 新增需求單
    /**
     * @param rawValue 需求單資料
     * @returns 新增需求單
     * @description 新增需求單資料
     */
    addDemand(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.post(`${env.apiServer}/api/v1/demand`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-4 修改需求單
    /**
     * @param rawValue 需求單資料
     * @returns 修改需求單
     * @description 修改需求單
     */
    updateDemand(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/demand/${rawValue.id}`, rawValue
            ).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-4ver2 需求單綁定客戶
    /**
     * @param rawValue 需求單資料
     * @returns 綁定狀況
     * @description 綁定客戶
     */
    updateBindingDemand(rawValue: any, clientId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/demand/${rawValue.id}`,
                {
                    // eslint-disable-next-line @typescript-eslint/naming-convention, quotes, @typescript-eslint/quotes
                    client_id: clientId
                }
            ).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }

    // F1-5 刪除需求單
    /**
     * @param rawValue 需求單資料
     * @returns 刪除需求單
     * @description 刪除需求單
     */
    delDemand(rawValue: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.delete(`${env.apiServer}/api/v1/demand/${rawValue.id}`, rawValue).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    reject(err.error);
                }
            });
        });
    }
}
