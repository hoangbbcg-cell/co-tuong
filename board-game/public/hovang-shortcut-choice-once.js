(function () {
  "use strict";

  var KEY = "hovang.shortcut.invite.decision.v1";

  function chosenBefore() {
    try {
      return localStorage.getItem(KEY) === "chosen";
    } catch (_) {
      return false;
    }
  }

  function saveChoice() {
    try {
      localStorage.setItem(KEY, "chosen");
    } catch (_) {
      // Storage may be blocked. Never interrupt the game.
    }
  }

  function labelOf(button) {
    return (button.textContent || "")
      .normalize("NFC")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findOffer() {
    var buttons = Array.from(
      document.querySelectorAll('button, [role="button"]')
    );

    var laterButtons = buttons.filter(function (button) {
      return labelOf(button) === "Để sau";
    });

    var allowButtons = buttons.filter(function (button) {
      return labelOf(button) === "Cho phép";
    });

    for (var i = 0; i < laterButtons.length; i++) {
      var later = laterButtons[i];
      var parent = later.parentElement;

      while (parent && parent !== document.body) {
        var text = (parent.textContent || "")
          .normalize("NFC")
          .replace(/\s+/g, " ")
          .trim();

        var hasAllow = allowButtons.some(function (button) {
          return parent.contains(button);
        });

        var isHovangInvite =
          /HOVANG/i.test(text) &&
          /(màn hình chính|lối tắt|cài đặt)/i.test(text);

        if (
          hasAllow &&
          isHovangInvite &&
          text.length <= 800
        ) {
          return {
            element: parent,
            later: later,
            allow: allowButtons.find(function (button) {
              return parent.contains(button);
            })
          };
        }

        parent = parent.parentElement;
      }
    }

    return null;
  }

  // Remember clicks only inside the HOVANG shortcut invitation.
  document.addEventListener("click", function (event) {
    var button = event.target.closest(
      'button, [role="button"]'
    );

    if (!button || button.disabled) return;

    var label = labelOf(button);
    if (label !== "Để sau" && label !== "Cho phép") return;

    var offer = findOffer();

    if (
      offer &&
      (button === offer.later || button === offer.allow)
    ) {
      saveChoice();
    }
  }, true);

  // Only auto-dismiss on subsequent page loads.
  // This avoids interfering with Chrome's native prompt
  // when the user presses "Cho phép" for the first time.
  if (!chosenBefore()) return;

  var handled = new WeakSet();

  function dismissOldInvitation() {
    var offer = findOffer();

    if (!offer || handled.has(offer.later)) return;

    handled.add(offer.later);

    if (!offer.later.disabled) {
      offer.later.click();
    }
  }

  var observer = new MutationObserver(
    dismissOldInvitation
  );

  function start() {
    if (!document.documentElement) return;

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    dismissOldInvitation();
  }

  if (document.documentElement) {
    start();
  } else {
    document.addEventListener("DOMContentLoaded", start, {
      once: true
    });
  }
})();