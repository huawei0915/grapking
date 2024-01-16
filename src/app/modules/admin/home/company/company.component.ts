import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FuseSplashScreenService } from '@fuse/services/splash-screen';
import { TranslocoService } from '@ngneat/transloco';
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

    slidePosition = 0;
    slideWidth = 300;

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
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {
        this.vrUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.vrUrl);
        this.aiUrl = this._domSanitizer.bypassSecurityTrustResourceUrl(env.aiUrl);
        this.slideWidth = window.innerWidth;
        const lang = this._translocoService.getActiveLang();
        console.log(lang);
        this._apiServer.getComponey().then((result) => {
            console.log(result);
            // result.filter(item => item.language === lang).forEach((item) => {
            // console.log(item);
            // this.picArray.push(env.apiServer + '/api/files/' + item.image);
            // });
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

    hideLoader(): void {
        this._splashScreenService.hide();
    }

    moveLeft(): void {
        this.slidePosition += this.slideWidth;
        this.currentIndex--;
        this.checkBoundaries();
    }

    moveRight(): void {
        this.slidePosition -= this.slideWidth;
        this.currentIndex++;
        this.checkBoundaries();
    }

    checkBoundaries(): void {
        const totalWidth = this.picArray.length * this.slideWidth;
        if (this.slidePosition > 0) {
            this.slidePosition = 0;

        } else if (Math.abs(this.slidePosition) > totalWidth - this.slideWidth) {
            this.slidePosition = -(totalWidth - this.slideWidth);
        }
    }

    handleRightPanel(idx: number): void {
        this.currentIndex = idx;
        this.slidePosition = -(this.slideWidth * idx);
    }
}
