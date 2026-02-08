let currentLang = localStorage.getItem("lang") || "en";
let translations = {};

export const loadLanguage = async function (lang) {
  if (lang === currentLang && Object.keys(translations).length > 0) {
    return;
  }

  try {
    const response = await fetch(`/src/locales/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load ${lang}`);
    translations = await response.json();
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang === "fa" ? "fa" : "en";
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";

    if (lang === "fa") {
      document.documentElement.classList.add("lang-fa");
    } else {
      document.documentElement.classList.remove("lang-fa");
    }
  } catch (err) {
    console.error("Language loading failed:", err);
    translations = (await fetch("/src/locales/en.json")).json();
  }
};

export const t = function (key, params = {}) {
  let text = translations[key] || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(`{${k}}`, v);
  }
  return text;
};

export const getCurrentLang = function () {
  return currentLang;
};

export const updateAllTexts = function () {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = t(key);
  });

  // placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = t(key);
  });

  // tooltips
  document.querySelectorAll("[data-i18n-tip]").forEach((el) => {
    const key = el.dataset.i18nTip;
    if (!key) return;

    const translated = t(key);
    if (translated !== key) {
      el.dataset.tip = translated;
    }
  });

  // aria labels
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key) {
      const translated = t(key);
      if (translated !== key) {
        el.setAttribute("aria-label", translated);
      }
    }
  });
};

export const setupLanguageSelector = function () {
  document.getElementById("languageSelect").value = getCurrentLang();
  document.getElementById("languageSelect").addEventListener("change", async (e) => {
    await loadLanguage(e.target.value);
    updateAllTexts();
  });
};
