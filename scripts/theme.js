// Global theme management — works on every page
(function () {
  function getPreferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // save=true only when the user explicitly clicks the toggle; automatic
  // calls must NOT write to localStorage so the OS preference stays authoritative.
  function applyTheme(theme, save) {
    document.documentElement.dataset.theme = theme;
    if (save) localStorage.setItem("theme", theme);
    // Keep all theme toggle buttons in sync
    ["nav-theme-btn", "theme-btn"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }

  // Apply immediately (also handled by inline script, this is a safety net)
  applyTheme(getPreferredTheme(), false);

  // React to OS preference changes whenever the user hasn't overridden manually
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light", false);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreferredTheme(), false);

    var navBtn = document.getElementById("nav-theme-btn");
    if (navBtn) {
      navBtn.addEventListener("click", function () {
        var current = document.documentElement.dataset.theme;
        applyTheme(current === "dark" ? "light" : "dark", true);
      });
    }
  });
})();
