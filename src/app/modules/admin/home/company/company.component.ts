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
    currentIndex = 0;
    speed = 2000;
    infinite = true;
    direction = 'right';
    directionToggle = true;
    autoplay = true;
    activity: any;

    closeMenu=true;

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
        if(this.currentIndex>0){
            this.currentIndex--;
        }
    }

    right(): void{
        console.log('right');
        if(this.currentIndex<=9){
            this.currentIndex++;
        }
    }
}
