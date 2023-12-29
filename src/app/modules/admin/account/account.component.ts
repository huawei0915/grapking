import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { ApiService } from '../api.service';
import { environment as env } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
        private _userService: UserService,
        private _apiService: ApiService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this._apiService.getUser().then((result) => {
            this.usrData = result;
            console.log('UserTest::', this.usrData);
        }).catch(() => {

            //!!!Not effect
            // this._authService.signOut();
            // this._router.navigate(['/signed-in'], {
            //     queryParams: {}
            //   });

            //!!!Not effect
            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in';
            // console.log("redirectURL::" + this._activatedRoute.snapshot.queryParamMap.get('redirectURL') );
            // Navigate to the redirect url
            // this._router.navigateByUrl(redirectURL);

            //Bad Method
            window.location.href = '/signed-in';

        }).finally(() => { });
    }

    signOut(): void {
        this._authService.signOut();
        //Bad Method
        window.location.href = '/signed-in';

    }
}
