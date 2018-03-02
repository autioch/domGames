import { Visible } from '../interfaces';
import { inherit } from '../utils';
import StatField from './statField';

function Statistics(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbStatistics');
}

Statistics.prototype = {
  constructor: Statistics,
  add(key, limited, title, desc, value, maximum) { // eslint-disable-line max-params
    this[key] = new StatField(this.div);
    this[key].div.attr('id', `qbStat${key}`);
    this[key].limited = limited;
    this[key].title = title;
    this[key].desc = desc;
    this[key].value = value || 0;
    this[key].maximum = maximum || 0;
    this[key].repaint().present();

    return this;
  },
  rem(key) {
    this[key].dispose();
    delete this[key];

    return this;
  },
  val(key, value) {
    this[key].val(value);

    return this;
  },
  parseConfig(obj) {
    for (const item in obj) { // eslint-disable-line guard-for-in
      const a = obj[item];

      this.add(item, a.limited, a.title, a.desc, a.value, a.maximum);
    }

    return this;
  }
};

export default Statistics;
