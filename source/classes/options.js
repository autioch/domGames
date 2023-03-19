define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const OptionButton = require('classes/optionButton');
  const inherit = require('utils/inherit');

  function Options(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbOptions');
  }

  Options.prototype = {
    parseConfig: function(obj) {
      let a;
      let item;
      for (item in obj) {
        a = obj[item];
        this.addButton(item, a.desc, a.title, a.checked, a.enabled);
        if (a.visible) {
          this[item].present();
        }
      }
      return this.refresh();
    },
    addButton: function(name, desc, title, checked, enabled) {
      const btn = new OptionButton(this.div);
      this[name].div.attr('id', `qbOption${name}`);
      this[name].title = title;
      this[name].desc = desc;
      this[name].checked = checked || false;
      this[name].enabled = enabled || false;
      this[name] = btn;
      return this;
    },
    remove: function(name) {
      this[name].dispose();
      this[name] = null;
      return this;
    }
  };

  module.exports = Options;
});
