import { updateCharCounter } from "./listeners.js";
import { getPassphrase, isPassphraseSet } from "./passphrase.js";
import { encryptMessage } from "./encryptMessage.js";
import { decryptMessage } from "./decryptMessage.js";
import { obfuscate } from "./obfuscate.js";
import { deobfuscate } from "./deobfuscate.js";
import { updateCharCounter } from "./charCounter.js";

const outputWarningBadge = document.getElementById("outputWarningBadge");
const outputDiv = document.getElementById("output");
const charCounter = document.getElementById("charCounter");

// Main processing function (called on changes)
const processMessage = async function () {
  outputWarningBadge.textContent = "";
  outputDiv.textContent = "";
  charCounter.textContent = "0/160 characters";

  if (!isPassphraseSet()) return; // Do nothing if passphrase incomplete

  const message = input.value.trim();
  if (!message) return;

  const password = getPassphrase();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const obfuscation = obfuscationSelect.value;

  try {
    let result;
    if (mode === "encrypt") {
      const encryptedObj = await encryptMessage(message, password);
      const serialized = JSON.stringify(encryptedObj); // Or custom serialization
      result = obfuscate(serialized, obfuscation);
    } else {
      // Decrypt
      const deobfuscated = deobfuscate(message, obfuscation);
      const encryptedObj = JSON.parse(deobfuscated); // Assuming input is obfuscated serialized obj
      result = await decryptMessage(encryptedObj, password);
    }

    outputDiv.textContent = result;
    updateCharCounter(result);
  } catch (err) {
    outputWarningBadge.classList.toggle("hidden");
  }
};

// Debounced trigger
export const triggerProcess = function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(processMessage, 300);
};
