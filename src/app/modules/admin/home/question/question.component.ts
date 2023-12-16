import { activities } from './../../../../mock-api/pages/activities/data';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { productLevel1, productLevel2, productLevel3, productLevel4, productLevel5, productLevel6, productLevel7, productLevel8, productLevel9 } from './mock';
@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {

    leftList = ['功效', '器官', '年齡', '族群', '國家', '劑型', '包裝', '認證', '葷素'];

    level1 = productLevel1;
    level2 = productLevel2;
    level3 = productLevel3;
    level4 = productLevel4;
    level5 = productLevel5;
    level6 = productLevel6;
    level7 = productLevel7;
    level8 = productLevel8;
    level9 = productLevel9;
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
            console.log(result);
        }).catch((err) => {
        });
    }

    selectProduct(item, idx: number): void {
        item.active = !item.active;
        if (item.active) {
            this['puoductArr' + this.currentLevel].push(item);
        }
    }

    nextStep(): void {
        if (this.currentLevel < 9) {
            this.currentLevel += 1;
            this.nowLevel = this['level' + this.currentLevel];
        }
    }
}
