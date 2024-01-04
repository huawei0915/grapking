import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { environment as env } from 'environments/environment';
import { ApiService } from '../api.service';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

    usrData: any;
    ver = env.ver;


    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _apiService: ApiService,
        private _router: Router,
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this._apiService.getUser().then((result) => {
            this.usrData = result;
            console.log('UserTest::', this.usrData);
        }).catch(() => {
            this._authService.signOut();
            this._router.navigate(['/signed-in'], {
                queryParams: {}
            });
        }).finally(() => { });
    }

    signOut(): void {
        this._authService.signOut();
        this._router.navigate(['/signed-in'], {
            queryParams: {}
        });

    }
}
