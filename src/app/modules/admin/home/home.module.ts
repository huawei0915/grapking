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
import { HomeComponent } from 'app/modules/admin/home/home.component';
import { SharedModule } from 'app/shared/shared.module';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { CompanyComponent } from './company/company.component';
import { CustomizedComponent } from './customized/customized.component';
import { InquireComponent } from './inquire/inquire.component';
import { QuestionComponent } from './question/question.component';
import { NumberToAlphabetPipe } from './recommend/numToAlph.pipe';
import { RecommendComponent } from './recommend/recommend.component';
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
        InquireComponent,
        NumberToAlphabetPipe
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
