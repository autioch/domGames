var qbLib = qbLib || {};

(function(q) {

    q.qbShooterArea = qbShooterArea;
    q.qbDesk = qbDesk;
    q.qbEnemy = qbEnemy;

    function qbShooterArea(qbContainer, qbId) {
        q.qbGameObject.call(this, qbContainer);
        var qb = this;

        qb.div.attr('id', qbId);
        qb.furniture = new Array();
        qb.furniture["desk"] = new Array();

        this.furnish = function(desk) {
            for (var i = 0; i < desk; i++) {
                qb.furniture["desk"][i] = new qbDesk(qb);
                qb.furniture["desk"][i].locateRandom().present(1000);
            }
        };
    }

    function qbDesk(qbContainer) {
        q.qbGameObject.call(this, qbContainer);
    }

    function qbEnemy(qbContainer, qbEnemyType) {
        q.qbGameObject.call(this, qbContainer);
        var qb = this;

        qb.type = qbEnemyType;
        qb.div.addClass(qb.type);

        qb.hit = function() {
            qb.div.unbind('click');
            qb.div.animate({
                top: qb.container.height
            }, 500, function() {
                qb.div.remove();
            });
        }

    }





}(qbLib));
