import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IsActiveMatchOptions } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '@fuse/components/navigation/horizontal/horizontal.component';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector       : 'fuse-horizontal-navigation-basic-item',
    templateUrl    : './basic.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseHorizontalNavigationBasicItemComponent implements OnInit, OnDestroy
{
    @Input() item: FuseNavigationItem;
    @Input() name: string;


    isActiveMatchOptions: IsActiveMatchOptions;
    private _fuseHorizontalNavigationComponent: FuseHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private iconSubscription: Subscription;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseUtilsService: FuseUtilsService,
        private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer
    )
    {
        // Set the equivalent of {exact: false} as default for active match options.
        // We are not assigning the item.isActiveMatchOptions directly to the
        // [routerLinkActiveOptions] because if it's "undefined" initially, the router
        // will throw an error and stop working.
        this.isActiveMatchOptions = this._fuseUtilsService.subsetMatchOptions;

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Set the "isActiveMatchOptions" either from item's
        // "isActiveMatchOptions" or the equivalent form of
        // item's "exactMatch" option
        this.isActiveMatchOptions =
            this.item.isActiveMatchOptions ?? this.item.exactMatch
                ? this._fuseUtilsService.exactMatchOptions
                : this._fuseUtilsService.subsetMatchOptions;

        // Get the parent navigation component
        this._fuseHorizontalNavigationComponent = this._fuseNavigationService.getComponent(this.name);

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Subscribe to onRefreshed on the navigation component
        this._fuseHorizontalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
        this.registerCustomIcons();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        this.iconSubscription.unsubscribe();
    }

    // aa(item?: any): void{
    //     switch (item.id){
    //         case 'home':
    //             item.icon='assets/icons/tab1-red.svg';
    //         break;
    //         case 'folder':
    //             item.icon='assets/icons/tab2-red.svg';
    //         break;
    //         case 'odm':
    //             item.icon='assets/icons/tab3-red.svg';
    //         break;
    //         case 'custom':
    //             item.icon='assets/icons/tab4-red.svg';
    //         break;
    //         case 'account':
    //             item.icon='assets/icons/tab5-red.svg';
    //         break;
    //         default:
    //         break;
    //     }

    // }

    registerCustomIcons(): void {
        // Register your custom SVG icon
        this._matIconRegistry.addSvgIcon(
          'tab1',
          this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tab1.svg')
        );
        this._matIconRegistry.addSvgIcon(
            'tab2',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tab2.svg')
          );
          this._matIconRegistry.addSvgIcon(
            'tab3',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tab3.svg')
          );
          this._matIconRegistry.addSvgIcon(
            'tab4',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tab4.svg')
          );
          this._matIconRegistry.addSvgIcon(
            'tab5',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/tab5.svg')
          );
      }
}
