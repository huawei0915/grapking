import { items } from './../../../../mock-api/apps/file-manager/data';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment as env } from 'environments/environment';
import 'hammerjs';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    styleUrls: ['./company.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit {
    currentIndex = 0;
    speed = 2000;
    infinite = true;
    direction = 'right';
    directionToggle = true;
    autoplay = true;
    activity: any;

    closeMenu = true;

    vr = false;
    ai = false;
    vrUrl: SafeUrl;
    aiUrl: SafeUrl;


    picArray: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
    /**
     * Constructor
     */
    constructor(
        public _domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit(): void {
        this.vrUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.vrUrl);
        this.aiUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.aiUrl);
    }

    handleBtn(selectedItem: any): void {
        switch (selectedItem) {
            case 'vr':

                this.vr = true;
                this.ai = false;
                break;
            case 'ai':

                this.vr = false;
                this.ai = true;
                break;
            default:
                break;
        }
    }

    indexChanged(index): void {
        console.log(index);
    }

    toggleDirection($event): void {
        this.direction = this.directionToggle ? 'right' : 'left';
    }

    left(): void {
        console.log('left');
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    }

    right(): void {
        console.log('right');
        if (this.currentIndex <= 9) {
            this.currentIndex++;
        }
    }
}
