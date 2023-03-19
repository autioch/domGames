var qbLib = qbLib || {};// eslint-disable-line no-var
(function(q) {
  q.qbTrash = qbTrash;
  q.qbBin = qbBin;
  q.qbPlayArea = qbPlayArea;
  q.qbRunner = qbRunner;
  random = q.random; // eslint-disable-line prefer-destructuring
  function qbTrash(qbContainer, qbBin, size) {
    q.qbGameObject.call(this, qbContainer);

    // q.qbSoundObject.call(this);
    const qb = this;

    // qb.addSound('disposeSound', 'trashDispose.ogg');
    qb.bin = qbBin;
    qb.prop('type', qbBin.type).prop('size', size);
    qb.move = function() {
      qb.refresh();
      const cw = qb.left + qb.width / 2;
      const ch = qb.top + qb.height / 2;
      if ((cw >= qb.bin.left) && (cw <= (qb.bin.left + qb.bin.width)) && (ch >= qb.bin.top) && (ch <= (qb.bin.top + qb.bin.height))) {
        qb.div.draggable('destroy').fadeOut(100, function() {
          qb.dispose().onDispose(qb);
        });
      }
    };
    qb.onDispose = function() {
    };
    qb.div.draggable({
      stop: qb.move,
      containment: qbContainer.div
    });
  }

  function qbBin(qbContainer, type) {
    q.qbGameObject.call(this, qbContainer);
    const qb = this;
    qb.prop('type', type);
    qb.div.click(qb.locateRandom);
    qb.locateRandom().show();
  }

  function qbPlayArea(qbContainer, id) {
    q.qbGameArea.call(this, qbContainer);
    const qb = this;
    qb.div.attr('id', id);
    qb.level = {};
    qb.bins = [];
    qb.binsCount = 0;
    qb.setBins = function() {
      for (let i = 1; i <= qb.level.bin; i++) {
        qb.bins[++qb.binsCount] = new qbBin(qb, i);
      }
    };
    qb._flowers = [];
    qb._grass = [];
    qb.flourish = function(grass, flowers) {
      for (var i = 0; i < grass; i++) {
        qb._grass[i] = new qbGrassDecoration(qb);
      }

      for (i = 0; i < flowers; i++) {
        qb._flowers[i] = new qbFlowerDecoration(qb);
      }

      return qb;
    };
    qb.trashes = [];
    qb.trashesCount = 0;
    qb.addTrash = function(runner) {
      const t = new qbTrash(qb, qb.bins[random(qb.binsCount, 1)], random(3, 1));
      qb.trashes[++qb.trashesCount] = t;
      t.onDispose = qb.trashDispose;
      const tx = parseInt(runner.div.css('top'), 10);
      const ty = parseInt(runner.div.css('left'), 10);
      t.locate(tx, ty).present();
      qb.trashAdd();
    };
    qb.trashDispose = function() {
    };
    qb.trashAdd = function() {
    };
    qb.runnerTimer = 0;
    qb.runners = [];
    qb.runnersCount = 0;
    qb.addRunner = function() {
      if (!qb.paused) {
        const r = new qbRunner(qb, qb.level.runnerSpeed, qb.level.trashFrequency, qb.level.trashAccel);
        qb.runners[++qb.runnersCount] = r;
        r.onAction = qb.addTrash;
        r.onDispose = qb.runnerDispose;
        r.locateRandom().present().start();
        qb.runnerTimer = setTimeout(qb.addRunner, qb.level.runnerFrequency);
      }
    };
    qb.runnerDispose = function() {
    };
    qb.reset = function() {
      for (var i in qb.runners) {
        qb.runners[i].dispose();
        delete qb.runners[i];
      }

      qb.runnersCount = 0;
      qb.runners = [];
      for (i in qb.bins) {
        qb.bins[i].dispose();
        delete qb.bins[i];
      }

      qb.binsCount = 0;
      qb.bins = [];
      for (i in qb.trashes) {
        qb.trashes[i].dispose();
        delete qb.trashes[i];
      }

      qb.trashesCount = 0;
      qb.trashes = [];
    };
    qb.onStart = function() {
      qb.setBins();
      qb.addRunner();
      return qb;
    };
    qb.onPause = function() {
      if (qb.started) {
        clearTimeout(qb.runnerTimer);
        for (const a in qb.runners) {
          if (!qb.runners[a].disposed) {
            qb.runners[a].pause();
          }
        }
      }

      return qb;
    };
    qb.onResume = function() {
      if (qb.started) {
        for (const a in qb.runners) {
          if (!qb.runners[a].disposed) {
            qb.runners[a].resume();
          }
        }

        qb.runnerTimer = setTimeout(qb.addRunner, random(qb.level.runnerFrequency, 0));
      }

      return qb;
    };
    qb.onStop = function() {
      clearTimeout(qb.runnerTimer);
      for (const a in qb.runners) {
        qb.runners[a].pause();
      }
    };
  }

  function qbGrassDecoration(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
    this.locateRandom().show();
  }

  function qbFlowerDecoration(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
    this.prop('color', random(3));
    this.locateRandom().show();
  }

  function qbRunner(qbContainer, speed, trash, accel) {
    q.qbGameObject.call(this, qbContainer);
    q.qbActiveObject.call(this);

    // q.qbSoundObject.call(this);
    const qb = this;

    // qb.addSound('hitSound', 'runnerHit.ogg');
    qb._speed = speed;
    qb._top = 0;
    qb._left = 0;
    qb.run = function() {
      qb.refresh();
      qb._left = random(qb.container.width - qb.width, 0);
      qb._top = random(qb.container.height - qb.height, 0);
      qb.left < qb._left ? qb.div.addClass('left') : qb.div.removeClass('left');
      const speed = q.distance(qb.top, qb._top, qb.left, qb._left) * qb._speed;
      qb.div.animate({
        left: `${qb._left}px`,
        top: `${qb._top}px`
      }, speed, 'linear', qb.run);
    };
    qb._trash = trash;
    qb._accel = accel;
    qb._actionTimeout = 0;
    qb._actionTimer = function() {
      if (!qb.paused) {
        qb.onAction(qb);
        qb._trash *= qb._accel;
        qb._actionTimeout = setTimeout(qb._actionTimer, qb._trash);
      }
    };
    qb.onAction = function() {
    };
    qb.onStart = function() {
      qb.onAction(qb);
      qb.run();
      qb._actionTimeout = setTimeout(qb._actionTimer, qb._trash);
      return qb;
    };
    qb.onPause = function() {
      clearTimeout(qb._actionTimeout);
      qb.div.stop();
      return qb;
    };
    qb.onResume = function() {
      qb.run();
      qb._actionTimeout = setTimeout(qb._actionTimer, random(qb._trash, 0));
      return qb;
    };
    qb.div.mousedown(function() {
      qb.div.unbind('click');
      qb.pause().dispose().onDispose();
    });
    qb.onDispose = function() {
    };
  }
})(qbLib);
