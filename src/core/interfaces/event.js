/* eslint no-underscore-dangle: 0 */

export default {
  initEvent() {
    this._listeners = this._listeners || {};
  },
  on(type, listener) {
    if (this._listeners[type]) {
      this._listeners[type].push(listener);
    } else {
      this._listeners[type] = [listener];
    }

    return this;
  },
  hasListener(type) {
    return !!this._listeners[type];
  },
  off(type, listenerToRemove) {
    if (this.hasListener(type)) {
      this._listeners[type] = this._listeners[type].filter((listener) => listener !== listenerToRemove);
    }

    return this;
  },
  trigger(type, arg) {
    if (!this.hasListener(type)) {
      return this;
    }
    this._listeners[type].forEach((listener) => listener(arg));

    return this;
  }
};
