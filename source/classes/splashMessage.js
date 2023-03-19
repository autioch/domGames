define(function(require, exports, module) {
  'use strict';
  var Visible = require('interfaces/visible');
  var inherit = require('utils/inherit');

  function SplashMessage(container) {
    inherit(Visible, this, container);
    this.div
      .on('click', function() {
        $(this).stop(true, true).hide(0);
      })
      .addClass('qbSplashMessage');
  }

  SplashMessage.prototype = {
    splash: function(content, color, bg) {
      this.div
        .stop(true, true)
        .html(content)
        .css({
          color: color || '#f00',
          'background-color': bg || this.div.css('background-color')
        });
      this.center().div.show(0).fadeOut(content.length * 60);
    }
  };

  module.exports = SplashMessage;
});
