define(function (require, exports, module) {
  'use strict';

  var settings = require('settings/index.js');

  module.exports = {
    initSound: function (dir) {
      this._dir = dir;
      this._sounds = {};
    },
    addSound: function (name, value) {
      try {
        var a = new Audio();
        if (a.canPlayType('audio/' + value.split('.').pop()) !== '') {
          a.src = this._dir + value;
          this._sounds[name] = a;
        }
      } catch (e) {
        console.log(name, value, e.message);
      }
      return this;
    },
    playSound: function (name) {
      if (this._sounds[name]) {
        try {
          if (settings.sound) {
            this._sounds[name].pause();
            this._sounds[name].currentTime = 0;
            this._sounds[name].play();
          }
        } catch (e) {
          console.log(name, e.message);
        }
      } else {
        console.log(name, 'No such sound');
      }
      return this;
    },
    parseSounds: function (config) {
      for (var i in config) {
        this.addSound(i, config[i]);
      }
      return this;
    }
  };
});
