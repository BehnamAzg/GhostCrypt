const charCounter = document.getElementById('charCounter');

// Update counter (for output length)
export const updateCharCounter = function (text) {
  const len = text.length;
  charCounter.textContent = `${len} / 160 characters`;
  if (len > 160) {
    charCounter.classList.add("badge-error");
    charCounter.classList.remove("badge-secondary");
  } else {
    charCounter.classList.add("badge-secondary");
    charCounter.classList.remove("badge-error");
  }
}