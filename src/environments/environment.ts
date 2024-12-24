// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiServer: 'https://gkskapi.grapeking.com.tw',//正式環境
    // apiServer: 'https://gkskapit.grapeking.com.tw',//測試環境
    // apiServer: 'http://139.162.99.150:3435', // 開發環境 develop
    aiUrl: 'https://livetour.istaging.com/d71bc842-36ae-43ab-8781-c5f8a4f8589c',
    vrUrl: 'https://taiwantrade.istaging.com/0d53c3b4-d326-47b8-98ea-f603266c3a4e',
    devAcnt: 'testacct',
    devPwn: 'abcd1234',
    defImg: 'products/0960d5c3-9e90-474e-841d-b381c87b08db.jpeg',
    defProcName: '免疫-益生菌',
    ver: 'v0.1.4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
