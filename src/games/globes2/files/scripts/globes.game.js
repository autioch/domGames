qbLibrary.globes = qbLibrary.globes || {};

qbLibrary.globes.game = function(locale, difficulty) {

    var background, container, gamearea, options, statistics, splashAlert, message;
    var highscore, timers = {}, wallpaper = {}, bgi = 'background-image', bgc = 'background-color';
    var config = qbLibrary.globes.config;
    var setup = qbLibrary.globes.config.setups[difficulty];
    var texts = qbLibrary.globes.config.texts[locale];
    var random = qbLibrary.utils.random;

    background = new qbLibrary.classes.background();
    background.present();
    highscore = new qbLibrary.globes.library.highscore(texts, difficulty);

    qbLibrary.utils.prepareWindow();

    message = new qbLibrary.classes.confirmMessage();
    qbLibrary.utils.inherit(qbLibrary.interfaces.borders, message);
    message.addBorders(1, 1, 1, 1, true).centerAlways()
            .text(texts.wtitle, texts.wwelcome, texts.wextra, texts.follow).follow(initialize)
            .resizeBorders().present();

    function initialize() {
        container = new qbLibrary.classes.box();
        container.div.attr('id', 'sgc');
        qbLibrary.utils.inherit(qbLibrary.interfaces.sound, container, config.sounds.location);
        qbLibrary.utils.inherit(qbLibrary.interfaces.keybinds, container, keybinds);
        qbLibrary.utils.inherit(qbLibrary.interfaces.borders, container);
        container.parseSounds(qbLibrary.globes.config.sounds.list);

        container._wallpaper = new qbLibrary.classes.background(container.div);
        container._wallpaper.div.css(bgi, 'url(\'' + config.wallpaper.location + '002.jpg\')');
        container._wallpaper2 = new qbLibrary.classes.background(container.div);

        wallpaper.secondActive = true;
        wallpaper.curColor = config.wallpaper.colors['001'];
        wallpaper.nextColor = config.wallpaper.colors['002'];

        gamearea = new qbLibrary.classes.gameArea(container.div);
        gamearea.targets = [];
        gamearea.breaks = -1;
        gamearea.present();
        gamearea.freq = 0;
        gamearea.tsb = 0;

        timers.target = 0;
        timers.refresh = 0;
        timers.wallpaper = 0;

        statistics = new qbLibrary.classes.statistics(container.div);
        qbLibrary.utils.inherit(qbLibrary.interfaces.borders, statistics);
        statistics.parseConfig(texts.stats).addBorders(0, 1, 0, 0, true).present();
        statistics.div.click(highscore.reset);
        statistics._background = new qbLibrary.classes.background(statistics.div);
        statistics._background.present().div.css(bgc, '#fff');

        options = new qbLibrary.classes.options(container.div);
        qbLibrary.utils.inherit(qbLibrary.interfaces.borders, options);
        options.parseConfig(texts.options).addBorders(0, 1, 1, 0, true).present();
        options.exit.click(gameExit);
        options.pause.click(gameToggle);
        options.sound.click(toggleSound);
        options._background = new qbLibrary.classes.background(options.div);
        options._background.present().div.css(bgc, '#fff');

        splashAlert = new qbLibrary.classes.splashMessage(container.div);
        splashAlert.centerAlways();
        container.addBorders(1, 1, 1, 1, true).centerAlways().present(gamePrepare);
    }

    function keybinds(e) {
        switch (e.which) {
            case 27: //escape
                gameExit();
                return false;
                break;
            case 32: //space
                gameToggle();
                return false;
                break;
            case 83: //s
                toggleSound();
                return false;
                break;
        }
    }

    function gamePrepare() {
        gamearea.breaks = -1; //koniec gry oznacza też pauze :D
        for (var i in gamearea.targets) {
            if (!gamearea.targets[i].disposed) {
                gamearea.targets[i].slide();
            }
            delete gamearea.targets[i];
        }
        gamearea.targets = [];
        gamearea.tsb = 1;
        gamearea.freq = setup.freq;
        statistics.val('active', 0).val('hit', 0).val('points', 0).val('life', setup.life).val('speed', (gamearea.freq / 1000).toFixed(2));
        message.text('', '', '', texts.follow).follow(gameStart).present();
    }

    function gameStart() {
        gamearea.start();
        timers.target = setTimeout(addTarget, gamearea.freq);
        timers.refresh = setInterval(refreshTargets, 100);
        setWallpaper();
        timers.wallpaper = setInterval(setWallpaper, config.wallpaper.timer);
        options.pause.check(false);
    }

    function gameToggle() {
        if (gamearea.started) {
            gamearea.paused ? gameResume() : gamePause();
        }
    }

    function gamePause() {
        gamearea.pause();
        clearInterval(timers.target);
        timers.target = null;
        clearInterval(timers.refresh);
        timers.refresh = null;
        clearInterval(timers.wallpaper);
        timers.wallpaper = null;
        gamearea.breaks++;
        options.pause.check(true);
    }

    function gameResume() {
        gamearea.resume();
        timers.target = setTimeout(addTarget, random(gamearea.freq, 100));
        timers.refresh = setInterval(refreshTargets, 100);
        timers.wallpaper = setInterval(setWallpaper, config.wallpaper.timer);
        options.pause.check(false);
    }

    function gameOver() {
        alert(texts.gameover);
        gamePause();
        gamearea.stop();
        container.playSound('gameOver');
        highscore.add(statistics.points.val(), statistics.hit.val(), gamearea.breaks, statistics.speed.val());
        var m = texts.otext.replace('%d', statistics.hit.val()).replace('%d', statistics.points.val());
        var e = texts.oextra.replace('%d', gamearea.breaks);
        message.text(texts.gameover, m, e).follow(showHighscore).present();
    }

    function gameExit() {
        if (confirm(texts.exit)) {
            gamearea.started && gamePause();
            container.unbindKeys();
            container.dispose(true);
            gamearea.dispose(true);
            options.dispose(true);
            statistics.dispose(true);
            splashAlert.dispose(true);
            message.dispose(true);
            background.dispose(true);
        }
    }

    function toggleSound() {
        options.sound.check(qbLibrary.settings.sound);
        qbLibrary.settings.sound = !qbLibrary.settings.sound;
    }

    function targetHit(target) {
        statistics.active.valInc(-1);
        statistics.hit.valInc();
        container.playSound('hit');
        switch (target.type) {
            case 1:
            case 7:
                lifeUp();
                break;
            case 2:
            case 8:
                speedDown();
                break;
            case 3:
            case 9:
                lifeDown();
                break;
            default:
                statistics.points.valInc(config.points[target.type] * target._val);
        }
        if (statistics.hit.val() > gamearea.tsb) {
            speedUp();
        }
    }

    function lifeUp() {
        statistics.life.valInc();
        container.playSound('lifeUp');
        splashAlert.splash(texts.lifeup, config.color, wallpaper.curColor);
    }

    function lifeDown() {
        statistics.life.valInc(-1);
        statistics.active.valInc(-1);
        splashAlert.splash(texts.lifedown, 0, wallpaper.curColor);
        container.playSound('lifeDown');
        if (statistics.life.val() < 1) {
            gameOver();
        }
    }

    function speedUp() {
        gamearea.freq *= setup.freqAccel;
        gamearea.tsb += Math.round(4500 / gamearea.freq); //magic numbers!
        statistics.speed.val((gamearea.freq / 1000).toFixed(2));
        splashAlert.splash(texts.speedup, 0, wallpaper.curColor);
        container.playSound('speedUp');
    }

    function speedDown() {
        gamearea.freq = Math.min(gamearea.freq /= setup.freqAccel, gamearea.freq);
        gamearea.tsb++;
        splashAlert.splash(texts.speeddown, config.color, wallpaper.curColor);
        statistics.speed.val((gamearea.freq / 1000).toFixed(2));
        container.playSound('speedDown');
    }

    function showHighscore() {
        message.text(texts.hsTitle, highscore.get(), '', texts.follow).follow(gamePrepare).present();
    }


    function addTarget() {
        if (!gamearea.paused) {
            var r = Math.random() > setup.bonus ? random(3, 1) : random(setup.types, 4);
            qbLibrary.settings.debug && qbLibrary.utils.log(r);
            var t = new qbLibrary.globes.library.target(gamearea.div, r + setup.msize, setup.age);
            gamearea.targets.push(t);
            t.on('hit', targetHit).on('age', targetAge).locateRandom().present();
            statistics.active.valInc();
            timers.target = setTimeout(addTarget, gamearea.freq);
        }
    }
    function targetAge(target) {
        if (target.type === 3 || target.type === 9) {
            return;
        }
        lifeDown();
    }

    function refreshTargets() {
        for (var a in gamearea.targets) {
            if ((!gamearea.targets[a].disposed) && (gamearea.targets[a].active)) {
                gamearea.targets[a].age();
            }
        }
    }

    function setWallpaper() {
        var next, prev, img = qbLibrary.utils.fillString(random(13, 1), '0', 3);
        prev = wallpaper.secondActive ? container._wallpaper2 : container._wallpaper;
        next = wallpaper.secondActive ? container._wallpaper : container._wallpaper2;
        $('.qbBorderVertical').css(bgc, wallpaper.nextColor);
        $('.qbBorderHorizontal').css(bgc, wallpaper.nextColor);
        prev.div.fadeOut(1000, function() {
            $(this).css(bgi, 'url(\'' + config.wallpaper.location + img + '.jpg\')');
        });
        next.div.fadeIn(1000);
        wallpaper.curColor = wallpaper.nextColor;
        wallpaper.nextColor = config.wallpaper.colors[img];
        wallpaper.secondActive = !wallpaper.secondActive;
    }
};