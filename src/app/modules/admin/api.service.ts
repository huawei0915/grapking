import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';
import { CommonConfirmModalComponent } from 'app/shared/common-confirm-modal/common-confirm-modal.component';
import { environment as env } from 'environments/environment';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    callFromFolder = false;
    folderClientStatus = '';

    recommandListOrGirdChange = 'list';

    expiredPopup = false;
    isOK = false;
    i18nText: any;
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService,
        private _translocoService: TranslocoService,
        private overlay: Overlay,
    ) {
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });
    }

    // Reset parameter
    init(): void {
        this.expiredPopup = false;
        this.isOK = false;
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
                    this.isTokenExpired(err);
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
            this._httpClient.get(`${env.apiServer}/api/v1/category?offset=0&limit=10000`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
                    reject(err.error);
                }
            });
        });
    }

    // C1-3 原料詳細
    /**
     * @param id 原料ID
     * @returns 原料詳細
     * @description 取得原料詳細
     */
    getIngredient(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${env.apiServer}/api/v1/ingredient/${id}`).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
            this._httpClient.get(`${env.apiServer}/api/v1/client_product?client_id=${clientId ?? ''}`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
            this._httpClient.get(`${env.apiServer}/api/v1/demand?client_id=${clientId ?? ''}`).subscribe({
                next: (result: any) => {
                    resolve(result.result.data);
                },
                error: (err: any) => {
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
    updateDemand(rawValue: any, demandId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.put(`${env.apiServer}/api/v1/demand/${demandId}`, rawValue
            ).subscribe({
                next: (result: any) => {
                    resolve(result.result);
                },
                error: (err: any) => {
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
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
                    this.isTokenExpired(err);
                    reject(err.error);
                }
            });
        });
    }

    createConfirmModal(): void {
        this.expiredPopup = true;
        // 創建 Overlay 的配置
        const config = new OverlayConfig({
            hasBackdrop: true, // 背景是否有遮罩層
            backdropClass: 'cdk-overlay-dark-backdrop', // 遮罩層 CSS
            positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically() // 位置策略
        });

        // 創建 Overlay
        const overlayRef = this.overlay.create(config);

        // 創建元件 Portal
        const componentPortal = new ComponentPortal(CommonConfirmModalComponent);

        // 將元件 Portal 附加到 Overlay 上
        const componentRef = overlayRef.attach(componentPortal);

        // 設置元件的 customContent
        componentRef.instance.title = this.i18nText['remind'] as any;
        componentRef.instance.fullCustomContent = true as any;
        componentRef.instance.contentTextOnly = this.i18nText['login_again'] as any;
        componentRef.instance.confirmButtonOnly = true as any;
        componentRef.instance.submitText = this.i18nText['button_confirm'] as any;
        componentRef.instance.submitEvent.subscribe(() => {
            this.isOK = true;
            overlayRef.detach();
            this._authService.signOut();
        });
        // Handle auto logout if nothing is done after 6 seconds
        setTimeout(() => {
            if (!this.isOK) {
                overlayRef.detach();
                this._authService.signOut();
            }
        }, 6000);
    }

    isTokenExpired(err: any): void {
        if (err.status === 401) {
            // Prevent multiple popup because of multiple 401 response
            if (!this.expiredPopup) {
                this.createConfirmModal();
            }
            // This can't be used because it doesn't detach the overlay
            // if (this.isOK) {
            //     this._authService.signOut();
            // }
        }
    }
}
