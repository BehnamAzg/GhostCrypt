import { setupButtonHandler } from "./buttonHandler";
import { setupPassphraseValidation, setupPassphrasePasteHandling } from "./passphraseButtonHandler.js";
import { setupListeners } from "./listeners.js";
import { loadLanguage, updateAllTexts, setupLanguageSelector } from "./i18n.js";

const init = async function () {
  await loadLanguage(localStorage.getItem("lang") || "en");
  updateAllTexts();
  setupLanguageSelector();
  setupButtonHandler();
  setupPassphraseValidation();
  setupPassphrasePasteHandling();
  setupListeners();
};
init();
