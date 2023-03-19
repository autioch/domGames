define(function(require, exports, module) {
  'use strict';

  module.exports = function(string, fill, length) {
    var s = string.toString();
    while (s.length < length) {
      s = fill + s;
    }
    return s;
  };
});
