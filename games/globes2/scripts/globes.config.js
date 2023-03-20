qbLibrary.globes ||= {};

qbLibrary.globes.config = {
  setups: {
    '0': {
      title: {
        en: 'Can I play Daddy?',
        pl: 'Mogę zagrać?'
      },
      freq: 900,
      freqAccel: 0.9,
      age: 6000,
      bonus: 0.9,
      types: 6,
      life: 5,
      hsmax: 5,
      msize: 6,
      present: 0
    },
    '1': {
      title: {
        en: 'Slow and steady',
        pl: 'Spokojnie i statecznie'
      },
      freq: 900,
      freqAccel: 0.8,
      age: 5000,
      bonus: 0.9,
      types: 6,
      life: 5,
      hsmax: 5,
      msize: 0,
      present: 0
    },
    '2': {
      title: {
        en: 'Show me what you can!',
        pl: 'Pokaż, co potrafisz!'

      },
      freq: 800,
      freqAccel: 0.7,
      age: 4000,
      bonus: 0.85,
      types: 6,
      life: 5,
      hsmax: 5,
      msize: 0,
      present: 500
    }
  },
  sounds: {
    location: 'sounds/',
    list: {
      lifeUp: 'lifeup.ogg',
      gameOver: 'gameover.ogg',
      lifeDown: 'lifedown.ogg',
      speedUp: 'speedup.ogg',
      speedDown: 'speeddown.ogg',
      hit: 'targethit.ogg'
    }
  },
  texts: {
    en: {
      exit: 'Quit the game?',
      follow: 'Click to continue...',
      gameover: 'Game over!',
      hs: ['Points', 'Hit', 'Pauses', 'Interval'],
      hsTitle: 'Highscore',
      lifedown: 'life lost',
      lifeup: 'life gained',
      locale: 'English',
      oextra: 'Pause used %d time(s)',
      otext: '%d targets hit for %d points!',
      resetStats: 'Really reset the Highscore?',
      speeddown: 'speed down',
      speedup: 'speed up',
      wextra: 'Space - pause<br/>Esc - exit game<br/>S - toggle sound',
      wtitle: 'Globes',
      wwelcome: 'Hit the Globes before they turn red!',
      stats: {
        active: {
          desc: '',
          title: 'Globes on the field',
          limited: false
        },
        hit: {
          desc: '',
          title: 'Globes hit',
          limited: false
        },
        points: {
          desc: '',
          title: 'Points',
          limited: false
        },
        life: {
          desc: '',
          title: 'Lives',
          limited: false
        },
        speed: {
          desc: '',
          title: 'Globes frequency',
          limited: false
        }
      },
      options: {
        sound: {
          desc: '',
          title: 'Toggle sound',
          visible: true
        },
        pause: {
          desc: '',
          title: 'Pause',
          visible: true
        },
        exit: {
          desc: '',
          title: 'Exit the game',
          visible: true
        }
      }
    },
    pl: {
      exit: 'Koniec gry?',
      follow: 'Kliknij, aby kontynuować...',
      gameover: 'Koniec gry!',
      hs: ['Punkty', 'Trafienia', 'Pauzy', 'Częstotliwość'],
      hsTitle: 'Najlepsze wyniki',
      lifedown: 'stracone życie',
      lifeup: 'zdobyte życie',
      locale: 'Polski',
      oextra: 'Pauza użyta %d raz(y)',
      otext: '%d trafionych kulek za %d punkty!',
      resetStats: 'Naprawdę zresetować wyniki?',
      speeddown: 'spowolnienie',
      speedup: 'przyśpieszenie',
      wextra: 'Spacja - pauza<br/>Esc - koniec gry<br/>S - dźwięki',
      wtitle: 'Kulki',
      wwelcome: 'Zbijaj kulki zanim staną się czerwone!',
      stats: {
        active: {
          desc: '',
          title: 'Kulki na planszy',
          limited: false
        },
        hit: {
          desc: '',
          title: 'Zbite kulki',
          limited: false
        },
        points: {
          desc: '',
          title: 'Punkty',
          limited: false
        },
        life: {
          desc: '',
          title: 'Życia',
          limited: false
        },
        speed: {
          desc: '',
          title: 'Częstotliwość',
          limited: false
        }
      },
      options: {
        sound: {
          desc: '',
          title: 'Dźwięki',
          visible: true
        },
        pause: {
          desc: '',
          title: 'Pauza',
          visible: true
        },
        exit: {
          desc: '',
          title: 'Koniec gry',
          visible: true
        }
      }
    }
  },
  points: {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 1,
    '5': 2,
    '6': 3,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 1,
    '11': 2,
    '12': 3
  },
  wallpaper: {
    timer: 6000,
    location: 'images/background/',
    count: 13,
    images: {},
    colors: {
      '001': '#EFA213',
      '002': '#479BB3',
      '003': '#937B5F',
      '004': '#0760A4',
      '005': '#AB0A12',
      '006': '#FFFFFF',
      '007': '#5CB5D7',
      '008': '#A4BD19',
      '009': '#873CB2',
      '010': '#9CCBE9',
      '011': '#591671',
      '012': '#000000',
      '013': '#40F5A4'
    }
  },
  color: '#0f0'
};
