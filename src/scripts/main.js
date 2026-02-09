import { setupButtonHandler } from "./buttonHandler";
import { setupPassphraseValidation, setupPassphrasePasteHandling } from "./passphraseButtonHandler.js";
import { setupListeners } from "./listeners.js";
import { loadLanguage, updateAllTexts, setupLanguageSelector } from "./i18n.js";
import { initGestureHandler } from "./gestureHandler.js";
import { checkInstallation } from "./installButton.js";

const init = async function () {
  await loadLanguage(localStorage.getItem("lang") || "en");
  updateAllTexts();
  setupLanguageSelector();
  setupButtonHandler();
  initGestureHandler();
  setupPassphraseValidation();
  setupPassphrasePasteHandling();
  setupListeners();
  checkInstallation();
};
init();
