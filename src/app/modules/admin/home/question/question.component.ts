import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

    leftList = ['功效', '器官', '年齡', '族群', '國家', '劑型', '包裝', '認證', '葷素'];

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
            result.filter((item: any) => item.level >= 1 && item.level <= 9 && item.is_visible === 1).forEach((item) => {
                this['level' + item.level].push(item);
            });
        }).catch((err) => {
        }).finally(() => {
        });
    }

    selectProduct(item, idx: number): void {
        item.active = !item.active;
        console.log(item.active, item);
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
}
