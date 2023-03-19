define(function(require, exports, module) {
  'use strict';
  module.exports = {
    initKeybinds: function(keys) {
      this.bindKeys(keys);
    },
    currentKeys: function() {},
    bindKeys: function(newKeys) {
      this.unbindKeys();
      this.currentKeys = newKeys;
      $(document).on('keydown', newKeys);
      return this;
    },
    unbindKeys: function() {
      $(document).off('keydown', this.currentKeys);
      return this;
    }
  };
});
