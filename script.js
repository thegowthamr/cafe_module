/* Shared site behavior (pure JS) */

function setCurrentYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function setActiveNavLink() {
  const links = document.querySelectorAll('a.nav-link[href]');
  const current = window.location.pathname.split("/").pop() || "index.html";
  for (const a of links) {
    const href = a.getAttribute("href");
    if (!href) continue;
    if (href === current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const panel = document.querySelector(".nav-panel");
  if (!toggle || !panel) return;

  toggle.addEventListener("click", () => {
    const open = panel.getAttribute("data-open") !== "true";
    panel.setAttribute("data-open", open ? "true" : "false");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close the panel when a link is clicked (mobile UX)
  panel.querySelectorAll("a.nav-link").forEach((a) => {
    a.addEventListener("click", () => {
      panel.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initMenuFilters() {
  const pills = document.querySelectorAll('[data-filter="pill"]');
  const items = document.querySelectorAll('[data-menu-item="true"]');
  if (!pills.length || !items.length) return;

  const setVisible = (category) => {
    for (const item of items) {
      const itemCategory = item.getAttribute("data-category");
      const isMatch = category === "all" || itemCategory === category;
      item.style.display = isMatch ? "" : "none";
    }
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.setAttribute("aria-pressed", "false"));
      pill.setAttribute("aria-pressed", "true");
      setVisible(pill.getAttribute("data-value") || "all");
    });
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const alert = document.getElementById("contact-alert");
  if (!form || !alert) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = (document.getElementById("name")?.value || "").trim();
    const email = (document.getElementById("email")?.value || "").trim();
    const message = (document.getElementById("message")?.value || "").trim();

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      alert.textContent = "Please fill in name, email, and message.";
      alert.setAttribute("aria-live", "polite");
      alert.setAttribute("data-kind", "error");
      return;
    }
    if (!emailOk) {
      alert.textContent = "Please enter a valid email address.";
      alert.setAttribute("data-kind", "error");
      return;
    }

    alert.textContent = "Thanks! Your message was prepared successfully. (No backend needed.)";
    alert.setAttribute("data-kind", "success");
    form.reset();
  });
}

function init() {
  setCurrentYear();
  setActiveNavLink();
  initMobileNav();
  initMenuFilters();
  initContactForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

