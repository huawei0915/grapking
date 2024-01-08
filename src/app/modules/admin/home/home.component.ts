import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';

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

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
    ) {
    }

    ngOnInit(): void {

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
