/**
 * Portfolio — accessible interactions
 * Mobile navigation, form validation, keyboard support
 */

(function () {
  "use strict";

  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  /* Mobile navigation */
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      mainNav.classList.toggle("is-open", !expanded);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("is-open");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mainNav.classList.contains("is-open")) {
        navToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("is-open");
        navToggle.focus();
      }
    });
  }

  /* Contact form validation */
  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("name-error"),
        validate: function (value) {
          if (!value.trim()) return "Please enter your name.";
          if (value.trim().length < 2) return "Name must be at least 2 characters.";
          return "";
        },
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("email-error"),
        validate: function (value) {
          if (!value.trim()) return "Please enter your email address.";
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!pattern.test(value.trim())) return "Please enter a valid email address.";
          return "";
        },
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("message-error"),
        validate: function (value) {
          if (!value.trim()) return "Please enter your message.";
          if (value.trim().length < 10) return "Message must be at least 10 characters.";
          return "";
        },
      },
    };

    function setFieldError(field, message) {
      field.input.setAttribute("aria-invalid", message ? "true" : "false");
      field.error.textContent = message;
    }

    function validateField(key) {
      const field = fields[key];
      const message = field.validate(field.input.value);
      setFieldError(field, message);
      return !message;
    }

    Object.keys(fields).forEach(function (key) {
      const field = fields[key];
      field.input.addEventListener("blur", function () {
        validateField(key);
      });
      field.input.addEventListener("input", function () {
        if (field.input.getAttribute("aria-invalid") === "true") {
          validateField(key);
        }
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      let isValid = true;
      Object.keys(fields).forEach(function (key) {
        if (!validateField(key)) isValid = false;
      });

      if (!isValid) {
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.focus();
      }

      contactForm.reset();
      Object.keys(fields).forEach(function (key) {
        setFieldError(fields[key], "");
      });

      setTimeout(function () {
        if (formSuccess) formSuccess.hidden = true;
      }, 8000);
    });
  }

  /* Footer year */
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
