export default function fillString(string, fill, desiredLength) {
  let s = string.toString();

  while (s.length < desiredLength) {
    s = fill + s;
  }

  return s;
}
