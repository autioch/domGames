define(function(require, exports, module) {
  'use strict';
  module.exports = function(from, to, args) {
    /*
     for (var i in from) {
     to[i] = from[i];
     }
     for (var i in from.prototype) {
     to[i] = from.prototype[i];
     }
     */
    from.call(to, args);

    /*
     if (typeof to.init === 'function') {
     to.init(args);
     }
     */
  };
});
