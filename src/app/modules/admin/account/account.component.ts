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

    usrData :any;


    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _userService: UserService,
        private _apiServer: ApiService,
        private _router:Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this._apiServer.getUser().then((result) => {
            this.usrData = result;
            console.log("UserTest::",this.usrData);
        }).catch(() => {
            // this._authService.signOut();
            // this._router.navigate(['/signed-in'], {
            //     queryParams: {}
            //   });
            // Set the redirect url.
            // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
            // to the correct page after a successful sign in. This way, that url can be set via
            // routing file and we don't have to touch here.
            // const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in';
            // console.log("d::" + this._activatedRoute.snapshot.queryParamMap.get('redirectURL') );
            // Navigate to the redirect url
            // this._router.navigateByUrl(redirectURL);


            console.log("I am the king");
        }).finally(() => {});
        this.usrData = this._userService.user$
        console.log("asdfasdf",this.usrData);
        console.log(this.usrData.name);
        console.log(this.usrData.position);
    }

    signOut(){
        this._authService.signOut();
    }
}
