import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

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
    langButtonCheck = true;

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {

        this._translocoService.langChanges$.subscribe((activeLang) => {
            // Get the active lang
            this.lang = activeLang;
            if (activeLang === 'en') {
                this.langButtonCheck = false;
            } else {
                this.langButtonCheck = true;
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
