import { Visible } from '../interfaces';
import { inherit } from '../utils';

function ClassName(container) {
  inherit(Visible, this, container);
}

ClassName.prototype = {
  constructor: ClassName
};

module.exports = ClassName;
