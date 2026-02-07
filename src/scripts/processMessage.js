import { getPassphrase, isPassphraseSet } from "./passphrase.js";
import { encryptMessage } from "./encryptMessage.js";
import { decryptMessage } from "./decryptMessage.js";
import { obfuscate } from "./obfuscate.js";
import { deobfuscate } from "./deobfuscate.js";
import { updateCharCounter } from "./charCounter.js";

const inputWarningBadge = document.getElementById("inputWarningBadge");
const outputDiv = document.getElementById("output");
const charCounter = document.getElementById("charCounter");

let debounceTimer;

// Main processing function (called on changes)
const processMessage = async function () {
  outputDiv.textContent = "";
  charCounter.textContent = "0 Characters";
  if (inputWarningBadge) inputWarningBadge.classList.add("hidden"); // Reset warning

  if (!isPassphraseSet()) {
    // outputDiv.textContent = "Enter all passphrase parts to begin.";
    return;
  }

  const message = input.value.trim();
  if (!message) return;

  const password = getPassphrase();
  const mode = document.querySelector('input[name="mode"]:checked').value;
  const obfuscation = obfuscationSelect.value;

  try {
    let result = "";

    // ... (imports and other parts same as before)

    if (mode === "encrypt") {
      const encryptedObj = await encryptMessage(message, password);
      const jsonString = JSON.stringify(encryptedObj);

      let toObfuscate = jsonString;

      // base65536 mode does NOT need the base64 wrapper
      if (obfuscation === "base65536") {
        toObfuscate = jsonString; // raw JSON bytes
      }

      // Only skip base64 wrapper for emojis mode
      if (obfuscation !== "emojis") {
        toObfuscate = btoa(jsonString);
      }

      

      result = await obfuscate(toObfuscate, obfuscation);
    } else {
      // decrypt
      const deobfuscated = await deobfuscate(message, obfuscation);

      let jsonString;

      if (obfuscation === "emojis") {
        // For emojis: we expect raw binary → string directly
        jsonString = deobfuscated;
      } else {
        // For all other modes: expect base64
        try {
          jsonString = atob(deobfuscated);
        } catch (e) {
          throw new Error("Deobfuscated result is not valid base64. Wrong obfuscation type or corrupted message?");
        }
      }

      let encryptedObj;
      try {
        encryptedObj = JSON.parse(jsonString);
      } catch (parseErr) {
        console.error("JSON parse failed:", parseErr);
        throw new Error("Invalid format: Decoded content is not valid JSON. Check obfuscation type or message integrity.");
      }

      result = await decryptMessage(encryptedObj, password);
    }

    // Success
    outputDiv.textContent = result;
    updateCharCounter(result || "");
  } catch (err) {
    console.error("Processing failed:", err);
    if (inputWarningBadge) inputWarningBadge.classList.remove("hidden");
    updateCharCounter(""); // Reset counter on error
  }
};

// Debounced trigger
export const triggerProcess = function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(processMessage, 300);
};
