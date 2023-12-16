import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'inquire',
    templateUrl: './inquire.component.html',
    encapsulation: ViewEncapsulation.None
})
export class InquireComponent implements OnInit {

    /**
     * Constructor
     */
    constructor(
        public _domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {

    }
}
