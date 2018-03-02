/* eslint-disable no-underscore-dangle */
import { Cache } from '../interfaces';
import { inherit } from '../utils';
import $ from 'jquery';

const MAX_RECORDS = 5;

function HighScore(texts, setup) {
  inherit(Cache, this);
  this.setup = `highscore${setup}`;
  this.score = $.parseJSON(this.getCache(this.setup)) || [];
  this.texts = texts;
}

HighScore.prototype = {
  constructor: HighScore,
  add(points, hits, pause, speed) {
    this.score.push([points, hits, pause, speed]);
    this.score.sort((a, b) => b[0] - a[0]);
    if (this.score.length > MAX_RECORDS) {
      this.score.pop();
    }
    this.setCache(this.setup, JSON.stringify(this.score));

    return this;
  },
  get() {
    this.score = $.parseJSON(this.getCache(this.setup)) || [];

    const header = `<table><thead><tr><th>${this.texts.hs.join('</th><th>')}</th></tr></thead><tbody>`;
    const footer = '</tbody></table>';
    const body = this.score.map((record) => `<tr><td>${record.join('</td><td>')}</td></tr>`);

    return header + body + footer;
  },
  reset() {
    if (confirm(this.texts.resetStats)) { // eslint-disable-line no-alert
      this.remCache(this.setup);
      this.score = [];
    }
  }
};

export default HighScore;
