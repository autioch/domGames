define(function(require, exports, module) {
  'use strict';
  var Visible = require('interfaces/visible');
  var StatField = require('classes/statField');
  var inherit = require('utils/inherit');

  function Statistics(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbStatistics');

    // this.statCount = 0;
  }

  Statistics.prototype = {
    add: function(name, limited, title, desc, value, maximum) {
      this[name] = new StatField(this.div);
      this[name].div.attr('id', `qbStat${name}`);
      this[name].limited = limited;
      this[name].title = title;
      this[name].desc = desc;
      this[name].value = value || 0;
      this[name].maximum = maximum || 0;
      this[name].repaint().present();

      // this.statCount++;
      // this.resizeStats();
      return this;
    },
    rem: function(name) {
      this[name].dispose();
      delete this[name];

      // this.statCount--;
      // this.resizeStats();
      return this;
    },

    // this.resizeStats = function() {
    //    this.div.children('div').css('width', this.div.innerWidth() / this.statCount);
    //    return this; }
    val: function(name, value) {
      this[name].val(value);
      return this;
    },
    parseConfig: function(obj) {
      var a, item;
      for (item in obj) {
        a = obj[item];
        this.add(item, a.limited, a.title, a.desc, a.value, a.maximum);
      }
      return this;
    }
  };

  module.exports = Statistics;
});
