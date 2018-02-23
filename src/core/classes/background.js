import $ from 'jquery';
import { Visible } from '../interfaces';
import { inherit } from '../utils';

function Background(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbBackground').css({
    position: 'absolute',
    width: '100%',
    height: '100%'
  });

  if (container) {
    this.cover = this.cover;
  } else {
    this.cover = this.coverWindow;
  }

  return this;
}

Background.prototype = {
  constructor: Background,
  coverWindow() {
    this.div.css({
      height: $(window).height(),
      width: $(window).width()
    });

    return this.refresh();
  },
  cover() {
    this.div.css({
      height: this.parent().height(),
      width: this.parent().width()
    });

    return this.refresh();
  }
};

export default Background;
