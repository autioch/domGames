const sqr = (num) => num * num;

export default function distance(x1, x2, y1, y2) {
  return Math.sqrt(sqr(x1 - x2) + sqr(y1 - y2));
}
