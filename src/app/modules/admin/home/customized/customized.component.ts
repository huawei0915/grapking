import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector     : 'customized',
    templateUrl  : './customized.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomizedComponent implements OnInit
{

    form: FormGroup;
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
    )
    {
    }

    ngOnInit(): void{

    }
}
