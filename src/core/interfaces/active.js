import EventMixin from './event';
import { inherit } from '../utils';

export default {
  initActive() {
    this.paused = false;
    this.started = false;
    inherit(EventMixin, this);
  },
  start(arg) {
    if (!this.started) {
      this.started = true;
      this.paused = false;
      this.trigger('start', arg);
    }

    return this;
  },
  pause(arg) {
    if (this.started) {
      this.started = true;
      this.paused = true;
      this.trigger('pause', arg);
    }

    return this;
  },
  resume(arg) {
    if (this.started) {
      this.started = true;
      this.paused = false;
      this.trigger('resume', arg);
    }

    return this;
  },
  stop(arg) {
    if (this.started) {
      this.started = false;
      this.paused = true;
      this.trigger('stop', arg);
    }

    return this;
  }
};
