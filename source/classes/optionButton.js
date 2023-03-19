define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const inherit = require('utils/inherit');

  function OptionButton(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbOptionButton').css({
      cursor: 'pointer'
    });
    this.title = '';
    this.desc = '';
    this.checked = false;
    this.enabled = false;
    this.action = function() {};
  }

  OptionButton.prototype = {
    enable: function(status) {
      this.enabled = status;
      if (this.enabled) {
        this.div.addClass('enabled');
      } else {
        this.div.removeClass('enabled');
      }
    },
    check: function(status) {
      this.checked = status;
      if (this.checked) {
        this.div.addClass('checked');
      } else {
        this.div.removeClass('checked');
      }
      return this;
    },
    click: function(action) {
      this.action = action;
      this.div.off('mousedown').on('mousedown', this.action);
      return this;
    },
    repaint: function() {
      this.div.attr('title', this.title);
      this.div.html(this.desc);
      this.check(this.checked);
      this.enable(this.enabled);
      this.click(this.action);
    }
  };

  module.exports = OptionButton;
});
