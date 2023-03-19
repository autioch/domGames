var qbLib = qbLib || {};
(function(q) {
  q.qbCleanerConfig = {
    txt: {
      gameOver: 'Poziom przegrany! Świat zalały śmieci!',
      follow: 'Naciśnij dowolny przycisk, aby kontynuować...',
      lvlNum: 'Poziom: ',
      lvlWin: 'Do sprzątnięcia: ',
      lvlMax: 'Maksymalnie śmieci: ',
      lvlComplete: 'Poziom ukończony!',
      gameWin: 'Gratulacje! Przeszedłeś całą grę!'
    },
    sounds: {
      soundWin: 'levelWin.ogg',
      soundLose: 'levelLose.ogg',
      actionError: 'actionError.ogg',
      disposeSound: 'trashDispose.ogg',
      hitSound: 'runnerHit.ogg'
    },
    id: 'cgc',
    soundLocation: 'sounds/',
    gameId: 'playArea',
    startLevel: 1,
    maxLevel: 8,
    story: [
      {
        title: '',
        content: 'Już dawno nie było tak źle... Ludzie zupełnie nie przejmują się mandatami, ustawami, prośbami.' +
            ' Wyrzucają śmieci gdzie popadnie, niszcząc i zabijając swoje otoczenie...',
        extra: '',
        follow: 'Naciśnij dowolny przycisk, aby kontynuować...'
      },
      {
        title: '',
        content: 'Dosyć! Czas podjąć konsekwentne działania z permamenentymi skutkami...',
        extra: '',
        follow: 'Naciśnij dowolny przycisk, aby kontynuować...'
      },
      {
        title: '',
        content: 'Sprzątanie śmieci nabiera nowego znaczenia... ' +
            '<div class="messageImportant">Celuj, strzelaj, sprzątaj!</div>',
        extra: '',
        follow: 'Naciśnij dowolny przycisk, aby kontynuować...'
      }
    ],
    size: {
      container: {
        width: 600,
        height: 480
      },
      game: {
        width: 520,
        height: 440,
        top: 0,
        left: 0
      },
      options: {
        width: 72,
        height: 432,
        top: 0,
        left: 520
      },
      stats: {
        width: 512,
        height: 32,
        top: 440,
        left: 0
      }
    },
    values: {
      points: {
        runner: 2,
        '1': 3,
        '2': 2,
        '3': 1
      },
      total: {
        runner: 10,
        '1': 6,
        '2': 4,
        '3': 2
      }
    },
    levels: {
      '0': {
        win: 25,
        max: 100,
        bin: 4,
        trashFrequency: 5000,
        runnerFrequency: 8000,
        trashAccel: 0.95,
        runnerSpeed: 25,
        actions: {
          police: true,
          school: true,
          comunal: true,
          grass: true
        },
        text: ''
      },
      '1': {
        win: 3,
        max: 20,
        bin: 1,
        trashFrequency: 2000,
        runnerFrequency: 3000,
        trashAccel: 1,
        runnerSpeed: 25,
        actions: {
          police: false,
          school: false,
          comunal: false,
          grass: false
        },
        text: 'Sprzątaj tych co śmiecą. Wyrzucone śmieci trzeba sprzątać, aby nie przekroczyć limitu śmieci na poziom.'
      },
      '2': {
        win: 5,
        max: 18,
        bin: 2,
        trashFrequency: 1500,
        runnerFrequency: 3000,
        trashAccel: 1,
        runnerSpeed: 20,
        actions: {
          police: false,
          school: false,
          comunal: false,
          grass: false
        },
        text: 'Śmieci trzeba sprzątać do odpowiednich pojemników, aby można było odzyskać surowce lub zabezpieczyć te niebiezpieczne dla środowiska. Typy śmieci można rozpoznać po kolorach.'
      },
      '3': {
        win: 8,
        max: 16,
        bin: 2,
        trashFrequency: 2000,
        runnerFrequency: 2500,
        trashAccel: 1,
        runnerSpeed: 15,
        actions: {
          police: false,
          school: false,
          comunal: true,
          grass: false
        },
        text: 'Za sprzątanie śmieci, nie tylko tych leżących zdobywasz kasę. Możesz za nią organizować różne akcje dostępne dla danego poziomu.<div class="messageImportant">Nowa akcja dostępna!</div>Zakład komunalny - miasto organizuje darmową zbiórkę losowego typu odpadów.'
      },
      '4': {
        win: 10,
        max: 15,
        bin: 3,
        trashFrequency: 2000,
        runnerFrequency: 2500,
        trashAccel: 0.9,
        runnerSpeed: 15,
        actions: {
          police: true,
          school: false,
          comunal: false,
          grass: false
        },
        text: 'Wieść o permanentnych rozwiązaniach dotyczących śmieci szybko się roznosi... Przestępcy są coraz szybsi!<div class="messageImportant">Nowa akcja dostępna!</div>Mandaty - akcja policyjna, wszyscy przestępcy są zatrzymani na czas wypisywania mandatów (5 sekund).'
      },
      '5': {
        win: 15,
        max: 10,
        bin: 3,
        trashFrequency: 2000,
        runnerFrequency: 3000,
        trashAccel: 0.85,
        runnerSpeed: 12,
        actions: {
          police: false,
          school: true,
          comunal: true,
          grass: false
        },
        text: 'Aby wykształcić nowe pokolenie, miasto funduje akcje szkolne dla dzieci.<div class="messageImportant">Nowa akcja dostępna!</div>Szkoła - dzieci z pobliskiej szkoły uczone porządku zbierają wszystkie małe śmieci.'
      },
      '6': {
        win: 20,
        max: 15,
        bin: 4,
        trashFrequency: 2000,
        runnerFrequency: 2500,
        trashAccel: 0.95,
        runnerSpeed: 10,
        actions: {
          police: true,
          school: true,
          comunal: true,
          grass: false
        },
        text: ''
      },
      '7': {
        win: 20,
        max: 10,
        bin: 4,
        trashFrequency: 2000,
        runnerFrequency: 2500,
        trashAccel: 0.95,
        runnerSpeed: 10,
        actions: {
          police: true,
          school: true,
          comunal: true,
          grass: true
        },
        text: '<div class="messageImportant">Nowa akcja dostępna!</div>Nowe trawniki - im więcej zieleni, tym mniej śmieci rzuca się w oczy. Zwiększa limit śmieci na dany poziom o 1.'
      },
      '8': {
        win: 25,
        max: 14,
        bin: 4,
        trashFrequency: 2000,
        runnerFrequency: 2500,
        trashAccel: 0.9,
        runnerSpeed: 10,
        actions: {
          police: true,
          school: true,
          comunal: true,
          grass: true
        },
        text: ''
      }
    },
    stats: {
      cwin: {
        desc: 'Sprzątnięci: ',
        title: 'Liczba biegaczy',
        limited: true
      },
      cmax: {
        desc: 'Śmieci: ',
        title: 'Liczba śmieci',
        limited: true
      },
      cpoints: {
        desc: 'Kasa: ',
        title: 'Aktualna kasa',
        limited: false
      },
      ctotal: {
        desc: 'Punkty: ',
        title: 'Zdobyte punkty',
        limited: false
      }
    },
    options: {
      coptions: {
        type: 'title',
        desc: '<div class="icon"></div>',
        visible: true
      },
      csound: {
        type: 'button',
        desc: 'Dźwięk',
        title: 'Dźwięk',
        visible: true
      },
      cpause: {
        type: 'button',
        desc: 'Pauza',
        title: 'Pauza',
        visible: true
      },
      creset: {
        type: 'button',
        desc: 'Reset',
        title: 'Rozpocznij gre od nowa',
        visible: true
      },
      cexit: {
        type: 'button',
        desc: 'Koniec',
        title: 'Zamyka okno gry',
        visible: true
      },
      cbordera: {
        type: 'border',
        visible: true
      },
      cabout: {
        type: 'title',
        desc: '<div class="icon"></div>',
        visible: true
      },
      cauthor: {
        type: 'button',
        desc: 'qb.net.pl',
        title: 'autioch@gmail.com',
        visible: true
      },
      cborderb: {
        type: 'border',
        visible: true
      },
      ctricks: {
        type: 'title',
        desc: '<div class="icon"></div>',
        visible: true
      },
      cpolice: {
        type: 'button',
        desc: '<div class="icon"></div>Mandaty 15',
        title: 'Zatrzymanie biegaczy na 5 sekund',
        cost: 15,
        error: 'Nie ma kasy na dodatkowe patrole!',
        visible: false
      },
      cschool: {
        type: 'button',
        desc: '<div class="icon"></div>Szkoła 5',
        title: 'Dzieci zbierają małe śmieci',
        cost: 5,
        error: 'Za mało kasy na nagrody dla dzieci!',
        visible: false
      },
      ccomunal: {
        type: 'button',
        desc: '<div class="icon"></div>Zakład komunalny 8',
        title: 'Zakład komunalny sprząta losowy typ śmieci',
        cost: 8,
        error: 'Za mało kasy na akcję komunalną!',
        visible: false
      },
      cgrass: {
        type: 'button',
        desc: '<div class="icon"></div>Nowe trawniki 10',
        title: 'Więcej zieleni',
        cost: 10,
        error: 'Miasto wyczerpało budżet na nowe trawniki!',
        visible: false
      }
    }
  };
})(qbLib);
