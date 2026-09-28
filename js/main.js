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
  var preview = document.getElementById("message-preview");
  var submitBtn = form.querySelector("[type='submit']");
  var messageField = document.getElementById("message");
  var endpoint = String(config.formspreeEndpoint || "").trim().replace(/\/$/, "");
  var email = String(config.practiceEmail || "").trim();
  var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  var formspreeOk = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint);
  var pathLabels = {
    repair: "Repair & reunite",
    distance: "Safe distance & coping",
    unsure: "Not sure yet"
  };

  if (formspreeOk) {
    submitBtn.textContent = "Send message";
  } else if (emailOk) {
    submitBtn.textContent = "Open email app";
    var direct = document.getElementById("direct-email");
    if (direct) {
      direct.hidden = false;
      direct.textContent = "";
      direct.append("Or email the practice directly at ");
      var link = document.createElement("a");
      link.href = "mailto:" + email;
      link.textContent = email;
      direct.append(link, ".");
    }
  }

  if (messageField) {
    messageField.addEventListener("input", function () {
      messageField.setCustomValidity("");
    });
  }

  var copyBtn = document.getElementById("copy-message");
  if (copyBtn && preview) {
    copyBtn.addEventListener("click", function () {
      var pre = preview.querySelector("pre");
      var value = pre ? pre.textContent : "";
      var done = function () {
        copyBtn.textContent = "Copied";
        window.setTimeout(function () {
          copyBtn.textContent = "Copy message";
        }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(done).catch(function () {
          selectPreview(pre);
        });
      } else {
        selectPreview(pre);
      }
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

    var honeypot = form.querySelector("[name='fax_number']");
    if (honeypot && honeypot.value) {
      setStatus("The message could not be prepared. Please try again, or contact the practice in West Bloomfield.", false);
      return;
    }

    var data = new FormData(form);
    var payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      path: String(data.get("path") || "").trim(),
      message: String(data.get("message") || "").trim()
    };
    var text = [
      "Name: " + payload.name,
      "Email: " + payload.email,
      "Phone: " + (payload.phone || "(not provided)"),
      "Path: " + (pathLabels[payload.path] || payload.path),
      "",
      payload.message
    ].join("\n");

    if (formspreeOk) {
      submitBtn.disabled = true;
      setStatus("Sending your message…", true);
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          path: pathLabels[payload.path] || payload.path,
          message: payload.message
        })
      })
        .then(function (response) {
          if (!response.ok) throw new Error("declined");
          form.reset();
          if (preview) preview.hidden = true;
          setStatus(
            "Your message was sent. The practice will reply if this inquiry is a fit. If you are in crisis, call 911 or 988 — do not wait for an email.",
            true
          );
        })
        .catch(function () {
          setStatus(
            "The form service did not accept the message. Copy it below and send it another way.",
            false
          );
          showPreview(text, emailOk ? email : "");
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
      return;
    }

    showPreview(text, emailOk ? email : "");

    if (emailOk && text.length < 1500) {
      var href =
        "mailto:" +
        email +
        "?subject=" +
        encodeURIComponent("Inquiry for Estranged Family Solutions") +
        "&body=" +
        encodeURIComponent(text);
      setStatus(
        "Your email app should open with this message addressed to the practice. If nothing opens, copy the message below and send it to " +
          email +
          ".",
        true
      );
      window.location.href = href;
      return;
    }

    if (emailOk) {
      setStatus(
        "This message is long for an email link. Copy it below and send it to " + email + ".",
        true
      );
      return;
    }

    setStatus(
      "The practice inbox is not connected on this website yet. Your message is shown below so you can copy it. The practice is in West Bloomfield, Michigan.",
      false
    );
  });

  function setStatus(text, ok) {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("is-ok", ok);
    status.classList.toggle("is-error", !ok);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    status.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }

  function showPreview(text, address) {
    if (!preview) return;
    preview.hidden = false;
    var pre = preview.querySelector("pre");
    if (pre) pre.textContent = text;
    var line = preview.querySelector("[data-address]");
    if (line) {
      line.hidden = !address;
      line.textContent = address ? "Practice email: " + address : "";
    }
  }

  function selectPreview(pre) {
    if (!pre) return;
    var range = document.createRange();
    range.selectNodeContents(pre);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
})();
