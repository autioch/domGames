var qbLib = qbLib || {}; // eslint-disable-line no-var
(function(q) {
  let GC;
  let bg;
  let splash;

  q.initShooter = initShooter;

  function initShooter() {
    bg = new q.qbBackground();
    bg.present();
    splash = new q.qbMessageScreen();
    splash.message('Shooter', txt.welcome, '', '').follow(prepareEnviroment).present();
  }

  function prepareEnviroment() {
    GC = new q.qbContainer('sgc', true);
    GC.game = new q.qbShooterArea(GC, gameId);

    GC.game.furnish(5);
    GC.game.present();
    GC.present();
    GC.stats = new q.qbStatistics(GC);
    GC.stats.locate(GC.game.height, 0).present(1500)
      .add('shot', txt.shot, 0)
      .add('max', txt.max, max)
      .add('more', txt.more, more).present();
    setTimeout(shooterPrepare, 2000);
  }

  function shooterPrepare() {
    splash.hide();
    enemy = [];
    enemyCount = 0;
    addEnemy();
  }

  function addEnemy() {
    if (!gameOver) {
      enemyCount++;
      const rr = Math.round(Math.random() * (enemyDiff - 1)) + 1;
      const r = new q.qbEnemy(GC.game, `enemy${rr}`);
      r.div.click(function() {
        // alert('dupa');
        console.log(r, rr);
        r.hit();
        removeEnemy();
      });
      r.locateRandom().present();
      enemy[enemyCount] = r;
      GC.stats.add('max', 1);
      checkLose();
      setTimeout(addEnemy, more);
    }
  }

  function removeEnemy() {
    stats.inc('shot', 1).dec('max', 1);
    accelerate();
  }

  function accelerate() {
    speed_counter++;
    if (speed_counter === speed_period) {
      speed_counter = 0;
      more = more * acc;
      stats.set('more', more);
    }
  }

  function checkLose() {
    if (GC.stats.val('max') > max) {
      for (const bItem in enemy) {
        enemy[bItem].hit();
      }
      enemy = null;
      gameOver = true;
      splash.setMessage(txt.gameOver).setFollow(location.reload).present();
    }
  }

  gameOver = false;
  enemyDiff = 6;
  max = 50;
  acc = 0.95;
  more = 3000;
  speed_counter = 0;
  speed_period = 5;
  gameId = 'shooterArea';
  const txt = {
    gameOver: 'Koniec gry!',
    follow: 'Kliknij, aby rozpocząć...',
    shot: 'Ustrzelone: ',
    max: 'Max: ',
    more: 'Figury co: ',
    welcome: 'Strzelaj do figur!'
  };
})(qbLib);
