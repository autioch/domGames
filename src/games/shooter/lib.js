import { Visible } from '../../core/interfaces';
import { inherit } from '../../core/utils';

function Desk(qbContainer) {
  inherit(Visible, this, qbContainer);
}

function Enemy(qbContainer, qbEnemyType) {
  inherit(Visible, this, qbContainer);

  this.type = qbEnemyType;
  this.div.addClass(this.type);

  this.hit = function hit() {
    this.div.unbind('click');
    this.div.animate({
      top: this.container.height
    }, 500, () => this.div.remove());
  }.bind(this);
}

function Area(qbContainer, qbId) {
  inherit(Visible, this, qbContainer);

  this.div.attr('id', qbId);
  this.furniture = [];
  this.furniture.desk = [];

  this.furnish = function furnish(desk) {
    for (let i = 0; i < desk; i++) {
      this.furniture.desk[i] = new Desk(this.div);
      this.furniture.desk[i].locateRandom().present(1000);
    }
  };
}

export { Desk, Enemy, Area };
