import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'custom',
    templateUrl  : './custom.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomComponent implements OnInit
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
