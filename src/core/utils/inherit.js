export default function inherit(from, to, args) {
  from.call(to, args);
}
