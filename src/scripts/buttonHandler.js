import { navigateTabs } from "./navigateTabs.js";
import { openModal } from "./openModal.js";

export const initButtonHandler = function () {
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return;
    const btn = e.target.closest("button");
    if (!(btn instanceof HTMLElement)) return;
    const action = btn.dataset.action;

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
        console.log("test");
        break;
      case "copyInput":
        console.log("test");
        break;
      case "pasteInput":
        console.log("test");
        break;
      case "generatePassphrase":
        console.log("test");
        break;
      case "clearPassphrase":
        console.log("test");
        break;
      case "copyPassphrase":
        console.log("test");
        break;
      case "pastePassphrase":
        console.log("test");
        break;
      case "clearOutput":
        console.log("test");
        break;
      case "shareOutput":
        console.log("test");
        break;
      case "installApp":
        console.log("test");
        break;
      case "infoMessages":
        openModal(action);
        break;
      case "addContact":
        openModal(action);
        break;
      case "openChat":
        console.log("test");
        break;
      case "sendMessage":
        console.log("test");
        break;
      case "backToMessages":
        console.log("test");
        break;
      case "editContact":
        console.log("test");
        break;
      case "deleteContact":
        console.log("test");
        break;
      case "viewEncryption":
        console.log("test");
        break;
      default:
        console.log("No handler for this action");
    }
  });
};
