const outputField = document.getElementById("output");
const copiedBadge = document.getElementById("outputCopiedBadge");

export const copyOutput = function () {
  if (!outputField.value) return;
  navigator.clipboard.writeText(outputField.value);
  copiedBadge.classList.remove("hidden");
  setTimeout(() => {
    copiedBadge.classList.add("hidden");
  }, 1500);
};

export const shareOutput = function () {
  if (!outputField.value?.trim()) return;

  const shareData = {
    text: outputField.value,
  };

  // Try native share first (mobile + some desktop environments)
  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      // If native share fails or is cancelled → silently fall back to copy
      navigator.clipboard.writeText(output).catch(() => {
        // Silent failure – no feedback
      });
    });
  } else {
    // No native share → just copy
    navigator.clipboard.writeText(output).catch(() => {
      // Silent failure
    });
  }
};
