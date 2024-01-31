import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ApiService } from '../../api.service';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit, OnDestroy {

    rightList = Array.from({ length: 9 }, (_, i) => `questionnaire_question_${i + 1}_keyword`);

    level1 = [];
    level2 = [];
    level3 = [];
    level4 = [];
    level5 = [];
    level6 = [];
    level7 = [];
    level8 = [];
    level9 = [];

    currentLevel = 1; // 初始化當前等級為1

    productArr1 = [];
    productArr2 = [];
    productArr3 = [];
    productArr4 = [];
    productArr5 = [];
    productArr6 = [];
    productArr7 = [];
    productArr8 = [];
    productArr9 = [];

    packageArr = [];
    closeTag = true;
    nowLevel = this.level1;
    lang = 'zh';
    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _apiService: ApiService,
        private _router: Router,
    ) {
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
        });
    }

    ngOnInit(): void {
        this._apiService.getCategory().then((result) => {
            result.filter((item: any) => item.level === 2 && item.is_visible === 1).forEach((data) => {
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
                    // packageArr 中的 name_zh == data.name_zh 要塞回去this.level7
                    const slicedString = this.packageArr.filter(str => str.name_zh.includes(data.name_zh));
                    // console.log(slicedString);
                    this.level7.push(slicedString[0]);
                    console.log(this.level7);
                    // this.level7.push(data);
                } else if (data.parent.includes('CE000')) {
                    this.level8.push(data);
                } else if (data.parent.includes('MV000')) {
                    this.level9.push(data);
                } else {
                }

            });
        }).catch((err) => {
        }).finally(() => {
        });
        this.getPackage();
    }

    ngOnDestroy(): void {
        this.productArr1 = [];
        this.productArr2 = [];
        this.productArr3 = [];
        this.productArr4 = [];
        this.productArr5 = [];
        this.productArr6 = [];
        this.productArr7 = [];
        this.productArr8 = [];
        this.productArr9 = [];
    }


    selectProduct(item, idx: number): void {
        item.active = !item.active;
        if (item.active) {
            this['productArr' + this.currentLevel].push(item);
        } else {
            const slicedString = this['productArr' + this.currentLevel].filter(str => str.name_zh.includes(item.name_zh));
            this['productArr' + this.currentLevel] = this['productArr' + this.currentLevel].filter((product: any) => product.name_zh !== slicedString[0].name_zh);
        }

    }

    nextStep(): void {
        if (this.currentLevel < 9) {
            this.currentLevel += 1;
            this.nowLevel = this['level' + this.currentLevel];
        }
    }

    prevStep(): void {
        if (this.currentLevel > 1) {
            this.currentLevel -= 1;
            this.nowLevel = this['level' + this.currentLevel];
        }
    }

    handleRightPanel(idx: number): void {
        this.currentLevel = idx + 1;
        this.nowLevel = this['level' + this.currentLevel];
    }

    // 取得問題文字
    getQuestionText(): string {
        return 'questionnaire_question_' + this.currentLevel;
    }

    // 尋找產品
    handleFinish(): void {
        let categoryArr = [];

        for (let i = 1; i <= 9; i++) {
            categoryArr = categoryArr.concat(this['productArr' + i].map((product: any) => product.id));
        }

        this._router.navigate(['/home/recommend'], {
            queryParams: {
                category: categoryArr.toString()
            }
        });
    }

    getPackage(): void {
        this._apiService.getPackage().then((result) => {
            this.packageArr = result;
        }).catch((err) => {

        }).finally(() => {

        });
    }

}
