import { setupButtonHandler } from "./buttonHandler";
import { setupPassphraseValidation, setupPassphrasePasteHandling } from "./passphraseButtonHandler.js";
import { setupListeners } from "./listeners.js";

const init = function () {
  setupButtonHandler();
  setupPassphraseValidation();
  setupPassphrasePasteHandling();
  setupListeners();
};
init();
