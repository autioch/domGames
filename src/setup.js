import $ from 'jquery';

export default function setup(config, game) {
  const $locale = $('#globesLocale');
  const $setup = $('#globesSetup');

  Object
    .keys(config.texts)
    .forEach((key) => $locale.append(`<option value="${key}">${config.texts[key].locale}</option>`));

  function renderSetup() {
    $setup.children().remove();

    Object
      .keys(config.setups)
      .forEach((key) => $setup.append(`<option value="${key}">${config.setups[key].title[$locale.val()]}</option>`));
  }

  $locale.on('change', () => {
    $setup.children().remove();

    $('#globesInit').html(config.texts[$locale.val()].wtitle);
    renderSetup();
  });

  renderSetup();

  $('#globesInit').on('click', () => game($locale.val(), $setup.val()));
}
