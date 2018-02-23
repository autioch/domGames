require.config({
  paths: {
    //libs
    'jquery': 'jquery-2.1.4.min',
    // "lib2": "assets/js/lib/lib2",
    // "lib3": "assets/js/lib/lib3",
    // "lib4": "assets/js/lib/lib4"
  }
});
//start the app
define(function (require, exports, module) {
  var classes = require('classes/index');
  var interfaces = require('interfaces/index');
  var settings = require('settings/index');
  var utils = require('utils/index');
  console.log(Object.getOwnPropertyNames(classes));
  console.log(Object.getOwnPropertyNames(interfaces));
  console.log(Object.getOwnPropertyNames(settings));
  console.log(Object.getOwnPropertyNames(utils));
});
