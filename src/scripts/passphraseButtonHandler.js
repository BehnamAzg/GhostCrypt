const passphraseInputs = document.querySelectorAll("#passphraseInput input");
const passphraseWarningBadge = document.getElementById("passphraseWarningBadge");
const copiedBadge = document.getElementById("passphraseCopiedBadge");
const cantCopyBadge = document.getElementById("passphraseCantCopyBadge");
const incorrectPassphraseBadge = document.getElementById("passphraseNotCorrectBadge");

let effWordsCache = null;

export function setupPassphraseValidation() {
  const inputs = [...passphraseInputs];
  function updateWarning() {
    const hasEmpty = inputs.some((input) => !input.value.trim());
    passphraseWarningBadge.classList.toggle("hidden", !hasEmpty);
  }

  inputs.forEach((input) => {
    input.addEventListener("input", updateWarning);
    input.addEventListener("blur", updateWarning);
  });

  updateWarning();
  return updateWarning;
}

const showErrorBadge = function () {
  incorrectPassphraseBadge.classList.remove("hidden");
  setTimeout(() => {
    incorrectPassphraseBadge.classList.add("hidden");
  }, 2000);
};

export const clearPassphrase = function () {
  passphraseInputs.forEach((input) => {
    if (!input.value) return;
    input.value = "";
  });
  setupPassphraseValidation();
};

export const copyPassphrase = function () {
  const words = [];

  let hasEmpty = false;

  passphraseInputs.forEach((input) => {
    let value = input.value.trim();

    value = value.replace(/\s+/g, "");

    if (value) {
      words.push(value);
    } else {
      hasEmpty = true;
    }
  });

  if (hasEmpty || words.length === 0) {
    cantCopyBadge.classList.remove("hidden");
    setTimeout(() => cantCopyBadge.classList.add("hidden"), 1500);
    return;
  }

  const passphrase = words.join(" ");

  navigator.clipboard.writeText(passphrase).then(
    () => {
      copiedBadge.classList.remove("hidden");
      setTimeout(() => copiedBadge.classList.add("hidden"), 1500);
    },
    () => {
      cantCopyBadge.classList.remove("hidden");
      setTimeout(() => cantCopyBadge.classList.add("hidden"), 1500);
    },
  );
};

export const pastePassphrase = async function () {
  try {
    const pastedText = await navigator.clipboard.readText();

    if (!pastedText?.trim()) {
      showErrorBadge();
      return;
    }

    // Normalize: treat hyphen as space, collapse multiple spaces
    const normalized = pastedText.replace(/-/g, " ").replace(/\s+/g, " ").trim();

    const words = normalized.split(" ");

    // Validation: exactly 5 non-empty words
    if (words.length !== 5 || words.some((word) => word.length === 0)) {
      showErrorBadge();
      return;
    }

    // Valid → fill all fields
    passphraseInputs.forEach((field, i) => {
      field.value = words[i];
      // Trigger input event so your real-time validation / warning badge updates
      field.dispatchEvent(new Event("input", { bubbles: true }));
    });
  } catch (err) {
    console.error("Paste handling failed:", err);
    showErrorBadge();
  }
};

export const setupPassphrasePasteHandling = function () {
  passphraseInputs.forEach((input) => {
    input.addEventListener("paste", async (e) => {
      e.preventDefault(); // Stop normal paste behavior
      pastePassphrase();
    });
  });
};


const getEffWords = async function () {
  if (effWordsCache) return effWordsCache;
  try {
    const response = await fetch('/src/scripts/data/eff-large-wordlist.json');
    if (!response.ok) {
      throw new Error(`Failed to load word list: ${response.status}`);
    }
    effWordsCache = await response.json();
    return effWordsCache;
  } catch (err) {
    console.error("Could not load EFF word list:", err);
    return ["change", "this", "fallback", "passphrase", "please"];
  }
}

export const generatePassphrase = async function () {
  const words = await getEffWords();

  const selectedWords = [];
  const available = [...words]; // copy to avoid modifying original

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * available.length);
    selectedWords.push(available[randomIndex]);
    available.splice(randomIndex, 1); // remove used word (no duplicates)
  }

  // Fill the inputs
  passphraseInputs.forEach((input, index) => {
    input.value = selectedWords[index];
    // Trigger input/change events so your validation & UI updates
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
};
