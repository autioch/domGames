export default function inherit(from, to, args) {
  for (const i in from) { // eslint-disable-line guard-for-in
    to[i] = from[i];
  }

  for (const i in from.prototype) { // eslint-disable-line guard-for-in
    to[i] = from.prototype[i];
  }

  if (typeof to.init === 'function') {
    to.init(args);
  }
}
