import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FolderComponent } from 'app/modules/admin/folder/folder.component';

const folderRoutes: Route[] = [
    {
        path     : '',
        component: FolderComponent
    }
];

@NgModule({
    declarations: [
        FolderComponent
    ],
    imports     : [
        RouterModule.forChild(folderRoutes)
    ]
})
export class FolderModule
{
}
