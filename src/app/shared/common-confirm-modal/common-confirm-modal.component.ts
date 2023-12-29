import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { environment as env } from 'environments/environment';
import { take } from 'rxjs';

@Component({
    selector: 'app-shared-common-confirm-modal',
    templateUrl: './common-confirm-modal.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CommonConfirmModalComponent implements OnInit {
    // Template reference variable
    @ViewChild('viewMemo') viewMemo: ElementRef;

    // Decide whether fully customize modal
    @Input() fullCustomTitle = false;      //true:去掉預設標題  false:保留預設標題
    @Input() fullCustomContent = false;    //true:去掉預設內容  false:保留預設內容
    @Input() fullCustomEnd = false;        //true:去掉預設結尾  false:保留預設結尾

    // Default parameter
    @Input() title = '';                         //標題
    @Input() productImage = env.defImg;          //產品圖片
    @Input() productName = env.defProcName;      //產品名稱
    @Input() memo = '';                          //備註
    @Input() submitText = '';                    //確認按鈕文字
    @Input() cancelText = '';                    //取消按鈕文字

    // Confirm button only or two button instead?
    @Input() confirmButtonOnly = false;     //true:只有確認按鈕  false:保留取消跟確認按鈕

    // Button event
    @Output() cancelEvent = new EventEmitter();  //取消事件
    @Output() submitEvent = new EventEmitter();  //加入草稿事件

    i18nText: any;

    /**
     * Constructor
     */
    constructor(
        private _translocoService: TranslocoService
    ) {
    }

    ngOnInit(): void {
        this._translocoService.load(this._translocoService.getActiveLang()).pipe(take(1)).subscribe((translation: any) => {
            this.i18nText = translation;
            setTimeout(() => { this.viewMemo.nativeElement.innerText = this.memo; });
        });

    }

    // 取得圖片
    getImage(img: string): string {
        return `${env.apiServer}/api/files/${img}`;
    }

    //寫入備忘錄
    setMemo(input: string) {
        this.memo = input;
    }
}
