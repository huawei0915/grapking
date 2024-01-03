import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonConfirmModalComponent } from './common-confirm-modal/common-confirm-modal.component';
import { DemmandFormModalComponent } from './demmand-form-modal/demmand-form-modal.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations:[
        CommonConfirmModalComponent,
        DemmandFormModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,
        FormsModule,
        MatIconModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        CommonConfirmModalComponent,
        DemmandFormModalComponent
    ]
})
export class SharedModule
{
}
