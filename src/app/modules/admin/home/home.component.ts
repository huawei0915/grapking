import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    searchAreaCheck = false;
    questionAreaCheck = false;
    recommandAreaCheck = false;
    demmandAreaCheck = false;

    lang = 'zh';
    langButtonCheck = false;

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        // 沒有accessToken就跳轉到登入頁面
        if ((this._authService.accessToken ?? '').trim() === '') {
            this._authService.signOut();
        }
        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
            if (activeLang === 'en') {
                this.langButtonCheck = true;
            } else {
                this.langButtonCheck = false;
            }
        });
    }

    changeLang(): void {
        const lang = this._translocoService.getActiveLang();
        if (lang === 'zh') {
            this._translocoService.setActiveLang('en');
        } else {
            this._translocoService.setActiveLang('zh');
        }

    }

    moveToSearchArea(): void {

    }
    moveToQuestionnaireArea(): void {

    }
    moveToRecommandArea(): void {

    }
    moveToDemandArea(): void {

    }
}
