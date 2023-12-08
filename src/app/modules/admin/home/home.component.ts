import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'home',
    templateUrl  : './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit
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
