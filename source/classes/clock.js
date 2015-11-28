define(function (require, exports, module) {
  'use strict';
  var Visible = require('interfaces/visible');
  var inherit = require('utils/inherit');

  function Clock(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbClock');
    this.timeout = 0;
  }

  Clock.prototype = {
    format: function (i) {
      return i < 10 ? '0' + i : i;
    },
    start: function () {
      var h, m, s, now = new Date();
      h = now.getHours();
      m = this.format(now.getMinutes());
      s = this.format(now.getSeconds());
      this.div.html(h + ':' + m + ':' + s);
      this.timeout = setTimeout(function () {
        if (this && !this.disposed) {
          this.start();
        }
      }, 500);
    },
    onDispose: function () {
      clearTimeout(this.timeout);
      this.start = null;
    }
  };

  module.exports = Clock;
});
