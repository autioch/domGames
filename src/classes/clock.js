import { Visible } from '../interfaces';
import { inherit } from '../utils';

function Clock(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbClock');
  this.timeout = 0;
}

Clock.prototype = {
  constructor: Clock,
  format(i) {
    return i < 10 ? `0${i}` : i;
  },
  start() {
    const now = new Date();
    const h = now.getHours();
    const m = this.format(now.getMinutes());
    const s = this.format(now.getSeconds());

    this.div.html(`${h}:${m}:${s}`);
    this.timeout = setTimeout(() => {
      if (this && !this.disposed) {
        this.start();
      }
    }, 500);
  },
  onDispose() {
    clearTimeout(this.timeout);
    this.start = null;
  }
};

export default Clock;
