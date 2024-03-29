// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_URL: 'https://social-media-laravel-843c70632aa2.herokuapp.com/api',

  pusher: {
    key: '17e9116e9feb151a1092',
    // key: 'b8dd19d436b6a0402060',
    //17e9116e9feb151a1092
  },
  
  storage_URL: 'https://file-upload-example-1.s3.amazonaws.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
