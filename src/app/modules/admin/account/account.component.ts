import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector     : 'account',
    templateUrl  : './account.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit
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
