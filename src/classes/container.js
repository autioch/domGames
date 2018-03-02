export default function Container(id) {
  b.call(this);
  const x = this;

  x.div.attr('id', id);
  bb.call(this, true, true, true, true);
  x.centerAlways();
  x.bindKeys = function(func) {
    $(document).bind('keydown', func);
    x.oldDispose = x.dispose;
    x.dispose = function(recursive) {
      $(document).unbind('keydown', func);
      x.oldDispose(recursive);
    };

    return x;
  };
}
