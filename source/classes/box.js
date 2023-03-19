define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const inherit = require('utils/inherit');

  function Box(container) {
    inherit(Visible, this, container);
  }

  Box.prototype = {};

  module.exports = Box;
});
