/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'customized',
    templateUrl: './customized.component.html',
    styleUrls: ['./customized.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CustomizedComponent implements OnInit {

    form: FormGroup;
    alertPOPUP = false;
    showToast = false;
    message = 'dialog_confirm_exit_message';
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            title: [''],
            department: [''],
            form: [''],
            daily_intake: [''],
            package: [''],
            validity: [''],
            estimate_cost: [''],
            sale_country: [''],
            sale_method: [''],
            health_demand: [''],
            health_group: [''],
            effect: [''],
            flavor: [''],
            competitor: [''],
            certification: [''],
            requirement: [''],
            note: [''],
        });
    }

    handleCancel(): void {
        this.alertPOPUP = true;
        this.message = 'dialog_confirm_exit_message';
    }

    confrimCancel(): void {
        this.alertPOPUP = false;
    }

    confrimOK(): void {
        this.alertPOPUP = false;
        this.form.reset();
    }

    handleSave(): void {
        const data = this.form.getRawValue();
        this._apiService.addDemand(data).then((result) => {
            console.log(result);
            this.showToast = true;
            setTimeout(() => this.showToast = false, 1500);
        }).catch((err) => {
            console.log('fail', err);
            this.alertPOPUP = true;
            this.message = 'an_error_occurred';
        }).finally(() => {

        });
    }

    // 關閉編輯視窗
    async closeEditModal(): Promise<void> {
        // await this.getDemand();
    }

    goBackToHomePage(): void {
        this._router.navigate(['/home'], {
            queryParams: {}
        });
    }

    countTimeAndGoHome(): void {
        // setTimeout(() => this.goBackToHomePage(), 3000);
    }
}
