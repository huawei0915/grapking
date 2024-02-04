/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { ApiService } from '../../api.service';


@Component({
    selector: 'recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RecommendComponent implements OnInit {
    @Input() keywordFromInquirePage = '';
    @Input() comeFromInquirePage = false;

    @Output() backEvent = new EventEmitter();  //取消事件

    productArr = [];
    showDetailPage = true;
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

    showMaterialPage = false;
    materiarDetail: any;
    // listOrGridChange = 'list';

    awardsArr = [];
    selectAward = false;
    papersArr = [];
    selectPaper = false;
    patentsArr = [];
    selectPatent = false;
    doseData: any;
    selectDoseText = '';


    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _translocoService: TranslocoService,
        private _fuseLoadingService: FuseLoadingService
    ) {
    }

    get listOrGridChange(): string {
        return this._apiService.recommandListOrGirdChange;
    }

    set listOrGridChange(value: string) {
        this._apiService.recommandListOrGirdChange = value;
    }

    ngOnInit(): void {
        let keyword = this._route.snapshot.queryParams['keyword'];
        const category = this._route.snapshot.queryParams['category'];
        const func = this._route.snapshot.queryParams['function'];
        if (this.keywordFromInquirePage !== '') {
            keyword = this.keywordFromInquirePage;

        }
        this.getProduct(keyword, func, category);
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
                // 有搜尋條件 有資料
                this.showDetailPage = true;
                this.getProductDetail(this.productArr[0].id, 0);
            } else if (this.productArr.length > 0) {
                // 初始化進入 有資料
                this.showDetailPage = false;
            } else {
                console.log('沒資料');
                // 沒資料 顯示提示
                this.alertPOPUP = true;
                this.message = 'product_not_found_message';
            }
        }).finally(() => {
            this._fuseLoadingService.hide();
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

    openLink(url: string): void {
        window.open(`${env.apiServer}/api/files/${url}`, '_blank');
    }

    // 顯示包裝/劑量詳細
    showDetail(type: string): void {

        if (type === 'form') {
            this.showDetailTable = true;
            this.packageArr = [];
            this.awardsArr = [];
            this.papersArr = [];
            this.patentsArr = [];
            this.selectPatent = false;
            this.selectAward = false;
            this.selectPaper = false;
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
            this.showDetailTable = true;
            this.formArr = [];
            this.awardsArr = [];
            this.papersArr = [];
            this.patentsArr = [];
            this.selectPatent = false;
            this.selectAward = false;
            this.selectPaper = false;
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
        } else if (type === 'patent') {
            this.selectPatent = true;
            this.selectAward = false;
            this.selectPaper = false;
            this.packageArr = [];
            this.formArr = [];
            this.patentsArr = [...this.materiarDetail.patents];
            if (this.patentsArr.length > 0) {
                this.showDetailTable = true;
            } else {
                this.showDetailTable = false;
            }
        } else if (type === 'award') {
            this.selectPatent = false;
            this.selectAward = true;
            this.selectPaper = false;
            this.packageArr = [];
            this.formArr = [];
            this.awardsArr = [...this.materiarDetail.awards];
            if (this.awardsArr.length > 0) {
                this.showDetailTable = true;
            } else {
                this.showDetailTable = false;
            }
        } else if (type === 'paper') {
            this.selectPatent = false;
            this.selectAward = false;
            this.selectPaper = true;
            this.packageArr = [];
            this.formArr = [];
            this.papersArr = [...this.materiarDetail.papers];
            if (this.papersArr.length > 0) {
                this.showDetailTable = true;
            } else {
                this.showDetailTable = false;
            }
        } else {
            this.showDetailTable = false;
        }
    }

    // 顯示主成分
    showIngredients(id: string, idx: number): void {
        this.showMaterialPage = true;
        this._apiService.getIngredient(id).then((result) => {
            this.materiarDetail = result;
            this.selectDoseText = this.doseData[idx];
            this.patentsArr = [...result.patents];
            this.awardsArr = [...result.awards];
            this.papersArr = [...result.papers];
        }).catch(() => {

        }).finally(() => {

        });
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
            this.showToast = true;
            setTimeout(() => this.showToast = false, 1500);
        }).catch((err) => {
            this.alertPOPUP = true;
            this.message = 'an_error_occurred';
        }).finally(() => {

        });
    }

    confrimCancel(): void {
        this.alertPOPUP = false;
        this._router.navigate(['/home/question']);
    }

    confrimOK(): void {
        this.alertPOPUP = false;
        this.getProduct();
    }

    // 取得商品詳細
    getProductDetail(id: string, idx: number): void {
        this.selectIdx = idx;
        this._apiService.getProductDetail(id).then((result) => {
            this.productDetail = result;
            this.showDetailPage = true;
            this.doseData = result.ingredients;;
            this._fuseLoadingService.hide();
        }).catch((err) => {
            this.alertPOPUP = true;
            this.showDetailPage = false;
            this.message = 'an_error_occurred';
            this._fuseLoadingService.hide();
        });
    }

    getBack(): void {
        if (this._apiService.callFromFolder) {
            this._apiService.callFromFolder = false;
            history.back();
        } else if (this.comeFromInquirePage) {
            this.backEvent.emit();
            return;
        } else {
            if (this.showMaterialPage) {
                this.showMaterialPage = false;
                return;
            }
            this.showDetailPage = false;
        }
    }

    getBackLastLayers(): void {
        if (this.showMaterialPage) {
            this.showMaterialPage = false;
            return;
        }
        this.showDetailPage = false;
    }
}
