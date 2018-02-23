import $ from 'jquery';
import { random, remClassRegEx } from '../utils';

export default {
  initVisible(container) {
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
  locateRandom() {
    return this.refresh().locate(
      random(this.div.parent().height() - this.height),
      random(this.div.parent().width() - this.width)
    );
  },
  locateRandomWindow() {
    return this.refresh().locate(
      random(window.innerHeight - this.height),
      random(window.innerWidth - this.width)
    );
  },
  center() {
    return this.refresh().locate(
      (this.div.parent().height() - this.height) / 2, (this.div.parent().width() - this.width) / 2
    );
  },
  centerWindow() {
    return this.refresh().locate(
      (window.innerHeight - this.height) / 2, (window.innerWidth - this.width) / 2
    );
  },
  refresh() {
    this.left = parseInt(this.div.css('left'), 10);
    this.top = parseInt(this.div.css('top'), 10);
    this.width = this.div.outerWidth();
    this.height = this.div.outerHeight();

    return this;
  },
  locate(topp, leftp) {
    this.div.css({
      left: leftp,
      top: topp
    });

    return this.refresh();
  },
  size(width, height) {
    this.div.css({
      height,
      width
    });

    return this.refresh();
  },
  parseCss(array) {
    this.div.css(array);

    return this.refresh();
  },
  dispose(recursive) {
    this.div.remove();
    if (recursive) {
      for (const i in this) { // eslint-disable-line guard-for-in
        if (this[i].dispose) {
          this[i].dispose(true);
        }
        this[i] = null;
      }
    }
    this.disposed = true;

    return this;
  },
  present(speed, callback) {
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
  prop(title, value) {
    if (value) {
      remClassRegEx(this.div, title);
      this.div.attr(title, value).addClass(title + value);
      this[title] = value;
    }

    return value ? this : this[title];
  },
  appendTo(el) {
    el.append(this.div);

    return this;
  },
  centerAlways() {
    $(window).on('resize', this.center);
    this.div.parent().on('resize', this.center);
    this.div.on('resize', this.center);
    this.centerDispose = this.dispose;
    this.dispose = function dispose(recursive) {
      $(window).off('resize', this.center);
      this.div.parent().off('resize', this.center);
      this.centerDispose(recursive);
    };

    return this.center();
  }
};
