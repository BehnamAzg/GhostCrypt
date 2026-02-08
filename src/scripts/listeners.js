import { triggerProcess } from "./processMessage.js";

const passphraseInputs = document.querySelectorAll("#passphraseInput input");
const passInputs = [...passphraseInputs];
const modeRadios = document.querySelectorAll('input[name="mode"]');
const obfuscationSelect = document.getElementById("obfuscationSelect");
const input = document.getElementById("input");

// Add listeners
export const setupListeners = function () {
  passInputs.forEach((input) => input.addEventListener("input", triggerProcess));
  modeRadios.forEach((radio) => radio.addEventListener("change", triggerProcess));
  obfuscationSelect.addEventListener("change", triggerProcess);
  input.addEventListener("input", triggerProcess);
};
