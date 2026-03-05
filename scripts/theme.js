// Global theme management — works on every page
(function () {
  function getPreferredTheme() {
    var saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  var SUN_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var STARS_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></svg>';

  // save=true only when the user explicitly clicks the toggle; automatic
  // calls must NOT write to localStorage so the OS preference stays authoritative.
  function applyTheme(theme, save) {
    document.documentElement.dataset.theme = theme;
    if (save) localStorage.setItem("theme", theme);
    // Keep all theme toggle buttons in sync
    ["nav-theme-btn", "theme-btn"].forEach(function (id) {
      var btn = document.getElementById(id);
      if (btn) {
        btn.innerHTML = theme === "dark" ? SUN_ICON : STARS_ICON;
        btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
      }
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

    // Sticky header scroll effect
    var navbar = document.querySelector(".navbar");
    if (navbar) {
      function onScroll() {
        if (window.scrollY > 10) {
          navbar.classList.add("navbar--scrolled");
        } else {
          navbar.classList.remove("navbar--scrolled");
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll(); // apply on initial load in case page starts scrolled
    }
  });
})();
