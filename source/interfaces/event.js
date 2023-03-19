define(function(require, exports, module) {
  'use strict';
  module.exports = {
    initEvent: function() {
      this._listeners = this._listeners || {};
    },
    on: function(type, listener) {
      if (this._listeners[type]) {
        this._listeners[type].push(listener);
      } else {
        this._listeners[type] = [listener];
      }
      return this;
    },
    hasListener: function(type) {
      return !!this._listeners[type];
    },
    off: function(type, listener) {
      if (this.hasListener(type)) {
        if (!listener) {
          this._listeners[type] = {};
          return this;
        }
        this._listeners[type].forEach(function(item, index) {
          if (listener === item) {
            this.this._listeners[type].splice(index, 1);
            return false;
          }
        }, this);
      }
      return this;
    },
    trigger: function(type, arg) {
      if (this.hasListener(type)) {
        for (const handler in this._listeners[type]) {
          this._listeners[type][handler](arg);
        }
      }
      return this;
    }
  };
});
