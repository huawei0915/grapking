import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'customized',
    templateUrl  : './customized.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizedComponent implements OnInit
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
