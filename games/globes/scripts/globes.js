var qbLib = qbLib || {};// eslint-disable-line no-var
(function(q) {
  const config = {
    pc: {
      freq: 900,
      freqAccel: 0.9,
      age: 6000,
      bonus: 0.85,
      types: 5,
      life: 5,
      hsmax: 5,
      msize: 0,
      present: 500
    },
    mobile: {
      freq: 810,
      freqAccel: 0.9,
      age: 4000,
      bonus: 0.9,
      types: 5,
      life: 5,
      hsmax: 5,
      msize: 5,
      present: 0
    },
    soundsLocation: 'sounds/',
    sounds: {
      soundLifeUp: 'lifeup.ogg',
      soundGameOver: 'gameover.ogg',
      soundLifeDown: 'lifedown.ogg',
      soundSpeedUp: 'speedup.ogg',
      soundSpeedDown: 'speeddown.ogg',
      soundHit: 'targethit.ogg'
    },
    color: '#0f0',
    text: {
      id: 'sgc',
      wtitle: 'Globes',
      wwelcome: 'Hit the Globes before they turn red!',
      wextra: 'Space - pause<br/>Esc - exit game<br/>S - toggle sound',
      wmobile: 'Turn the device in landscape position to fully enjoy the game',
      gameover: 'Game over!',
      follow: 'Click to continue...',
      lifedown: 'life lost',
      lifeup: 'life gained',
      speeddown: 'speed down',
      speedup: 'speed up',
      otext: '%d targets hit for %d points!',
      oextra: 'Pause used %d time(s)',
      exit: 'Quit the game?',
      mobile: 'Mobile browser detected',
      hstitle: 'Highscore',
      hs: ['Points', 'Hit', 'Pauses', 'Accel'],
      resetStats: 'Really reset the Highscore?'
    },
    stats: {
      active: {
        desc: '',
        title: 'Globes on the field',
        limited: false
      },
      hit: {
        desc: '',
        title: 'Globes hit',
        limited: false
      },
      points: {
        desc: '',
        title: 'Points',
        limited: false
      },
      life: {
        desc: '',
        title: 'Lives',
        limited: false
      },
      speed: {
        desc: '',
        title: 'Globes frequency',
        limited: false
      }
    },
    options: {
      sound: {
        type: 'button',
        desc: '',
        title: 'Toggle sound',
        visible: true
      },
      pause: {
        type: 'button',
        desc: '',
        title: 'Pause',
        visible: true
      },
      exit: {
        type: 'button',
        desc: '',
        title: 'Exit the game',
        visible: true
      }
    },
    points: {
      '1': 0,
      '2': 0,
      '3': 1,
      '4': 2,
      '5': 3,
      '6': 0,
      '7': 0,
      '8': 1,
      '9': 2,
      '10': 3
    },
    size: {
      container: {
        width: 640,
        height: 480
      },
      game: {
        width: 574,
        height: 476,
        top: 3,
        left: 63
      },
      options: {
        width: 60,
        height: 162,
        top: 0,
        left: 0
      },
      stats: {
        width: 60,
        height: 318,
        top: 160,
        left: 0
      }
    }
  };
  const txt = config.text;
  const gamec = config.pc;
  let GC;
  let bg;
  let tsb;
  let mobile;
  function qbTarget(qbContainer, type) {
    q.qbGameObject.call(this, qbContainer);
    const qb = this;
    qb.prop('type', type);
    qb.ageLeft = gamec.age;
    qb.green = function(c) {
      return `${c > 100 ? `${200 - c}%,100` : `100%,${c}`}%,0%`;
    };
    qb.blue = function(c) {
      if (c > 100) {
        return `${200 - c}%,100%,${c - 100}%`;
      }
      return `100%,${c}%,0%`;
    };
    qb.colorize = Math.random() > 0.5 ? qb.green : qb.blue;
    qb.div.css('background-color', `rgb(${qb.colorize(200)})`);
    qb.active = true;
    qb.age = function() {
      qb.ageLeft -= 100;
      qb.div.css('background-color', `rgb(${qb.colorize((qb.ageLeft / gamec.age) * 200)})`);
      qb._val = (qb.ageLeft / 1000).toFixed();
      if (qb.ageLeft < 100) {
        qb.slide();
        targetAge(qb);
      }
    };
    qb.slide = function() {
      qb.active = false;
      qb.div.unbind('mousedown');
      qb.div.animate({
        top: qb.container.height
      }, qb.container.height - qb.top, 'linear', qb.dispose);
    };
    qb.div.mousedown(function() {
      qb.slide();
      targetHit(qb);
    });
  }

  function qbGlobesArea(qbContainer) {
    q.qbGameArea.call(this, qbContainer);
    const qb = this;
    qb.targets = [];
    qb.targetCount = 0;
    function niceReset() {
      for (const i in qb.targets) {
        if (!qb.targets[i].disposed) {
          qb.targets[i].slide();
        }

        delete qb.targets[i];
      }

      qb.targetCount = 0;
      qb.targets = [];
      return qb;
    }

    function quickReset() {
      for (const i in qb.targets) {
        qb.targets[i].dispose();
        delete qb.targets[i];
      }

      qb.targetCount = 0;
      qb.targets = [];
      return qb;
    }

    qb.reset = mobile ? quickReset : niceReset;
    qb.freq = gamec.freq;
    qb._targetTimer = 0;
    qb.addTarget = function() {
      if (!qb.paused) {
        const r = Math.random() > gamec.bonus ? q.random(2, 1) : q.random(gamec.types, 3);
        const t = new qbTarget(qb, r + gamec.msize);
        qb.targets[++qb.targetCount] = t;
        t.locateRandom().present(gamec.present);
        GC.stats.active.valInc();
        qb._targetTimer = setTimeout(qb.addTarget, qb.freq);
      }
    };
    qb._refreshTimer = 0;
    qb.refreshTargets = function() {
      if (!qb.paused) {
        for (const a in qb.targets) {
          if (!qb.targets[a].disposed && qb.targets[a].active) {
            qb.targets[a].age();
          }
        }

        qb._refreshTimer = setTimeout(qb.refreshTargets, 100);
      }
    };
    qb.breaks = 0;
    qb.onStart = function() {
      qb.addTarget();
      qb.refreshTargets();
      qb.breaks = 0;
    };
    qb.onPause = function() {
      clearTimeout(qb._targetTimer);
      clearTimeout(qb._refreshTimer);
      qb.breaks++;
      GC.options.pause.pressed(true).action(GC.game.resume);
    };
    qb.onResume = function() {
      qb._targetTimer = setTimeout(qb.addTarget, q.random(qb.freq, 0));
      qb.refreshTargets();
      GC.options.pause.pressed(false).action(function() {
        GC.game.pause(true);
      });
    };
    qb.onStop = function() {
      clearTimeout(qb._runnerTimer);
      clearTimeout(qb._refreshTimer);
    };
  }

  function qbHighscore() {
    const qb = this;
    qb.score = [];
    qb.add = function(points, hits, pause, speed) {
      qb.score.push([points, hits, pause, speed]);
      qb.score.sort(function(a, b) {
        return b[0] - a[0];
      });
      if (qb.score.length > gamec.hsmax) {
        qb.score.pop();
      }
    };
    qb._title = `<table><thead><tr><th>${config.text.hs.join('</th><th>')}</th></tr></thead><tbody>`;
    qb.get = function() {
      let result = qb._title;
      for (const i in qb.score) {
        result += `<tr><td>${qb.score[i].join('</td><td>')}</td></tr>`;
      }

      return `${result}</tbody></table>`;
    };
    qb.save = function() {
      return JSON.stringify(qb.score);
    };
    qb.load = function(data) {
      qb.score = data ? $.parseJSON(data) : [];
    };
  }

  q.initGlobesPopup = function() {
    bg = new q.qbBackground();
    bg.present(500);
    GC = new q.qbContainer(txt.id, true);
    GC.hideBorders().size(0, 0).present();
    GC.inline = false;
    GC.splash = new q.qbMessageScreen(GC);
    GC.splash.message(txt.wtitle, txt.wwelcome, txt.wextra, txt.follow).follow(initializePopup).present(gamec.present);
  };

  function initializePopup() {
    GC.hide().showBorders().parseCss(config.size.container, true);
    GC.sounds = new q.sounds(config.soundsLocation);
    GC.sounds.parseSounds(config.sounds);
    GC.game = new qbGlobesArea(GC);
    GC.game.parseCss(config.size.game).resizeMist().show();
    GC.options = new q.qbOptions(GC);
    GC.options.parseCss(config.size.options).parseConfig(config.options).addBorders(false, true, true).show();
    GC.options.sound.action(toggleSound).pressed(!q.sound);
    GC.options.pause.action(function() {
      GC.game.pause(true);
    });
    GC.options.exit.action(gameExit);
    GC.stats = new q.qbStatistics(GC);
    GC.stats.parseCss(config.size.stats).parseConfig(config.stats).addBorders(false, true).show();
    GC.stats.div.click(resetHighscore);
    GC.alert = new q.qbSplashAlert(GC.game);
    GC.cache = new q.cache();
    GC.hs = new qbHighscore();
    GC.hs.load(GC.cache.get('highscore'));
    GC.bindKeys(keysBind).present(gamec.present * 2, startSplash);
  }

  q.initGlobesInline = function() {
    GC = new q.qbContainer('', false);
    GC.setDiv($('#sgc'), true);
    GC._bh = 3;
    GC._bw = 3;
    GC.div.css({
      position: 'relative',
      top: 0,
      left: 0
    });
    GC.parseCss(config.size.container);
    GC.inline = true;
    GC.sounds = new q.sounds(config.soundsLocation);
    GC.sounds.parseSounds(config.sounds);
    GC.game = new qbGlobesArea(GC);
    GC.game.parseCss(config.size.game).resizeMist().show();
    GC.options = new q.qbOptions(GC);
    GC.options.parseCss(config.size.options).parseConfig(config.options).addBorders(false, true, true).show();
    GC.options.exit.dispose();
    GC.options.sound.action(toggleSound).pressed(!q.sound);
    GC.options.pause.action(function() {
      GC.game.pause(true);
    });
    GC.stats = new q.qbStatistics(GC);
    GC.stats.parseCss(config.size.stats).parseConfig(config.stats).addBorders(false, true).show();
    GC.stats.div.click(resetHighscore);
    GC.alert = new q.qbSplashAlert(GC.game);
    GC.cache = new q.cache();
    GC.hs = new qbHighscore();
    GC.hs.load(GC.cache.get('highscore'));
    GC.bindKeys(keysBind).present(gamec.present);
    GC.splash = new q.qbMessageScreen(GC);
    GC.splash.message(txt.wtitle, txt.wwelcome, txt.wextra, txt.follow).follow(startSplash).present(gamec.present);
  };

  function keysBind(e) {
    switch (e.which) {
      case 32:
        GC.game.paused ? GC.game.resume() : GC.game.pause(true);
        return false;
      case 27:
        !GC.inline && gameExit();
        return false;
      case 83:
        toggleSound();
        return false;
    }
  }

  function showHighscore() {
    GC.hs.add(GC.stats.points.val(), GC.stats.hit.val(), GC.game.breaks, GC.stats.speed.val());
    GC.cache.set('highscore', GC.hs.save());
    GC.splash.message(txt.hstitle, GC.hs.get(), '', txt.follow).follow(startSplash).present();
  }

  function toggleSound() {
    GC.options.sound.pressed(q.sound);
    q.sound = !q.sound;
  }

  function startSplash() {
    GC.game.stop().reset().freq = gamec.freq;
    tsb = 1;
    GC.stats.val('active', 0).val('hit', 0).val('points', 0).val('life', gamec.life).val('speed', (gamec.freq / 1000).toFixed(2));
    GC.splash.message('', '', '', txt.follow).follow(GC.game.start).present();
  }

  function targetHit(target) {
    GC.stats.active.valDec();
    GC.stats.hit.valInc();
    GC.sounds.soundHit();
    switch (target.type) {
      case 1:
        lifeUp();
        break;
      case 2:
        speedDown();
        break;
      case 6:
        lifeUp();
        break;
      case 7:
        speedDown();
        break;
      default:
        GC.stats.points.valInc(config.points[target.type] * target._val);
    }

    if (GC.stats.hit.val() > tsb) {
      GC.sounds.soundSpeedUp();
      GC.game.freq *= gamec.freqAccel;
      tsb += Math.round(4500 / GC.game.freq);
      GC.stats.speed.val((GC.game.freq / 1000).toFixed(2));
      GC.alert.splash(txt.speedup);
    }
  }

  function lifeUp() {
    GC.stats.life.valInc();
    GC.sounds.soundLifeUp();
    GC.alert.splash(txt.lifeup, config.color);
  }

  function speedDown() {
    GC.sounds.soundSpeedDown();
    GC.game.freq = Math.min(GC.game.freq /= gamec.freqAccel, gamec.freq);
    tsb++;
    GC.alert.splash(txt.speeddown, config.color);
    GC.stats.speed.val((GC.game.freq / 1000).toFixed(2));
  }

  function targetAge() {
    GC.stats.life.valDec();
    GC.stats.active.valDec();
    GC.sounds.soundLifeDown();
    GC.alert.splash(txt.lifedown);
    if (GC.stats.life.val() < 1) {
      GC.game.stop();
      GC.sounds.soundGameOver();
      alert(txt.gameover);
      const m = txt.otext.replace('%d', GC.stats.hit.val()).replace('%d', GC.stats.points.val());
      const e = txt.oextra.replace('%d', GC.game.breaks);
      GC.splash.message(txt.gameover, m, e).follow(showHighscore).present();
    }
  }

  function gameExit() {
    if (confirm(txt.exit)) {
      GC.game.pause();
      GC.dispose(true);
      GC = null;
      bg.dispose();
      bg = null;
    }
  }

  function resetHighscore() {
    if (GC.game.paused && confirm(txt.resetStats)) {
      GC.cache.rem('highscore');
      GC.hs.score = [];
    }
  }
})(qbLib);
