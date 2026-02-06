// const passInputs = Array.from({length: 5}, (_, i) => document.getElementById(`pass${i+1}`));

const passphraseInputs = document.querySelectorAll("#passphraseInput input");

// Function to get full passphrase
export const getPassphrase = function () {
  const inputs = [...passphraseInputs];
  return inputs.map(input => input.value.trim()).join('');
}

// Function to check if passphrase is complete
export const isPassphraseSet = function () {
  const inputs = [...passphraseInputs];
  return inputs.every(input => input.value.trim() !== '');
}