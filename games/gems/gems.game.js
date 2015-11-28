var qbLib = qbLib || {};
(function(q) {
    var GC;
    q.initGems = function() {
        bg = new q.qbBackground();
        bg.present();

        splash = new q.qbMessageScreen();
        splash.message('Gems', txt.welcome, '', '').follow(prepareEnviroment).present();
    }


    function prepareEnviroment() {
        GC = new q.qbContainer('qbC',true);
        GC.present();

        GC.game = new q.qbGemArea(GC);
        GC.game.locate(0, 0).present();

        GC.stats = new q.qbStatistics(GC);
        GC.stats.locate(GC.game.height, 0).present()
                .add(txt.statPoints, txt.statPointsTitle, 0)
                .add(txt.statWaves, txt.statWavesTitle, 0);
        setTimeout(addWave,1000);
    }

    function addWave() {
        GC.game.addWave();
        if (GC.game.waves > max) {
            gameLose();
        }
        else {
            setTimeout(addWave, 5000);
        }
    }

    function gameLose() {
        splash.message('Gems', txt.gameOver, '', '').follow(location.reload).present();
    }

    gameOver = false;
    enemyDiff = 6;
    max = 10;
    acc = 0.95;
    more = 3000;
    speed_counter = 0;
    speed_period = 5;
    gameId = 'gemArea';

    var txt = {
        gameWin: 'Wygrana!',
        gameOver: 'Kryształy sięgnęły sufitu! Koniec gry!',
        follow: 'Kliknij, aby kontynuować...',
        welcome: 'Usuwaj kryształy o takich samych kolorach.',
        statPoints: 'points',
        statPointsTitle: 'Punkty: ',
        statWaves: 'waves',
        statWavesTitle: 'Fale: '
    };

}(qbLib));

