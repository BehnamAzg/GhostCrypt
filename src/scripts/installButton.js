const installEl = document.getElementById("installEl");
let deferredPrompt = null;

export const checkInstallation = function () {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installEl.classList.remove("hidden");
    installEl.classList.add("flex");
  });

  window.addEventListener("load", () => {
    if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true || document.referrer.includes("android-app://")) {
      installEl.classList.remove("flex");
      installEl.classList.add("hidden");
    }
  });
};

export const installApp = async function () {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") {
    console.log("PWA installation accepted");
    installEl.classList.remove("flex");
    installEl.classList.add("hidden");
  } else {
    console.log("PWA installation dismissed");
  }
  deferredPrompt = null;
};
