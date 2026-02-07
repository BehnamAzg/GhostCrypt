import { setupButtonHandler } from "./buttonHandler";
import { setupPassphraseValidation, setupPassphrasePasteHandling } from "./passphraseButtonHandler.js";
import { setupListeners } from "./listeners.js";
import { loadLanguage, updateAllTexts, setupLanguageSelector } from "./i18n.js";
import { initGestureHandler } from "./gestureHandler.js";

const init = async function () {
  await loadLanguage(localStorage.getItem("lang") || "en");
  updateAllTexts();
  setupLanguageSelector();
  initGestureHandler();
  setupButtonHandler();
  setupPassphraseValidation();
  setupPassphrasePasteHandling();
  setupListeners();
};
init();
