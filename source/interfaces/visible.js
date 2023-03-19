define(function(require, exports, module) {
  'use strict';

  const random = require('utils/random');
  const remClassRegEx = require('utils/remClassRegEx');

  module.exports = {
    initVisible: function(container) {
      this.div = $('<div />')
        .appendTo(container || $('body'))
        .css({
          display: 'none',
          'user-select': 'none'
        });
      this.locateRandom = container ? this.locateRandom : this.locateRandomWindow;
      this.center = container ? this.center : this.centerWindow;
      this.div.addClass('qbGameObject');
      this.presentSpeed = 400;
      this.disposed = false;
      this.refresh();
    },
    locateRandom: function() {
      return this.refresh().locate(random(this.div.parent().height() - this.height),
                                   random(this.div.parent().width() - this.width));
    },
    locateRandomWindow: function() {
      return this.refresh().locate(random(window.innerHeight - this.height),
                                   random(window.innerWidth - this.width));
    },
    center: function() {
      return this.refresh().locate((this.div.parent().height() - this.height) / 2, (this.div.parent().width() - this.width) / 2);
    },
    centerWindow: function() {
      return this.refresh().locate((window.innerHeight - this.height) / 2, (window.innerWidth - this.width) / 2);
    },
    refresh: function() {
      this.left = parseInt(this.div.css('left'), 10);
      this.top = parseInt(this.div.css('top'), 10);
      this.width = this.div.outerWidth();
      this.height = this.div.outerHeight();
      return this;
    },
    locate: function(topp, leftp) {
      this.div.css({
        left: leftp,
        top: topp
      });
      return this.refresh();
    },
    size: function(width, height) {
      this.div.css({
        height: height,
        width: width
      });
      return this.refresh();
    },
    parseCss: function(array) {
      this.div.css(array);
      return this.refresh();
    },
    dispose: function(recursive) {
      this.div.remove();
      if (recursive) {
        for (const i in this) {
          if (this[i].dispose) {
            this[i].dispose(true);
          }
          this[i] = null;
        }
      }
      this.disposed = true;
      return this;
    },
    present: function(speed, callback) {
      let c;
      switch (typeof speed) {
        case 'undefined':
          c = undefined;
          break;
        case 'function':
          c = speed;
          break;
        default:
          this.presentSpeed = speed;
          c = callback;
      }
      this.div.fadeIn(this.presentSpeed, c);
      return this;
    },
    prop: function(name, value) {
      if (value) {
        remClassRegEx(this.div, name);
        this.div.attr(name, value).addClass(name + value);
        this[name] = value;
      }
      return value ? this : this[name];
    },
    appendTo: function(el) {
      el.append(this.div);
      return this;
    },
    centerAlways: function() {
      $(window).on('resize', this.center);
      this.div.parent().on('resize', this.center);
      this.div.on('resize', this.center);
      this.centerDispose = this.dispose;
      this.dispose = function(recursive) {
        $(window).off('resize', this.center);
        this.div.parent().off('resize', this.center);
        this.centerDispose(recursive);
      };
      return this.center();
    }
  };
});
