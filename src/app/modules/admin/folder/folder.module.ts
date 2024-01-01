import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { FolderComponent } from 'app/modules/admin/folder/folder.component';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
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
        CommonModule,
        FormsModule,
        NgxHmCarouselModule,
        ReactiveFormsModule,
        TranslocoModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        SharedModule
    ]
})
export class FolderModule {
}
