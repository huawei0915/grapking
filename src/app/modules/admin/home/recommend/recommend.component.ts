import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'recommend',
    templateUrl  : './recommend.component.html',
    styleUrls: ['./recommend.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RecommendComponent implements OnInit
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
