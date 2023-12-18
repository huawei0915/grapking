/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [

];
export const compactNavigation: FuseNavigationItem[] = [

];
export const futuristicNavigation: FuseNavigationItem[] = [

];
export const horizontalNavigation: FuseNavigationItem[] = [
    // {
    //     id   : 'example',
    //     title: 'Example',
    //     type : 'basic',
    //     icon : 'heroicons_outline:chart-pie',
    //     link : '/example'
    // },
    {
        id: 'home',
        title: 'tabbar_home',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/home'
    },
    {
        id: 'folder',
        title: 'tabbar_product',
        type: 'basic',
        icon: 'heroicons_outline:folder-open',
        link: '/folder'
    },
    {
        id: 'odm',
        title: 'tabbar_demand',
        type: 'basic',
        icon: 'mat_outline:note_alt',
        link: '/odm'
    },
    {
        id: 'custom',
        title: 'tabbar_customer',
        type: 'basic',
        icon: 'mat_outline:people',
        link: '/custom'
    },
    {
        id: 'account',
        title: 'tabbar_profile',
        type: 'basic',
        icon: 'mat_outline:account_circle',
        link: '/account'
    }
];
