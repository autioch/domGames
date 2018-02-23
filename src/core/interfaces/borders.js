/* eslint no-underscore-dangle: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint max-len: 0 */

import Visible from './visible';
import { inherit } from '../utils';

function BorderVertical(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbBorderVertical');
  this.refresh();
}

function BorderHorizontal(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbBorderHorizontal');
  this.refresh();
}

export default {
  addBorders(t, r, b, l, show) { // eslint-disable-line max-params
    this._borders = {};
    this._bw = 0;
    this._bh = 0;
    if (l) {
      this._borders.l = new BorderVertical(this.div);
      this._bw = this._borders.l.width / 2;
    }

    if (r) {
      this._borders.r = new BorderVertical(this.div);
      this._bw = this._borders.r.width / 2;
    }

    if (b) {
      this._borders.b = new BorderHorizontal(this.div);
      this._bh = this._borders.b.height / 2;
    }

    if (t) {
      this._borders.t = new BorderHorizontal(this.div);
      this._bh = this._borders.t.height / 2;
    }

    const oldRefresh = this.refresh;

    this.refresh = function refresh() {
      oldRefresh();
      this.resizeBorders();

      return this;
    };

    if (show) {
      this.showBorders();
    }

    return this.refresh();
  },
  resizeBorders() {
    this._borders.t && this._borders.t.locate(-this._bh, -this._bh / 2).size(this.width + this._bh, this._bh * 2);
    this._borders.r && this._borders.r.locate(-this._bw / 2, this.width - this._bw).size(this._bw * 2, this.height + this._bw);
    this._borders.b && this._borders.b.locate(this.height - this._bh, -this._bh / 2).size(this.width + this._bh, this._bh * 2);
    this._borders.l && this._borders.l.locate(-this._bw / 2, -this._bw).size(this._bw * 2, this.height + this._bw);

    return this;
  },
  hideBorders() {
    for (const b in this._borders) { // eslint-disable-line guard-for-in
      this._borders[b].div.hide(0);
    }

    return this;
  },
  showBorders() {
    for (const b in this._borders) { // eslint-disable-line guard-for-in
      this._borders[b].div.show(0);
    }

    return this;
  }
};
