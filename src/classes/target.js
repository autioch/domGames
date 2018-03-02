export default function Target(container, type, age) {
  const x = this;

  x.init = function(container, type, age) {
    qbLibrary.utils.inherit(qbLibrary.interfaces.visible, this, container);
    qbLibrary.utils.inherit(qbLibrary.interfaces.active, this);
    x.colorize = Math.random() > 0.5 ? x.green : x.blue;
    x.div.addClass('qbTarget').css({
      'background-color': `rgb(${x.colorize(200)})`,
      'z-index': 3
    });
    qbLibrary.settings.debug && x.div.html(type);
    x.prop('type', type);
    x.ageLeft = age;
    x.ageStart = age;
    x._val = (x.ageLeft / 1000).toFixed();
    x.active = true;
    x.div.mousedown(() => {
      x.slide();
      x.trigger('hit', x);
    });

    return x;
  };

  x.green = function(c) {
    return `${c > 100 ? `${200 - c}%,100` : `100%,${c}`}%,0%`;
  };

  x.blue = function(c) {
    if (c > 100) {
      return `${200 - c}%,100%,${c - 100}%`;
    }

    return `100%,${c}%,0%`;
  };

  x.slide = function() {
    x.active = false;
    x.div.unbind('mousedown');
    x.div.animate({
      top: x.div.parent().height()
    }, x.div.parent().height() - x.top, 'linear', x.dispose);
  };

  x.age = function() {
    x.ageLeft -= 100;
    x.div.css('background-color', `rgb(${x.colorize((x.ageLeft / x.ageStart) * 200)})`);
    x._val = (x.ageLeft / 1000).toFixed();
    if (x.ageLeft < 100) {
      x.slide();
      x.trigger('age', x);
    }
  };

  x.init(container, type, age);
}
