import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import 'hammerjs';

@Component({
    selector: 'folder',
    templateUrl: './folder.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FolderComponent implements OnInit {
    /**
     * Constructor
     */
    constructor() { }

    ngOnInit(): void { }

}
