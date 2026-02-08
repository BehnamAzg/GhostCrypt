const passphraseInputs = document.querySelectorAll("#passphraseInput input");

// get full passphrase
export const getPassphrase = function () {
  const inputs = [...passphraseInputs];
  return inputs.map((input) => input.value.trim()).join("");
};

// check if passphrase is complete
export const isPassphraseSet = function () {
  const inputs = [...passphraseInputs];
  return inputs.every((input) => input.value.trim() !== "");
};
