define(function(require, exports, module) {
  'use strict';
  const Visible = require('interfaces/visible');
  const Active = require('interfaces/active');
  const Background = require('classes/background');
  const inherit = require('utils/inherit');

  function GameArea(container) {
    inherit(Visible, this, container);
    inherit(Active, this);
    this.div.addClass('qbGameArea');
    this.mist = new Background(this.div);

    // this.div.on('resize', this.mist.cover);
    this
      .on('start', this.mistHide)
      .on('stop', this.mistHide)
      .on('pause', this.mistShow)
      .on('resume', this.mistHide);
  }

  GameArea.prototype = {
    mistHide: function() {
      this.mist.div.hide(0);
      return this;
    },
    mistShow: function() {
      this.mist.div.show(0);
      return this;
    }
  };

  module.exports = GameArea;
});
