define(function(require, exports, module) {
  'use strict';

  module.exports = function(max, min) {
    const m = min || 0;
    return Math.floor(Math.random() * (max - m + 1)) + m;
  };
});
