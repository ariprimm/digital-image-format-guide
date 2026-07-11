document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleImageBtn");
  const frame = document.getElementById("viewerFrame");

  if (!toggleBtn || !frame) return; // halaman Home tidak memiliki viewer, aman diabaikan

  const LABEL_SHOW = "Tampilkan Gambar";
  const LABEL_HIDE = "Sembunyikan Gambar";

  toggleBtn.addEventListener("click", () => {
    const isRevealed = frame.classList.toggle("revealed");

    if (isRevealed) {
      toggleBtn.textContent = LABEL_HIDE;
      toggleBtn.classList.add("is-shown");
      toggleBtn.setAttribute("aria-pressed", "true");
    } else {
      toggleBtn.textContent = LABEL_SHOW;
      toggleBtn.classList.remove("is-shown");
      toggleBtn.setAttribute("aria-pressed", "false");
    }
  });
});

(function highlightActiveNav() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
})();