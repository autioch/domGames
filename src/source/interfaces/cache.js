/* global escape, unescape */
define(function (require, exports, module) {
  'use strict';

  var localStorage = {
    getCache: function (key) {
      return localStorage.getItem(key);
    },
    setCache: function (key, val) {
      localStorage.setItem(key, val);
      return this;
    },
    remCache: function (key) {
      localStorage.removeItem(key);
      return this;
    }
  };

  var cookie = {
    getCache: function (key) {
      if (!key || !this.hasCookie(key)) {
        return null;
      }
      return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
    },
    setCache: function (key, val) {
      if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
        return this;
      }
      var date = new Date();
      date.setTime(date.getTime() + (168 * 3600000));
      document.cookie = escape(key) + '=' + escape(val) + '; expires=' + date.toGMTString();
      return this;
    },
    remCache: function (key) {
      if (!key || !this.has(key)) {
        return this;
      }
      document.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      return this;
    },
    hasCookie: function (key) {
      return (new RegExp('(?:^|;\\s*)' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    }
  };

  module.exports = window.localStorage ? localStorage : cookie;
});
