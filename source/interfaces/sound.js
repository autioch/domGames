define(function(require, exports, module) {
  'use strict';

  const settings = require('settings/index.js');

  module.exports = {
    initSound: function(dir) {
      this._dir = dir;
      this._sounds = {};
    },
    addSound: function(name, value) {
      try {
        const a = new Audio();
        if (a.canPlayType(`audio/${value.split('.').pop()}`) !== '') {
          a.src = this._dir + value;
          this._sounds[name] = a;
        }
      } catch (e) {
        console.warn(name, value, e.message);
      }
      return this;
    },
    playSound: function(name) {
      if (this._sounds[name]) {
        try {
          if (settings.sound) {
            this._sounds[name].pause();
            this._sounds[name].currentTime = 0;
            this._sounds[name].play();
          }
        } catch (e) {
          console.warn(name, e.message);
        }
      } else {
        console.warn(name, 'No such sound');
      }
      return this;
    },
    parseSounds: function(config) {
      for (const i in config) {
        this.addSound(i, config[i]);
      }
      return this;
    }
  };
});
