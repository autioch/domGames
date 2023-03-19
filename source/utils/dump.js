define(function(require, exports, module) {
  'use strict';

  module.exports = function(item, withValue) {
    var d, acc;
    d = item || qbLibrary;
    acc = [];
    $.each(d, function(index, value) {
      acc.push(index + (withValue ? ` : ${value}` : ` : ${typeof value}`));
    });
    return `<pre>${acc.join('\n').replace(/\</i, '&lt;').replace(/\>/i, '&gt;')}</pre>`;
  };
});
