import { Visible } from '../interfaces';
import OptionButton from './optionButton';
import { inherit } from '../utils';

function Options(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbOptions');
}

Options.prototype = {
  constructor: Options,
  parseConfig(obj) {
    for (const item in obj) { // eslint-disable-line guard-for-in
      const a = obj[item];

      this.addButton(item, a.desc, a.title, a.checked, a.enabled);
      if (a.visible) {
        this[item].present();
      }
    }

    return this.refresh();
  },
  addButton(key, desc, title, checked, enabled) { // eslint-disable-line max-params
    const btn = new OptionButton(this.div);

    this[key].div.attr('id', `qbOption${key}`);
    this[key].title = title;
    this[key].desc = desc;
    this[key].checked = checked || false;
    this[key].enabled = enabled || false;
    this[key] = btn;

    return this;
  },
  remove(key) {
    this[key].dispose();
    this[key] = null;

    return this;
  }
};

export default Options;
