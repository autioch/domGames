define(function (require, exports, module) {
  'use strict';
  var Visible = require('interfaces/visible');
  var inherit = require('utils/inherit');

  function Box(container) {
    inherit(Visible, this, container);
  }

  Box.prototype = {};

  module.exports = Box;
});
