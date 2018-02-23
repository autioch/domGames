const localStorageCache = {
  getCache(key) {
    return localStorage.getItem(key);
  },
  setCache(key, val) {
    localStorage.setItem(key, val);

    return this;
  },
  remCache(key) {
    localStorage.removeItem(key);

    return this;
  }
};

const cookie = {
  getCache(key) {
    if (!key || !this.hasCookie(key)) {
      return null;
    }

    const escapedKey = escape(key).replace(/[-.+*]/g, '\\$&');
    const regex = new RegExp(`(?:^|.*;\\s*)${escapedKey}\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`);

    return unescape(document.cookie.replace(regex, '$1'));
  },
  setCache(key, val) {
    if (!key || /^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
      return this;
    }
    const date = new Date();

    date.setTime(date.getTime() + (168 * 3600000));
    document.cookie = `${escape(key)}=${escape(val)}; expires=${date.toGMTString()}`;

    return this;
  },
  remCache(key) {
    if (!key || !this.has(key)) {
      return this;
    }
    document.cookie = `${escape(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

    return this;
  },
  hasCookie(key) {
    return (new RegExp(`(?:^|;\\s*)${escape(key).replace(/[-.+*]/g, '\\$&')}\\s*\\=`)).test(document.cookie);
  }
};

export default window.localStorage ? localStorageCache : cookie;
