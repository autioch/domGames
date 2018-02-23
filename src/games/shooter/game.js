import { Background, ConfirmMessage, Statistics, Box } from '../../core/classes';
import { Area, Enemy } from './lib';

let bg;
let GC;
let splash;

let gameOver = false;
let enemy = [];
let enemyCount = 0;
const enemyDiff = 6;
const max = 50;
const acc = 0.95;
let more = 3000;
let speed_counter = 0;
const speed_period = 5;
const gameId = 'shooterArea';

const txt = {
  gameOver: 'Koniec gry!',
  follow: 'Kliknij, aby rozpocząć...',
  shot: 'Ustrzelone: ',
  max: 'Max: ',
  more: 'Figury co: ',
  welcome: 'Strzelaj do figur!'
};

function accelerate() {
  speed_counter++;
  if (speed_counter === speed_period) {
    speed_counter = 0;
    more = more * acc;
    GC.stats.set('more', more);
  }
}

function removeEnemy() {
  GC.stats.inc('shot', 1).dec('max', 1);
  accelerate();
}

function checkLose() {
  if (GC.stats.val('max') > max) {
    for (const bItem in enemy) { // eslint-disable-line guard-for-in
      enemy[bItem].hit();
    }

    // delete enemy;
    gameOver = true;
    splash.setMessage(txt.gameOver).setFollow(location.reload).present();
  }
}

function addEnemy() {
  if (!gameOver) {
    enemyCount++;
    const rr = Math.round(Math.random() * (enemyDiff - 1)) + 1;
    const r = new Enemy(GC.game, `enemy${rr}`);

    r.div.click(() => {
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

function shooterPrepare() {
  splash.hide();
  enemy = [];
  enemyCount = 0;
  addEnemy();
}

function prepareEnviroment() {
  GC = new Box('sgc', true);
  GC.game = new Area(GC.div);

  GC.game.furnish(5);
  GC.game.present();
  GC.present();
  GC.stats = new Statistics(GC.div);
  GC.stats.locate(GC.game.height, 0).present(1500)
    .add('shot', txt.shot, 0)
    .add('max', txt.max, max)
    .add('more', txt.more, more)
    .present();
  setTimeout(shooterPrepare, 2000);
}

function initShooter() {
  bg = new Background();
  bg.present();
  splash = new ConfirmMessage();
  splash.text('Shooter', txt.welcome, '', '').follow(prepareEnviroment).present();
}

export default initShooter();
