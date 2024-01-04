import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonConfirmModalComponent } from './common-confirm-modal/common-confirm-modal.component';
import { DemmandFormComponent } from './demmand-form/demmand-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations:[
        CommonConfirmModalComponent,
        DemmandFormComponent,
        CustomerFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,
        FormsModule,
        MatIconModule,
        MatSelectModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        CommonConfirmModalComponent,
        DemmandFormComponent,
        CustomerFormComponent
    ]
})
export class SharedModule
{
}
