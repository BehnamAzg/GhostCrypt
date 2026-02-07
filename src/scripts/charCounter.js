const charCounter = document.getElementById('charCounter');

export const updateCharCounter = function (text) {
  const length = text ? String(text).length : 0;
  charCounter.textContent = `${length} Characters`;
}