import { Route } from '@angular/router';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'signed-in' },

    // Redirect signed in user to the '/example'
    //

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    // {
    //     path: '',
    //     component  : LayoutComponent,
    //     data: {
    //         layout: 'empty'
    //     },
    //     children   : [
    //         {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
    //     ]
    // },

    // Admin routes
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            // {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            { path: 'home', loadChildren: () => import('app/modules/admin/home/home.module').then(m => m.HomeModule) },
            { path: 'folder', loadChildren: () => import('app/modules/admin/folder/folder.module').then(m => m.FolderModule) },
            { path: 'odm', loadChildren: () => import('app/modules/admin/odm/odm.module').then(m => m.OdmModule) },
            { path: 'custom', loadChildren: () => import('app/modules/admin/custom/custom.module').then(m => m.CustomModule) },
            { path: 'account', loadChildren: () => import('app/modules/admin/account/account.module').then(m => m.AccountModule) },
            // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
            // path. Below is another redirection for that path to redirect the user to the desired
            // location. This is a small convenience to keep all main routes together here on this file.
            { path: 'signed-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'home' }
        ]
    }
];
