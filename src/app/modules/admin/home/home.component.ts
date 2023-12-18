import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
    /**
     * Constructor
     */
    constructor() {
    }

    ngOnInit(): void {

    }
}
