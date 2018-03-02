import { Visible } from '../interfaces';
import { inherit } from '../utils';

function Box(container) {
  inherit(Visible, this, container);
}

Box.prototype = {
  constructor: Box
};

export default Box;
