import { triggerProcess } from "./processMessage.js";

const inputField = document.getElementById("input");
const copiedBadge = document.getElementById("inputCopiedBadge");
const inputWarningBadge = document.getElementById("inputWarningBadge");

export const clearInput = function () {
  inputWarningBadge.classList.add("hidden");
  if (!inputField.value) return;
  inputField.value = "";
};

export const copyInput = function () {
  if (!inputField.value) return;
  navigator.clipboard.writeText(inputField.value);
  copiedBadge.classList.remove("hidden");
  setTimeout(() => {
    copiedBadge.classList.add("hidden");
  }, 1500);
};

export const pasteInput = function () {
  navigator.clipboard.readText().then((text) => {
    inputField.value = text;
    triggerProcess();
  });
};
