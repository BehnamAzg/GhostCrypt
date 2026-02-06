import { navigateTabs } from "./navigateTabs.js";
import { openModal } from "./openModal.js";
import { clearInput, copyInput, pasteInput } from "./inputButtonHandler.js";
import { clearPassphrase, copyPassphrase, pastePassphrase, generatePassphrase } from "./passphraseButtonHandler.js";
import { copyOutput, shareOutput } from "./outputButtonHandler.js";

export const setupButtonHandler = function () {
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest("button");
    if (!(btn instanceof HTMLElement)) return;
    const action = btn.dataset.action;
    if (!action) return;

    switch (action) {
      case "homeTab":
        navigateTabs(action);
        break;
      case "settingsTab":
        navigateTabs(action);
        break;
      case "messagesTab":
        navigateTabs(action);
        break;
      case "infoMain":
        openModal(action);
        break;
      case "clearInput":
        clearInput();
        break;
      case "copyInput":
        copyInput();
        break;
      case "pasteInput":
        pasteInput();
        break;
      case "generatePassphrase":
        generatePassphrase();
        break;
      case "clearPassphrase":
        clearPassphrase();
        break;
      case "copyPassphrase":
        copyPassphrase();
        break;
      case "pastePassphrase":
        pastePassphrase();
        break;
      case "copyOutput":
        copyOutput();
        break;
      case "shareOutput":
        shareOutput();
        break;
      case "installApp":
        console.log("installApp test");
        break;
      case "infoMessages":
        openModal(action);
        break;
      case "addContact":
        openModal(action);
        break;
      case "openChat":
        console.log("openChat test");
        break;
      case "sendMessage":
        console.log("sendMessage test");
        break;
      case "backToMessages":
        console.log("backToMessages test");
        break;
      case "editContact":
        console.log("editContact test");
        break;
      case "deleteContact":
        console.log("deleteContact test");
        break;
      case "viewEncryption":
        console.log("viewEncryption test");
        break;
      default:
        console.log("No handler for this action");
    }
  });
};
