// Berkshire Leisure League — share button behavior.
// Any element with [data-share] triggers a share: uses the native device share
// sheet (Web Share API) where available, falls back to copying the link.
(function () {
  function showToast(message) {
    var toast = document.createElement("div");
    toast.className = "share-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(function () {
      toast.classList.add("show");
    });
    setTimeout(function () {
      toast.classList.remove("show");
      setTimeout(function () {
        toast.remove();
      }, 300);
    }, 1800);
  }

  function copyFallback(url) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(function () {
          showToast("Link copied!");
        })
        .catch(function () {
          window.prompt("Copy this link:", url);
        });
    } else {
      window.prompt("Copy this link:", url);
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-share]");
    if (!btn) return;
    e.preventDefault();

    var url = btn.getAttribute("data-share-url") || window.location.href;
    var title = btn.getAttribute("data-share-title") || document.title;
    var text = btn.getAttribute("data-share-text") || "";

    if (navigator.share) {
      navigator.share({ title: title, text: text, url: url }).catch(function () {
        /* user cancelled — no-op */
      });
    } else {
      copyFallback(url);
    }
  });
})();
