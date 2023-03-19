var qbLib = qbLib || {};
(function(q) {
  var config = q.qbCleanerConfig;
  var policeTimer = 0;
  var C, GC, bg;

  q.cleanerInit = function() {
    bg = new q.qbBackground();
    bg.present(500);
    GC = new q.qbContainer(config.id, true);
    GC.hideBorders().size(0, 0).present();

    /* Messages */
    GC.splash = new q.qbMessageScreen(GC);
    GC.splash.presentSpeed = 500;
    GC.splash.chain(config.story, initialize);
  };

  function initialize() {
    GC.hide().showBorders().parseCss(config.size.container).refresh().center();

    /* sounds*/
    GC.sounds = new q.sounds(config.soundLocation);
    GC.sounds.parseSounds(config.sounds);

    /* Game */
    GC.game = new q.qbPlayArea(GC, config.gameId);
    GC.game.parseCss(config.size.game).resizeMist().flourish(100, 20).show();
    GC.game.trashAdd = trashAdd;
    GC.game.trashDispose = trashDispose;
    GC.game.runnerDispose = runnerDispose;

    /* Cache */
    GC.cache = new q.cache();

    /* Stats */
    GC.stats = new q.qbStatistics(GC);
    GC.stats.parseCss(config.size.stats).parseConfig(config.stats).addBorders(true, true, false, false).show();
    C = parseInt(GC.cache.get('currentLevel'), 10) || config.startLevel;
    GC.stats.cpoints.val(parseInt(GC.cache.get('currentPoints'), 10) || 0);
    GC.stats.ctotal.val(parseInt(GC.cache.get('currentTotal'), 10) || 0);

    /* Options */
    GC.options = new q.qbOptions(GC);
    GC.options.parseCss(config.size.options).parseConfig(config.options).addBorders(false, false, true, true).show();
    GC.options.csound.action(soundToggle);
    GC.options.cpause.action(gamePause);
    GC.options.creset.action(gameRestart);
    GC.options.cexit.action(gameExit);
    GC.options.cauthor.action(actionVisitAuthor);
    GC.options.cpolice.action(actionPolice);
    GC.options.cschool.action(actionSchool);
    GC.options.ccomunal.action(actionComunal);
    GC.options.cgrass.action(actionGrass);
    GC.options.csound.pressed(!q.sound);

    /* Clock */
    GC.clock = new q.qbClock(GC);
    GC.clock.locate(GC.game.height, GC.game.width).size(GC.options.width, GC.stats.height).show();

    /* Errors */
    GC.splashAlert = new q.qbSplashAlert(GC.game);
    GC.bindKeys(keysBind).present(1000, nextLevelSplash);
  }

  function keysBind(e) {
    switch (e.which) {
      case 32:
        GC.game.paused ? gameResume() : gamePause();
        break;
      case 27:
        gameExit();
        break;
      case 83:
        soundToggle();
        break;
    }
  }

  /* GAME functions */
  function trashAdd() {
    GC.stats.cmax.valInc();
    if (GC.stats.cmax.val() >= GC.stats.cmax.max()) {
      GC.game.pause(true);
      GC.sounds.soundLose();
      clearTimeout(policeTimer);
      GC.splash.message('', config.txt.gameOver, '', '').follow(nextLevelSplash).present();
    }
  }

  function trashDispose(trash) {
    GC.stats.cpoints.valInc(config.values.points[trash.size]);
    GC.stats.ctotal.valInc(config.values.total[trash.size]);
    GC.stats.cmax.valDec();
    GC.sounds.disposeSound();
  }

  function runnerDispose() {
    GC.stats.cwin.valInc();
    GC.stats.cpoints.valInc(config.values.points.runner);
    GC.stats.ctotal.valInc(config.values.total.runner);
    if (GC.stats.cwin.val() >= GC.stats.cwin.max()) {
      GC.game.pause(true);
      GC.sounds.soundWin();
      clearTimeout(policeTimer);
      C++;
      GC.cache.set('currentLevel', C);
      GC.cache.set('currentPoints', GC.stats.cpoints.val());
      GC.cache.set('currentTotal', GC.stats.ctotal.val());
      GC.splash.message(config.txt.lvlComplete).follow(C > config.maxLevel ? gameWin : nextLevelSplash).present();
    } else {
      GC.sounds.hitSound();
    }
  }

  function gameWin() {
    GC.splash.message(config.txt.gameWin).follow(gameRestart).present();
  }

  function nextLevelSplash() {
    GC.game.level = config.levels[C];
    GC.stats.cwin.val(0);
    GC.stats.cmax.val(0);
    GC.stats.cwin.max(GC.game.level.win);
    GC.stats.cmax.max(GC.game.level.max);
    GC.game.level.actions.police ? GC.options.cpolice.div.show() : GC.options.cpolice.div.hide();
    GC.game.level.actions.school ? GC.options.cschool.div.show() : GC.options.cschool.div.hide();
    GC.game.level.actions.comunal ? GC.options.ccomunal.div.show() : GC.options.ccomunal.div.hide();
    GC.game.level.actions.grass ? GC.options.cgrass.div.show() : GC.options.cgrass.div.hide();
    var m = `<div>${config.txt.lvlWin}${GC.game.level.win}</div><div>${config.txt.lvlMax}${GC.game.level.max}</div>`;
    var e = GC.game.level.text || '';
    GC.game.reset();
    GC.splash.message(`Poziom ${C}`, m, e, config.txt.follow).follow(GC.game.start).present();
  }

  /* OPTIONS */
  function soundToggle() {
    q.sound = !q.sound;
    GC.options.csound.pressed(!q.sound);
  }

  function gamePause() {
    GC.game.pause(true);
    GC.options.cpause.action(gameResume).desc('Wznów');
  }

  function gameResume() {
    GC.game.resume();
    GC.options.cpause.action(gamePause).desc('Pauza');
  }

  function gameRestart() {
    GC.game.pause(true);
    GC.stats.val('cpoints', 0).val('ctotal', 0);
    C = config.startLevel;
    GC.cache.set('currentLevel', C).set('currentPoints', 0).set('currentTotal', 0);
    nextLevelSplash();
  }

  function gameExit() {
    if (confirm('Czy na pewno zakończyć grę?')) {
      GC.game.pause();
      GC.dispose(true);
      GC = null;
      bg.dispose();
      bg = null;
    }
  }

  function actionVisitAuthor() {
    GC.game.pause(true);
    location = 'http://qb.net.pl';
  }

  /* ACTIONS */
  function actionSchool() {
    if (GC.stats.cpoints.val() < config.options.cschool.cost) {
      GC.splashAlert.splash(config.options.cschool.error);
      return;
    }

    GC.stats.cpoints.valDec(5);
    for (var tItem in GC.game.trashes) {
      if ((GC.game.trashes[tItem].size == 1) && !GC.game.trashes[tItem].disposed) {
        GC.game.trashes[tItem].dispose();
        GC.stats.cmax.valDec();
      }
    }
  }

  function actionPolice() {
    if (GC.stats.cpoints.val() < config.options.cpolice.cost) {
      GC.splashAlert.splash(config.options.cpolice.error);
      return;
    }

    GC.stats.cpoints.valDec(15);
    GC.game.pause();
    policeTimer = setTimeout(GC.game.resume, 5000);
  }

  function actionComunal() {
    if (GC.stats.cpoints.val() < config.options.ccomunal.cost) {
      GC.splashAlert.splash(config.options.ccomunal.error);
      return;
    }

    var type = q.random(GC.game.binsCount, 1);
    GC.stats.cpoints.valDec(8);
    for (var tItem in GC.game.trashes) {
      if ((GC.game.trashes[tItem].type == type) && !GC.game.trashes[tItem].disposed) {
        GC.game.trashes[tItem].dispose();
        GC.stats.cmax.valDec();
      }
    }
  }

  function actionGrass() {
    if (GC.stats.cpoints.val() < config.options.cgrass.cost) {
      GC.splashAlert.splash(config.options.cgrass.error);
      return;
    }

    GC.stats.cpoints.valDec(10);
    GC.stats.cmax.maxInc(1);
  }
})(qbLib);
