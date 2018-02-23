export default function random(max, min) {
  const m = min || 0;

  return Math.floor(Math.random() * (max - m + 1)) + m;
}
