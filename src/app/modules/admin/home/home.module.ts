import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { CompanyComponent } from './company/company.component';
import { InquireComponent } from './inquire/inquire.component';
import { QuestionComponent } from './question/question.component';
import { RecommendComponent } from './recommend/recommend.component';
import { CustomizedComponent } from './customized/customized.component';
import { CommonModule } from '@angular/common';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonConfirmModalComponent } from 'app/shared/common-confirm-modal/common-confirm-modal.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
const homeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'company',
        component: CompanyComponent
    },
    {
        path: 'recommend',
        component: RecommendComponent
    },
    {
        path: 'question',
        component: QuestionComponent
    },
    {
        path: 'customized',
        component: CustomizedComponent
    },
    {
        path: 'inquire',
        component: InquireComponent
    }
];

@NgModule({
    declarations: [
        HomeComponent,
        CompanyComponent,
        RecommendComponent,
        QuestionComponent,
        CustomizedComponent,
        InquireComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(homeRoutes),
        FormsModule,
        NgxHmCarouselModule,
        ReactiveFormsModule,
        TranslocoModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        MatCheckboxModule,
        SharedModule
    ]
})
export class HomeModule {
}
