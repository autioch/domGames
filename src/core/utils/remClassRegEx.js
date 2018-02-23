export default function remClassRegEx(el, regex) {
  const filterd = el.attr('class').split(' ').filter((item) => !item.match(regex));

  return el.attr('class', filterd.join(' '));
}
