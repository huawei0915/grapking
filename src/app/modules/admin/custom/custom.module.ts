import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CustomComponent } from 'app/modules/admin/custom/custom.component';

const customRoutes: Route[] = [
    {
        path     : '',
        component: CustomComponent
    }
];

@NgModule({
    declarations: [
        CustomComponent
    ],
    imports     : [
        RouterModule.forChild(customRoutes)
    ]
})
export class CustomModule
{
}
