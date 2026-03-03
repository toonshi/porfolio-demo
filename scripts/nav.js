// Mobile navigation toggle
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("nav-toggle");
    var navLinks = document.getElementById("nav-links");

    if (!toggle || !navLinks) return;

    toggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  });
})();
