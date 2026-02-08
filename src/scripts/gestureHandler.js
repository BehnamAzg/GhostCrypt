import { navigateTabs } from "./navigateTabs.js";

let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 60;

const container = document.querySelector("body");

const handleSwipe = function () {
  const diffX = touchStartX - touchEndX;

  if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

  const currentVisible = document.querySelector(".tab-content:not(.hidden)");
  if (!currentVisible) return;

  const currentId = currentVisible.id;

  if (diffX < 0) {
    // Swiped right
    if (currentId === "homeTab") {
      navigateTabs("settingsTab");
    }
  } else {
    // Swiped left
    if (currentId === "settingsTab") {
      navigateTabs("homeTab");
    }
  }
};

export const initGestureHandler = function () {
  if (container) {
    container.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    container.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true },
    );
  } else {
    console.error("Tab container not found for gesture handling");
  }
};
