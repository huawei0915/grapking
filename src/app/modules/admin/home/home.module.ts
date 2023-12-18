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
        TranslocoModule
    ]
})
export class HomeModule {
}
