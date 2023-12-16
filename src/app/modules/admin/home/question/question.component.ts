import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit {
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
}
