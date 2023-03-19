define(function(require, exports, module) {
  'use strict';
  var Event = require('interfaces/event');
  var inherit = require('utils/inherit');

  module.exports = {
    initActive: function() {
      this.paused = false;
      this.started = false;
      inherit(Event, this);
    },
    start: function(arg) {
      if (!this.started) {
        this.started = true;
        this.paused = false;
        this.trigger('start', arg);
      }
      return this;
    },
    pause: function(arg) {
      if (this.started) {
        this.started = true;
        this.paused = true;
        this.trigger('pause', arg);
      }
      return this;
    },
    resume: function(arg) {
      if (this.started) {
        this.started = true;
        this.paused = false;
        this.trigger('resume', arg);
      }
      return this;
    },
    stop: function(arg) {
      if (this.started) {
        this.started = false;
        this.paused = true;
        this.trigger('stop', arg);
      }
      return this;
    }
  };
});
