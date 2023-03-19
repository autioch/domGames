define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const inherit = require('utils/inherit');

  function ConfirmMessage(container) {
    inherit(Visible, this, container);
    this.div
      .css({
        cursor: 'pointer'
      })
      .addClass('qbConfirmMessage');
    this._tp = $('<p class="qbMessageTitle" />');
    this._tp.appendTo(this.div).css('font-weight', 'bold');
    this._cp = $('<p class="qbMessageContent" />');
    this._cp.appendTo(this.div);
    this._ep = $('<p class="qbMessageExtra" />');
    this._ep.appendTo(this.div);
    this._fp = $('<p class="qbMessageFollow" />');
    this._fp.appendTo(this.div).css('font-style', 'italic');
  }

  ConfirmMessage.prototype = {
    text: function(title, content, extra, follow) {
      this._t = typeof title === 'undefined' ? '' : title;
      this._c = typeof content === 'undefined' ? '' : content;
      this._e = typeof extra === 'undefined' ? '' : extra;
      this._f = typeof follow === 'undefined' ? '' : follow;
      this._t.length > 0 ? this._tp.html(this._t).show() : this._tp.hide();
      this._c.length > 0 ? this._cp.html(this._c).show() : this._cp.hide();
      this._e.length > 0 ? this._ep.html(this._e).show() : this._ep.hide();
      this._f.length > 0 ? this._fp.html(this._f).show() : this._fp.hide();
      this.center();
      return this;
    },
    follow: function(callback) {
      this.div.unbind('click').click(function() {
        this.div.unbind('click').stop().hide(0);
        callback();
      });
      return this;
    },
    chain: function(list, func, i = 0) {
      if ((list.length - 1) === i) {
        this.follow(func);
      } else {
        this.follow(function() {
          this.chain(list, func, i + 1);
        });
      }
      this.text(list[i].title, list[i].content, list[i].extra, list[i].follow).present();
    }
  };

  module.exports = ConfirmMessage;
});
