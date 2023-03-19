define(function(require, exports, module) {
  'use strict';
  module.exports = function(el, regex) {
    const filterd = el.attr('class').split(' ').filter(function(item) {
      return !item.match(regex);
    });
    return el.attr('class', filterd.join(' '));
  };
});
