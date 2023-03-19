var qbLib = qbLib || {}; // eslint-disable-line no-var

(function(q) {
  q.qbStarzArea = qbStarzArea;
  q.qbStars = qbStars;
  q.qbGalaxy = qbGalaxy;
  q.qbStarship = qbStarship;
  q.qbBullet = qbBullet;
  q.qbEnemy = qbEnemy;

  function qbStarzArea(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
    const self = this;

    this.space = [];
    this.space.stars = [];
    this.space.galaxy = [];

    this.bigBang = function(stars, galaxy) {
      for (let i = 0; i < stars; i++) {
        self.space.stars[i] = new qbStars(self);
        self.space.stars[i].locateRandom().present(1000);
      }
      for (let i = 0; i < galaxy; i++) {
        self.space.galaxy[i] = new qbGalaxy(self);
        self.space.galaxy[i].locateRandom().present(1000);
      }
    };
  }

  function qbStars(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
  }

  function qbGalaxy(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
  }

  function qbStarship(qbContainer) {
    q.qbGameObject.call(this, qbContainer);
    const self = this;
    this.stop = false;
    this.moving = false;

    this.moveLeft = function(callback) {
      let l = parseInt(self.div.css('left'), 10) - 10;
      l = Math.max(l, 0);
      self.moving = true;
      self.div.animate({
        left: `${l}px`
      }, 10, function() {
        callback();
      });
    };

    this.moveRight = function(callback) {
      let l = parseInt(self.div.css('left'), 10) + 10;
      l = Math.min(l, self.container.width - self.width);
      self.moving = true;
      self.div.animate({
        left: `${l}px`
      }, 10, function() {
        callback();
      });
    };

    this.stopMove = function() {
      self.moving = false;
      self.refresh();
    };
  }

  function qbBullet(qbContainer, qbShip) {
    q.qbGameObject.call(this, qbContainer);
    const self = this;
    this.ship = qbShip;

    // check for collision on each step
    this.fly = function() {
      self.div.animate({
        top: 0
      }, 1000, function() {
        $(this).remove();
      });
    };

    this.checkCollision = function() {
    };
  }

  function qbEnemy(qbContainer, qbEnemyType) {
    q.qbGameObject.call(this, qbContainer);
    const self = this;

    this.type = qbEnemyType;
    this.div.addClass(self.type);

    this.hit = function() {
      self.div.addClass('enemyExplode');
      self.div.animate({
        height: 50,
        width: 50
      }, 500, function() {
        $(this).remove();
      });
    };
  }
})(qbLib);
