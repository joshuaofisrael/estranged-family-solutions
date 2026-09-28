(function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    };

    toggle.addEventListener("click", function () {
      setOpen(!nav.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
  }

  var form = document.getElementById("contact-form");
  if (!form) return;

  var config = window.EFS_CONFIG || {};
  var status = document.getElementById("form-status");
  var successPanel = document.getElementById("form-success");
  var submitBtn = form.querySelector("[type='submit']");
  var messageField = document.getElementById("message");
  var endpoint = String(config.formsubmitEndpoint || "").trim();
  var email = String(config.practiceEmail || "").trim();
  var pathLabels = {
    repair: "Repair & reunite",
    distance: "Safe distance & coping",
    unsure: "Not sure yet"
  };

  if (messageField) {
    messageField.addEventListener("input", function () {
      messageField.setCustomValidity("");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (messageField) {
      messageField.setCustomValidity(
        messageField.value.trim() ? "" : "Please write a short message."
      );
    }
    if (!form.reportValidity()) return;

    var honeypot = form.querySelector("[name='_honey']");
    if (honeypot && honeypot.value) {
      setStatus("The message could not be sent. Please try again.", false);
      return;
    }

    var data = new FormData(form);
    var payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      path: pathLabels[String(data.get("path") || "").trim()] || String(data.get("path") || "").trim(),
      message: String(data.get("message") || "").trim(),
      _subject: "New inquiry — Estranged Family Solutions",
      _template: "table",
      _captcha: "false",
      _honey: ""
    };

    if (!endpoint) {
      setStatus("The form is not connected yet.", false);
      addMailLink(payload);
      return;
    }

    submitBtn.disabled = true;
    form.setAttribute("aria-busy", "true");
    setStatus("Sending your message…", true);

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        return response.json().then(
          function (body) {
            return { ok: response.ok, body: body || {} };
          },
          function () {
            return { ok: response.ok, body: {} };
          }
        );
      })
      .then(function (result) {
        var body = result.body || {};
        var flag = String(body.success == null ? "" : body.success).toLowerCase();
        var note = String(body.message || "");
        if (!result.ok || flag === "false") {
          var error = new Error(note || "The form service did not accept the message.");
          error.detail = note;
          throw error;
        }
        form.hidden = true;
        if (successPanel) successPanel.hidden = false;
        setStatus("", true);
        if (successPanel) {
          var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          successPanel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
        }
      })
      .catch(function (error) {
        var detail = String((error && error.detail) || (error && error.message) || "");
        var activating = /activat/i.test(detail);
        setStatus(
          activating
            ? "The form inbox still needs a one-time confirmation from the practice. Email the practice directly in the meantime."
            : "The message could not be sent. You can email the practice directly.",
          false
        );
        addMailLink(payload);
      })
      .finally(function () {
        submitBtn.disabled = false;
        form.removeAttribute("aria-busy");
      });
  });

  function setStatus(text, ok) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("is-ok", Boolean(text) && ok);
    status.classList.toggle("is-error", Boolean(text) && !ok);
    if (!text) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    status.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }

  function addMailLink(payload) {
    if (!status || !email) return;
    var body = [
      "Name: " + payload.name,
      "Email: " + payload.email,
      "Phone: " + (payload.phone || "(not provided)"),
      "Path: " + payload.path,
      "",
      payload.message
    ].join("\n");
    var link = document.createElement("a");
    link.href =
      "mailto:" +
      email +
      "?subject=" +
      encodeURIComponent("Inquiry for Estranged Family Solutions") +
      "&body=" +
      encodeURIComponent(body);
    link.textContent = email;
    status.append(" ");
    status.append(link);
  }
})();
