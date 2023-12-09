import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'question',
    templateUrl  : './question.component.html',
    encapsulation: ViewEncapsulation.None
})
export class QuestionComponent implements OnInit
{
    /**
     * Constructor
     */
    constructor()
    {
    }

    ngOnInit(): void{

    }
}
