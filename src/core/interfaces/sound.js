/* eslint no-underscore-dangle: 0 */

import settings from '../settings';

export default {
  initSound(dir) {
    this._dir = dir;
    this._sounds = {};
  },
  addSound(title, value) {
    try {
      const a = new Audio();

      if (a.canPlayType(`audio/${value.split('.').pop()}`) !== '') {
        a.src = this._dir + value;
        this._sounds[title] = a;
      }
    } catch (e) {
      console.log(title, value, e.message);
    }

    return this;
  },
  playSound(title) {
    if (this._sounds[title]) {
      try {
        if (settings.sound) {
          this._sounds[title].pause();
          this._sounds[title].currentTime = 0;
          this._sounds[title].play();
        }
      } catch (e) {
        console.log(title, e.message);
      }
    } else {
      console.log(title, 'No such sound');
    }

    return this;
  },
  parseSounds(config) {
    for (const i in config) { // eslint-disable-line guard-for-in
      this.addSound(i, config[i]);
    }

    return this;
  }
};
