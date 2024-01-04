/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ViewEncapsulation, OnInit, QueryList, ElementRef, EventEmitter, Renderer2, ViewChildren, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { ApiService } from '../api.service';
import { take } from 'rxjs';

@Component({
    selector     : 'custom',
    templateUrl  : './custom.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CustomComponent implements OnInit {
    // Template reference variable
    @ViewChildren('clientDetailView') clientDetailView: QueryList<ElementRef>;

    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //肯定事件

    @Input() dataInject: any;
    form: FormGroup;

    clientData = [];
    searchText = '';

    i18nText: any;


    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService,
        private _formBuilder: FormBuilder,
        private _apiService: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.getClient();
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
        });

        this.form = this._formBuilder.group({
            client_id: [(this.dataInject?.client?.id) ?? ''],
            name: [(this.dataInject?.client?.name) ?? ''],
            title: [(this.dataInject?.title) ?? ''],
            form: [(this.dataInject?.form) ?? ''],
            daily_intake: [(this.dataInject?.daily_intake) ?? ''],
            package: [(this.dataInject?.package) ?? ''],
            validity: [(this.dataInject?.validity) ?? ''],
            estimate_cost: [(this.dataInject?.estimate_cost) ?? ''],
            sale_country: [(this.dataInject?.sale_country) ?? ''],
            sale_method: [(this.dataInject?.sale_method) ?? ''],
            health_demand: [(this.dataInject?.health_demand) ?? ''],
            health_group: [(this.dataInject?.health_group) ?? ''],
            effect: [(this.dataInject?.effect) ?? ''],
            flavor: [(this.dataInject?.flavor) ?? ''],
            competitor: [(this.dataInject?.competitor) ?? ''],
            certification: [(this.dataInject?.certification) ?? ''],
            requirement: [(this.dataInject?.requirement) ?? ''],
            note: [(this.dataInject?.note) ?? ''],
            department: [(this.dataInject?.department) ?? ''],
            id: [(this.dataInject?.id) ?? ''],
        });

    }

    //==============================================================
    //api callback
    //==============================================================
    // 取得客戶清單
    async getClient(): Promise<void> {
        await this._apiService.getClient().then((result) => {
            // console.log('result:::', [...result]);
            this.clientData = [...result];
        });
    }

    //==============================================================
    //Common Function
    //==============================================================

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    //==============================================================
    //Account choosen function
    //==============================================================
    // 過濾客戶清單
    getFilteredClient(cateString: string): any[] {
        if (cateString !== '') {
            cateString = cateString.toLowerCase();
            return this.clientData.filter(
                client => (
                    // client.id?.toLowerCase().includes(cateString) ||
                    client.company_name_zh?.toLowerCase().includes(cateString) ||
                    client.company_name_en?.toLowerCase().includes(cateString) ||
                    client.name?.toLowerCase().includes(cateString)));
        } else {
            return this.clientData;
        }
    }

    // 寫入搜尋欄位
    setSearchText(event: any): void {
        this.searchText = event.target.value;
    }
}


