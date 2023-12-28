import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonConfirmModalComponent } from './common-confirm-modal/common-confirm-modal.component';

@NgModule({
    declarations:[
        CommonConfirmModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslocoModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormsModule,
        CommonConfirmModalComponent
    ]
})
export class SharedModule
{
}
