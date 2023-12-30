/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
    selector: 'customized',
    templateUrl: './customized.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizedComponent implements OnInit {

    form: FormGroup;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
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
        // TODO: alert reset form
        this.form.reset();
    }

    handleSave(): void {
        const data = this.form.getRawValue();
        this._apiService.addDemand(data).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
        });
    }
}
