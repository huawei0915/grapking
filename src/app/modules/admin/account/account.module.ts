import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { AccountComponent } from 'app/modules/admin/account/account.component';

const accountRoutes: Route[] = [
    {
        path     : '',
        component: AccountComponent
    }
];

@NgModule({
    declarations: [
        AccountComponent
    ],
    imports     : [
        RouterModule.forChild(accountRoutes),
        TranslocoModule,
        CommonModule
    ]
})
export class AccountModule
{
}
