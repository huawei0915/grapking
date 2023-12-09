import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import 'hammerjs';

@Component({
    selector     : 'company',
    templateUrl  : './company.component.html',
    styleUrls: ['./company.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CompanyComponent implements OnInit
{
    index = 0;
    speed = 2000;
    infinite = true;
    direction = 'right';
    directionToggle = true;
    autoplay = true;
    activity: any;



    picArray: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
    /**
     * Constructor
     */
    constructor()
    {
    }

    ngOnInit(): void{
    }

    indexChanged(index): void {
        console.log(index);
    }

    toggleDirection($event): void {
        this.direction = this.directionToggle ? 'right' : 'left';
    }

    left(): void{
        console.log('left');
        if(this.index>0){
            this.index--;
        }
    }

    right(): void{
        console.log('right');
        if(this.index<=9){
            this.index++;
        }
    }
}
