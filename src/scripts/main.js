import { setupButtonHandler } from "./buttonHandler";
import { setupPassphraseValidation, setupPassphrasePasteHandling } from "./passphraseButtonHandler.js";

const init = function () {
  setupButtonHandler();
  setupPassphraseValidation();
  setupPassphrasePasteHandling();
};
init();
