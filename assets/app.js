((function () {
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const search = document.getElementById("search");

  function openMenu() { document.body.classList.add("menu-open"); }
  function closeMenu(){ document.body.classList.remove("menu-open"); }

  if (burger) burger.addEventListener("click", () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener("click", closeMenu);

  // Marcar link activo según URL
  function markActiveLinks() {
    const file = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (href === file) a.classList.add("active");
    });
  }
  markActiveLinks();

  // Filtro simple por texto (si tienes elementos con data-search)
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      document.querySelectorAll("[data-search]").forEach(el => {
        const hay = (el.getAttribute("data-search") || "").toLowerCase();
        el.style.display = hay.includes(q) ? "" : "none";
      });
    });
  }
})();
