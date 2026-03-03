// Global theme management — works on every page
(function () {
  function getPreferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    // Keep all theme toggle buttons in sync
    ["nav-theme-btn", "theme-btn"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) btn.textContent = theme === "dark" ? "Light" : "Dark";
    });
  }

  // Apply immediately (also handled by inline script, this is a safety net)
  applyTheme(getPreferredTheme());

  // React to OS preference changes (only when user hasn't overridden manually)
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(getPreferredTheme());

    var navBtn = document.getElementById("nav-theme-btn");
    if (navBtn) {
      navBtn.addEventListener("click", function () {
        var current = document.documentElement.dataset.theme;
        applyTheme(current === "dark" ? "light" : "dark");
      });
    }
  });
})();
