export default function Highscore(texts, setup) {
  const x = this;

  x.init = function(texts, setup) {
    qbLibrary.utils.inherit(qbLibrary.interfaces.cache, this);
    x.setup = `highscore${setup}`;
    x.score = $.parseJSON(x.getCache(x.setup)) || [];
    x.texts = texts;
    x._title = `<table><thead><tr><th>${texts.hs.join('</th><th>')}</th></tr></thead><tbody>`;

    return x;
  };

  x.add = function(points, hits, pause, speed) {
    x.score.push([points, hits, pause, speed]);
    x.score.sort((a, b) => b[0] - a[0]);
    if (x.score.length > 6) {
      x.score.pop();
    }
    x.setCache(x.setup, JSON.stringify(x.score));

    // console.log('set', x.score, JSON.stringify(x.score));
    return x;
  };

  x.get = function() {
    x.score = $.parseJSON(x.getCache(x.setup)) || [];

    // console.log('get', x.getCache('highscore'), $.parseJSON(x.getCache('highscore')));
    let result = x._title;

    for (const i in x.score) {
      result += `<tr><td>${x.score[i].join('</td><td>')}</td></tr>`;
    }

    return `${result}</tbody></table>`;
  };

  x.reset = function() {
    if (confirm(x.texts.resetStats)) {
      x.remCache(x.setup);
      x.score = [];
    }
  };

  x.init(texts, setup);
}
