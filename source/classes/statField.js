define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const inherit = require('utils/inherit');
  const isset = require('utils/isset');

  function StatField(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbStatField');
    this.limited = false;
    this.title = '';
    this.desc = '';
    this._desc = $('<label class="desc" />');
    this.div.append(this._desc);
    this.value = 0;
    this._value = $('<span class="val" />');
    this.div.append(this._value);
    this.separator = '/';
    this._separator = $('<span class="separator">/</span>');
    this.div.append(this._sep);
    this.maximum = 0;
    this._maximum = $('<span class="max" />');
    this.div.append(this._maximum);
  }

  StatField.prototype = {
    val: function(value) {
      if (isset(value)) {
        this.value = value;
        this._value.html(this.value);
        return this;
      }
      return this.value;
    },
    valInc: function(value) {
      this.value += value ? parseInt(value, 10) : 1;
      this._value.html(this.value);
    },
    max: function(value) {
      if (isset(value)) {
        this.maximum = value;
        this._maximum.html(this.maximum);
        return this;
      }
      return this.maximum;
    },
    maxInc: function(value) {
      this.maximum += value ? parseInt(value, 10) : 1;
      this._maximumthis.html(this.maximum);
    },
    repaint: function() {
      this.div.attr('title', this.title);
      this._desc.html(this.desc);
      this._value.html(this.value);
      this._separator.html(this.separator);
      this._maximum.html(this.maximum);
      this.limit(this.limited);
      return this;
    },
    parseStatField: function(array) {
      for (const a in array) {
        if (isset(this[a]) && (typeof this[a] !== 'function')) {
          // TODO
          this[a] = array[a];
        }
      }
      this.repaint();
      return this;
    },
    limit: function(enabled) {
      if (isset(enabled)) {
        this.limited = enabled;
        if (enabled) {
          this._separator.show(0);
          this._maximum.show(0);
        } else {
          this._separator.hide(0);
          this._maximum.hide(0);
        }
        return this;
      }
      return this.limited && (this.value > this.maximum);
    }
  };

  module.exports = StatField;
});
