qbLibrary.globes = qbLibrary.globes || {};

qbLibrary.globes.library = {
  target: function(container, type, age) {
    var x = this;

    x.init = function(container, type, age) {
      qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
      qbLibrary.utils.inherit(qbLibrary.interfaces.active, this);
      x.colorize = Math.random() > 0.5 ? x.green : x.blue;
      x.div.addClass('qbTarget').css({
        'background-color': `rgb(${x.colorize(200)})`,
        'z-index': 3
      });
      qbLibrary.settings.debug && x.div.html(type);
      x.prop('type', type);
      x.ageLeft = age;
      x.ageStart = age;
      x._val = (x.ageLeft / 1000).toFixed();
      x.active = true;
      x.div.mousedown(function() {
        x.slide();
        x.trigger('hit', x);
      });
      return x;
    };

    x.green = function(c) {
      return `${c > 100 ? `${200 - c}%,100` : `100%,${c}`}%,0%`;
    };

    x.blue = function(c) {
      if (c > 100) {
        return `${200 - c}%,100%,${c - 100}%`;
      }
      return `100%,${c}%,0%`;
    };

    x.slide = function() {
      x.active = false;
      x.div.unbind('mousedown');
      x.div.animate({
        top: x.div.parent().height()
      }, x.div.parent().height() - x.top, 'linear', x.dispose);
    };

    x.age = function() {
      x.ageLeft -= 100;
      x.div.css('background-color', `rgb(${x.colorize((x.ageLeft / x.ageStart) * 200)})`);
      x._val = (x.ageLeft / 1000).toFixed();
      if (x.ageLeft < 100) {
        x.slide();
        x.trigger('age', x);
      }
    };

    x.init(container, type, age);
  },
  highscore: function(texts, setup) {
    var x = this;

    x.init = function(texts, setup) {
      qbLibrary.utils.inherit(qbLibrary.interfaces.cache, this);
      x.setup = `highscore${setup}`;
      x.score = $.parseJSON(x.getCache(x.setup)) || [];
      x.texts = texts;
      x._title = `<table><thead><tr><th>${
        texts.hs.join('</th><th>')
      }</th></tr></thead><tbody>`;
      return x;
    };

    x.add = function(points, hits, pause, speed) {
      x.score.push([points, hits, pause, speed]);
      x.score.sort(function(a, b) {
        return b[0] - a[0];
      });
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
      var result = x._title;
      for (var i in x.score) {
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
};
