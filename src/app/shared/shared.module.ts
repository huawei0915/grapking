import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonConfirmModalComponent } from './common-confirm-modal/common-confirm-modal.component';
import { DemmandFormComponent } from './demmand-form/demmand-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { MatSelectModule } from '@angular/material/select';
import { OdmFormComponent } from './odm-form/odm-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FolderFormComponent } from './folder-form/folder-form.component';

@NgModule({
    declarations:[
        CommonConfirmModalComponent,
        DemmandFormComponent,
        CustomerFormComponent,
        OdmFormComponent,
        FolderFormComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
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
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonConfirmModalComponent,
        DemmandFormComponent,
        CustomerFormComponent,
        OdmFormComponent,
        FolderFormComponent
    ]
})
export class SharedModule
{
}
