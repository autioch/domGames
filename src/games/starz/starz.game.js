var qbLib = qbLib || {};

(function(q) {

    q.initStarz = initStarz;

    var GC, bg, splash;
    function initStarz() {
        bg = new q.qbBackground();
        bg.present();

        splash = new q.qbMessageScreen();
        splash.message('Starz', txt.welcome, '', '').follow(prepareEnviroment).present();
    }

    function prepareEnviroment() {
        GC = new q.qbContainer('sgc',true);
        GC.center().present();

        GC.game = new q.qbStarzArea(GC);
        GC.game.div.attr("id", gameId);
        GC.game.locate(0, 0).present(splashSpeed).bigBang(20, 4);

        GC.stats = new q.qbStatistics(GC);
        GC.stats.locate(GC.game.height).present(splashSpeed)
                .add(txt.statWin, txt.statWinTitle, lvl[C].win)
                .add(txt.statPoints, txt.statPointsTitle, 0)
                .add(txt.statTotal, txt.statTotalTitle, 0);

        setTimeout(nextLevelSplash, splashSpeed);
    }

    function nextLevelSplash() {
        splash.message('<div>' + txt.lvlNum + C + '</div>'
                + '<div>' + txt.lvlWin + lvl[C].win + '</div>');
        splash.follow(nextLevelPrepare).present();
    }

    function nextLevelPrepare() {
        splash.hide();
        enemy = new Array();
        enemyCount = 0;
        bullets = new Array();
        bulletCount = 0;
        //GC.stats.statWin.max(lvl[C].win);
        //    for (var i=0;i<lvl[C].win;i++){
        //        addEnemy(i);
        //    }
        addEnemy();
        lvlWin = false;
        addStarship();
        moveEnemy();
    }

    function addEnemy() {
        var h = map.length;
        var w = map[0].length;
        var sl = (GC.game.width - (w * 32)) / 2;
        var st = (GC.game.height - (h * 32) - 42) / 2;
        var l = sl;
        var t = st;
        for (i = 0; i < h; i++) {
            for (j = 0; j < w; j++) {
                if (map[i][j] != 0) {
                    en = new q.qbEnemy(GC.game, 'enemy' + map[i][j]);
                    en.locate(t, l).present(0);
                    enemyCount++;
                    enemy[enemyCount] = en;
                }
                l += 32;
            }
            t += 32;
            l = sl;
        }
    }

    function moveEnemy() {
        var m = (Math.random() * 64 - 32);
        enemy.map(function(e) {
            e.div.css({
                left: parseInt(e.div.css('left')) + m
            })
        })
        if (!gameOver || lvlWin) {
            setTimeout(moveEnemy, 1000);
        }
    }

    function addStarship() {
        starship = new q.qbStarship(GC.game);
        starship.locate(GC.game.height - starship.height - 5, (GC.game.width - starship.width) / 2).present();
        $(window).keydown(function(e) {
            if (e.which == 65) {
                if (!starship.moving) {
                    starship.moveLeft(starship.stopMove);
                }
                SML = true;
            }
            if (e.which == 68) {
                if (!starship.moving) {
                    starship.moveRight(starship.stopMove);
                }
                SMR = true;
            }
        });

        $(window).keyup(function(e) {
            if (e.which == 32) {
                b = new q.qbBullet(GC.game, starship);
                b.locate(starship.top, starship.left + starship.width / 2);
                b.div.show();
                b.fly();
            }
        })

    }

    function removeEnemy() {
        stats.inc(txt.statWin).inc(txt.statPoints).dec(txt.statTotal);
        checkWin();
    }

    function checkWin() {
        if ((!gameOver) && (GC.stats.get(txt.statWin) >= lvl[C].win)) {
            lvlWin = true;
            resetEnviroment();
            C++;
            splash.setMessage(txt.lvlComplete).setFollow((C > maxLvl) ? gameWin : nextLevelSplash).present();
        }
    }

    function resetEnviroment() {
        starship.div.remove();
        delete starship;

    }

    function gameWin() {
        alert(txt.gameWin);
    }


    var lvl = {
        '0': {
            win: 3
        },
        '1': {
            win: 13
        },
        '2': {
            win: 23
        }
    }

    C = 0;
    maxLvl = 2;
    gameOver = false;
    lvlWin = false;
    gameId = 'starzArea';
    splashSpeed = 1000;
    enemyCount = 6;
    SML = false;
    SMR = true;

    var txt = {
        gameWin: 'Wygrana!',
        gameOver: 'Zostałeś trafiony! Koniec gry!',
        follow: 'Kliknij, aby kontynuować...',
        welcome: 'Strzelaj i nie daj się trafić.',
        lvlNum: 'Poziom: ',
        lvlWin: 'Wrogów: ',
        lvlComplete: 'Poziom ukończony!',
        statWin: 'win',
        statWinTitle: 'Trafione: ',
        statPoints: 'points',
        statPointsTitle: 'Punkty: ',
        statTotal: 'total',
        statTotalTitle: 'Razem: '
    };


    map = new Array();
    map[0] = new Array(0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0);
    map[1] = new Array(0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0);
    map[2] = new Array(0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 0, 0, 0);
    map[3] = new Array(0, 0, 0, 4, 4, 4, 3, 3, 4, 4, 4, 4, 3, 3, 4, 4, 4, 0, 0, 0);
    map[4] = new Array(0, 0, 0, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0);
    map[5] = new Array(0, 0, 0, 0, 4, 4, 1, 1, 4, 4, 4, 4, 1, 1, 4, 4, 0, 0, 0, 0);
    map[6] = new Array(0, 0, 0, 0, 0, 4, 4, 4, 1, 1, 1, 1, 4, 4, 4, 0, 0, 0, 0, 0);
    map[7] = new Array(0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0);


}(qbLib));
