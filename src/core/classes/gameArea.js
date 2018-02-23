import { Visible, Active } from '../interfaces';
import { inherit } from '../utils';
import Background from './background';

function GameArea(container) {
  inherit(Visible, this, container);
  inherit(Active, this);
  this.div.addClass('qbGameArea');
  this.mist = new Background(this.div);

  this.div.on('resize', this.mist.cover.bind(this.mist));

  this
    .on('start', this.mistHide)
    .on('stop', this.mistHide)
    .on('pause', this.mistShow)
    .on('resume', this.mistHide);
}

GameArea.prototype = {
  constructor: GameArea,
  mistHide() {
    this.mist.div.hide(0);

    return this;
  },
  mistShow() {
    this.mist.div.show(0);

    return this;
  }
};

export default GameArea;
