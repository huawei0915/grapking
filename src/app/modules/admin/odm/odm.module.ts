import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { OdmComponent } from 'app/modules/admin/odm/odm.component';
import { SharedModule } from 'app/shared/shared.module';

const odmRoutes: Route[] = [
    {
        path: '',
        component: OdmComponent
    }
];

@NgModule({
    declarations: [
        OdmComponent
    ],
    imports: [
        RouterModule.forChild(odmRoutes),
        SharedModule
    ]
})
export class OdmModule {
}
