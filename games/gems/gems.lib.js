var qbLib = qbLib || {};
(function(q) {

    q.qbGemArea = qbGemArea;
    q.qbGem = qbGem;

    function qbGemArea(qbContainer, qbId) {
        q.qbGameObject.call(this, qbContainer);
        var qb = this;
        qb.gems = new Array();
        qb.div.attr('id', qbId);
        qb.waves = 0;
        qb.sizeH = 3;
        qb.sizeW = 20;
        qb.types = 4;

        qb.addWave = function() {
            qb.gems[qb.waves] = new Array();
            for (var i = 0; i < qb.sizeW; i++) {
                var type = Math.round(Math.random() * (qb.types - 1)) + 1;
                var gt = new qbGem(qb, type, qb.waves, i);
                qb.gems[qb.waves][i] = gt;
                gt.div.click(function() {
                    qb.checkClick(gt.div);
                });
            }
            for (var j = 0; j <= qb.waves; j++) {
                for (i = 0; i < qb.sizeW; i++) {
                    if (qb.gems[j][i]) {
                        qb.gems[j][i].locate(qb.height - (qb.waves - j) * 32 - 32, i * 32).present();
                    }
                }
            }
            for (i = 0; i < qb.sizeW; i++) {
                qb.gems[qb.waves][i].present(0);
            }
            qb.waves++;
        };

        qb.checkClick = function(div) {
            var t = div.prop('t'), l = div.prop('l'), type = div.prop('type');
            console.log(t, l, type);
            var remove = 0;
            for (var i = t + 1; i < qb.waves; i++) {
                if ((qb.gems[i][l]) && (type === qb.gems[i][l].type)) {
                    qb.gems[i][l].div.addClass('remove');
                    remove++;
                } else {
                    break;
                }
            }

            for (i = t - 1; i > 0; i--) {
                if ((qb.gems[i][l]) && (type === qb.gems[i][l].type)) {
                    qb.gems[i][l].div.addClass('remove');
                    remove++;
                } else {
                    break;
                }
            }

            for (i = l + 1; i < qb.sizeW; i++) {
                if ((qb.gems[t][i]) && (type === qb.gems[t][i].type)) {
                    qb.gems[t][i].div.addClass('remove');
                    remove++;
                } else {
                    break;
                }
            }

            for (i = l - 1; i > 0; i--) {
                if ((qb.gems[t][i]) && (type === qb.gems[t][i].type)) {
                    qb.gems[t][i].div.addClass('remove');
                    remove++;
                } else {
                    break;
                }
            }

            if (remove > 3) {
                qb.gems[t][l].div.remove();
                delete qb.gems[t][l];
                for (i = 0; i < qb.waves; i++) {
                    for (var j = 0; j < qb.sizeW; j++) {
                        if (qb.gems[i][j]) {
                            if (qb.gems[i][j].div.hasClass('remove')) {
                                qb.gems[i][j].div.remove();
                                delete qb.gems[i][j];
                            }
                        }
                    }
                }
                //TODO
                /*
                 * Przepisać tak, żeby plansza to była tablica o długości szerokości planszy
                 * Każdy element to tablica o maksymalnej długości wyokości planszy
                 * 
                 * Dopisać sprawdzanie przyległych elementów dla każdego elementu (rekurencja :S)
                 *
                 **/
                for (j = 0; j < qb.sizeW; j++) {
                    var t = new Array();
                    for (i = 0; i < qb.waves; i++) {
                        if (qb.gems[i][j]) {

                        }
                    }
                }

            } else {
                $('div.qbGem').removeClass('remove');
            }
        }
    }

    function qbGem(qbContainer, qbType, wave, positon) {
        q.qbGameObject.call(this, qbContainer);

        var qb = this;
        qb.type = qbType;
        qb.wave = wave;
        qb.position = positon;
        qb.div.prop('type', qb.type).prop('t', qb.wave).prop('l', qb.position);
        qb.div.addClass('gem' + qbType);
    }

}(qbLib));
