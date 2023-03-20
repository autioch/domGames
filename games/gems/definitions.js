var qbLib = qbLib || {};// eslint-disable-line no-var
(function(q) {
  q.qbGemArea = qbGemArea;
  q.qbGem = qbGem;

  function qbGemArea(qbContainer, qbId) {
    q.qbGameObject.call(this, qbContainer);
    const qb = this;
    qb.gems = [];
    qb.div.attr('id', qbId);
    qb.waves = 0;
    qb.sizeH = 3;
    qb.sizeW = 20;
    qb.types = 4;

    qb.addWave = function() {
      qb.gems[qb.waves] = [];
      for (let i = 0; i < qb.sizeW; i++) {
        const type = Math.round(Math.random() * (qb.types - 1)) + 1;
        const gt = new qbGem(qb, type, qb.waves, i);
        qb.gems[qb.waves][i] = gt;
        gt.div.click(function() {
          qb.checkClick(gt.div);
        });
      }
      for (let j = 0; j <= qb.waves; j++) {
        for (let i = 0; i < qb.sizeW; i++) {
          if (qb.gems[j][i]) {
            qb.gems[j][i].locate(qb.height - (qb.waves - j) * 32 - 32, i * 32).present();
          }
        }
      }
      for (let i = 0; i < qb.sizeW; i++) {
        qb.gems[qb.waves][i].present(0);
      }
      qb.waves++;
    };

    qb.checkClick = function(div) {
      const t = div.prop('t');
      const l = div.prop('l');
      const type = div.prop('type');
      let remove = 0;
      for (let i = t + 1; i < qb.waves; i++) {
        if (qb.gems[i][l] && (type === qb.gems[i][l].type)) {
          qb.gems[i][l].div.addClass('remove');
          remove++;
        } else {
          break;
        }
      }

      for (let i = t - 1; i > 0; i--) {
        if (qb.gems[i][l] && (type === qb.gems[i][l].type)) {
          qb.gems[i][l].div.addClass('remove');
          remove++;
        } else {
          break;
        }
      }

      for (let i = l + 1; i < qb.sizeW; i++) {
        if (qb.gems[t][i] && (type === qb.gems[t][i].type)) {
          qb.gems[t][i].div.addClass('remove');
          remove++;
        } else {
          break;
        }
      }

      for (let i = l - 1; i > 0; i--) {
        if (qb.gems[t][i] && (type === qb.gems[t][i].type)) {
          qb.gems[t][i].div.addClass('remove');
          remove++;
        } else {
          break;
        }
      }

      if (remove > 3) {
        qb.gems[t][l].div.remove();
        delete qb.gems[t][l];
        for (let i = 0; i < qb.waves; i++) {
          for (let j = 0; j < qb.sizeW; j++) {
            if (qb.gems[i][j]) {
              if (qb.gems[i][j].div.hasClass('remove')) {
                qb.gems[i][j].div.remove();
                delete qb.gems[i][j];
              }
            }
          }
        }

        // TODO
        /*
                 * Przepisać tak, żeby plansza to była tablica o długości szerokości planszy
                 * Każdy element to tablica o maksymalnej długości wyokości planszy
                 *
                 * Dopisać sprawdzanie przyległych elementów dla każdego elementu (rekurencja :S)
                 *
                 **/
        // for (j = 0; j < qb.sizeW; j++) {
        //     var t = [];
        //     for (i = 0; i < qb.waves; i++) {
        //         if (qb.gems[i][j]) {

        //         }
        //     }
        // }
      } else {
        $('div.qbGem').removeClass('remove');
      }
    };
  }

  function qbGem(qbContainer, qbType, wave, positon) {
    q.qbGameObject.call(this, qbContainer);

    const qb = this;
    qb.type = qbType;
    qb.wave = wave;
    qb.position = positon;
    qb.div.prop('type', qb.type).prop('t', qb.wave).prop('l', qb.position);
    qb.div.addClass(`gem${qbType}`);
  }
})(qbLib);
