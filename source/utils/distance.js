define(function(require, exports, module) {
  'use strict';

  module.exports = function(x1, x2, y1, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };
});
