import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { environment as env } from 'environments/environment';
import 'hammerjs';
import { ApiService } from '../../api.service';

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

    picIsLoading = false;
    picArray = [];
    /**
     * Constructor
     */
    constructor(
        public _domSanitizer: DomSanitizer,
        private _splashScreenService: FuseSplashScreenService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _apiServer: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.vrUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.vrUrl);
        this.aiUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.aiUrl);

        this._apiServer.getComponey().then((result) => {
            result.forEach((item) => {
                this.picArray.push(env.apiServer + '/api/files/' + item.image);
            });
        }).finally(() => { setTimeout(() => { this.picIsLoading = true; this._changeDetectorRef.detectChanges(); }, 800); });
    }

    handleBtn(selectedItem: any): void {
        setTimeout(() => {
            this._splashScreenService.show();
        }, 100);

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

    hideLoader(): void {
        this._splashScreenService.hide();
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
