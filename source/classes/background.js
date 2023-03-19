define(function(require, exports, module) {
  'use strict';
  var Visible = require('interfaces/visible');
  var inherit = require('utils/inherit');

  function Background(container) {
    inherit(Visible, this, container);
    this.div.addClass('qbBackground').css({
      position: 'absolute', // fixed
      width: '100%',
      height: '100%'
    });
    if (container) {
      this.cover = this.cover; // eslint-disable-line no-self-assign
    } else {
      this.cover = this.coverWindow;
    }

    // $(window).on('resize', this.cover);
    return this;
  }

  Background.prototype = {
    coverWindow: function() {
      this.div.css({
        height: $(window).height(),
        width: $(window).width()
      });
      return this.refresh();
    },
    cover: function() {
      this.div.css({
        height: this.parent().height(),
        width: this.parent().width()
      });
      return this.refresh();
    }
  };

  module.exports = Background;
});
