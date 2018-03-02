/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle */
import { Visible, Active } from '../interfaces';
import { inherit } from '../utils';

function Target(container, type, age) {
  inherit(Visible, this, container);
  inherit(Active, this);

  this.colorize = Math.random() > 0.5 ? this.green : this.blue;
  this.div.addClass('qbTarget').css({
    'background-color': `rgb(${this.colorize(200)})`,
    'z-index': 3
  });
  this.prop('type', type);
  this.ageLeft = age;
  this.ageStart = age;
  this._val = (this.ageLeft / 1000).toFixed();
  this.active = true;
  this.div.mousedown(() => {
    this.slide();
    this.trigger('hit', this);
  });
}

Target.prototype = {
  constructor: Target,
  green(c) {
    return `${c > 100 ? `${200 - c}%,100` : `100%,${c}`}%,0%`;
  },
  blue(c) {
    if (c > 100) {
      return `${200 - c}%,100%,${c - 100}%`;
    }

    return `100%,${c}%,0%`;
  },
  slide() {
    this.active = false;
    this.div.unbind('mousedown');
    this.div.animate({
      top: this.div.parent().height()
    }, this.div.parent().height() - this.top, 'linear', this.dispose);
  },
  age() {
    this.ageLeft -= 100;
    const color = this.colorize((this.ageLeft / this.ageStart) * 200);

    this.div.css('background-color', `rgb(${color})`);
    this._val = (this.ageLeft / 1000).toFixed();
    if (this.ageLeft < 100) {
      this.slide();
      this.trigger('age', this);
    }
  }
};

export default Target;
