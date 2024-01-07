import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FolderComponent } from 'app/modules/admin/folder/folder.component';
import { SharedModule } from 'app/shared/shared.module';

const folderRoutes: Route[] = [
    {
        path: '',
        component: FolderComponent
    }
];

@NgModule({
    declarations: [
        FolderComponent
    ],
    imports: [
        RouterModule.forChild(folderRoutes),
        SharedModule
    ]
})
export class FolderModule {
}
