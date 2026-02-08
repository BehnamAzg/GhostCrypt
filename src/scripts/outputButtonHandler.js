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
    title: "Encrypted Message",
    text: outputField.value,
    url: window.location.href
  };

  // native share
  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      navigator.clipboard.writeText(outputField.value).catch(() => {});
    });
  } else {
    navigator.clipboard.writeText(outputField.value).catch(() => {});
  }
};
