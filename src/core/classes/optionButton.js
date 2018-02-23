import { Visible } from '../interfaces';
import { inherit } from '../utils';

function OptionButton(container) {
  inherit(Visible, this, container);
  this.div.addClass('qbOptionButton').css({
    cursor: 'pointer'
  });
  this.title = '';
  this.desc = '';
  this.checked = false;
  this.enabled = false;
  this.action = () => {}; // eslint-disable-line no-empty-function
}

OptionButton.prototype = {
  enable(isEnabled) {
    this.enabled = isEnabled;
    this.div.toggleClass('enabled', !!this.enabled);
  },
  check(isChecked) {
    this.checked = isChecked;
    this.div.toggleClass('checked', !!this.checked);

    return this;
  },
  click(action) {
    this.action = action;
    this.div.off('mousedown').on('mousedown', this.action);

    return this;
  },
  repaint() {
    this.div.attr('title', this.title);
    this.div.html(this.desc);
    this.check(this.checked);
    this.enable(this.enabled);
    this.click(this.action);
  }
};

export default OptionButton;
