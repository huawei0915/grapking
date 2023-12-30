import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

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

    puoductArr1 = [];
    puoductArr2 = [];
    puoductArr3 = [];
    puoductArr4 = [];
    puoductArr5 = [];
    puoductArr6 = [];
    puoductArr7 = [];
    puoductArr8 = [];
    puoductArr9 = [];

    nowLevel = this.level1;

    /**
     * Constructor
     */
    constructor(
        private _apiService: ApiService,
    ) {

    }

    ngOnInit(): void {
        this._apiService.getCategory().then((result) => {
            result.filter((item: any) => item.level === 2 && item.is_visible === 1).forEach((data) => {
                if (data.path.includes('function')) {
                    this.level1.push(data);
                } else if (data.path.includes('organ')) {
                    this.level2.push(data);
                } else if (data.path.includes('age')) {
                    this.level3.push(data);
                } else if (data.path.includes('group')) {
                    this.level4.push(data);
                } else if (data.path.includes('country')) {
                    this.level5.push(data);
                } else if (data.path.includes('form')) {
                    this.level6.push(data);
                } else if (data.path.includes('package')) {
                    this.level7.push(data);
                } else if (data.path.includes('certification')) {
                    this.level8.push(data);
                } else if (data.path.includes('meatvegan')) {
                    this.level9.push(data);
                } else {
                }

            });
        }).catch((err) => {
        }).finally(() => {
        });
    }

    selectProduct(item, idx: number): void {
        item.active = !item.active;
        if (item.active) {
            this['puoductArr' + this.currentLevel].push(item);
        } else {
            const slicedString = this['puoductArr' + this.currentLevel].filter(str => str.name_zh.includes(item.name_zh));
            this['puoductArr' + this.currentLevel] = this['puoductArr' + this.currentLevel].filter((product: any) => product.name_zh !== slicedString[0].name_zh);
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

    // 取得問題文字
    getQuestionText(): string {
        return 'questionnaire_question_' + this.currentLevel;
    }

    // 尋找產品
    handleFinish(): void {
    }
}
