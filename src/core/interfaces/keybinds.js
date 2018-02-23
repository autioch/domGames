import $ from 'jquery';

export default {
  currentKeys: undefined,
  unbindKeys() {
    $(document).off('keydown.domGames', this.currentKeys);
  },
  bindKeys(newKeys) {
    this.unbindKeys();
    this.currentKeys = newKeys;
    $(document).on('keydown.domGames', newKeys);
  },
  initKeybinds(keys) {
    this.bindKeys(keys);
  }
};
