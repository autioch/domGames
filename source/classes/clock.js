define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const inherit = require('utils/inherit');

  function Clock(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbClock');
    this.timeout = 0;
  }

  Clock.prototype = {
    format: function(i) {
      return i < 10 ? `0${i}` : i;
    },
    start: function() {
      const now = new Date();
      const h = now.getHours();
      const m = this.format(now.getMinutes());
      const s = this.format(now.getSeconds());
      this.div.html(`${h}:${m}:${s}`);
      this.timeout = setTimeout(function() {
        if (this && !this.disposed) {
          this.start();
        }
      }, 500);
    },
    onDispose: function() {
      clearTimeout(this.timeout);
      this.start = null;
    }
  };

  module.exports = Clock;
});
