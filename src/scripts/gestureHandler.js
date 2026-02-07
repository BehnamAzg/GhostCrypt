import { navigateTabs } from "./navigateTabs.js";

let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 60; // minimum pixels to count as swipe

const container = document.querySelector("body");

function handleSwipe() {
  const diffX = touchStartX - touchEndX;

  // Only consider horizontal swipes
  if (Math.abs(diffX) < SWIPE_THRESHOLD) return;

  const currentVisible = document.querySelector(".tab-content:not(.hidden)");
  if (!currentVisible) return;

  const currentId = currentVisible.id;

  if (diffX < 0) {
    // Swiped left → go to next tab
    if (currentId === "homeTab") {
      navigateTabs("settingsTab");
    }
    // if current is settingsTab → do nothing (or loop to homeTab if you want)
  } else {
    // Swiped right → go to previous tab
    if (currentId === "settingsTab") {
      navigateTabs("homeTab");
    }
    // if current is homeTab → do nothing (or loop to settingsTab)
  }
}

export function initGestureHandler() {
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
}
