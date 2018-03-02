import { Visible } from '../interfaces';
import { inherit } from '../utils';

function SplashMessage(container) {
  inherit(Visible, this, container);
  this.div
    .on('click', () => this.div.stop(true, true).hide(0))
    .addClass('qbSplashMessage');
}

SplashMessage.prototype = {
  constructor: SplashMessage,
  splash(content, color, bg) {
    this.div
      .stop(true, true)
      .html(content)
      .css({
        color: color || '#f00',
        'background-color': bg || this.div.css('background-color')
      });
    this.center().div.show(0).fadeOut(content.length * 60);
  }
};

export default SplashMessage;
