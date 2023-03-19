define(function(require, exports, module) {
  'use strict';

  module.exports = {
    Active: require('interfaces/active'),
    Borders: require('interfaces/borders'),
    Cache: require('interfaces/cache'),
    Event: require('interfaces/event'),
    Keybinds: require('interfaces/keybinds'),
    Sound: require('interfaces/sound'),
    Visible: require('interfaces/visible')
  };
});
