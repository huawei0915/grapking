import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomComponent } from 'app/modules/admin/custom/custom.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

const customRoutes: Route[] = [
    {
        path     : '',
        component: CustomComponent
    }
];

@NgModule({
    declarations: [
        CustomComponent,
    ],
    imports     : [
        RouterModule.forChild(customRoutes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        NgxHmCarouselModule,
        TranslocoModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,
        SharedModule
    ]
})
export class CustomModule
{
}
