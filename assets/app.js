(function () {
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");
  const search = document.getElementById("search");

  function openMenu() { document.body.classList.add("menu-open"); }
  function closeMenu(){ document.body.classList.remove("menu-open"); }

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }

  if (overlay) overlay.addEventListener("click", closeMenu);

  // Cerrar menú al hacer click en un link (solo móvil)
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".menu a");
    if (!a) return;
    if (window.matchMedia("(max-width: 900px)").matches) closeMenu();
  });

  // Marcar activo según URL
  (function markActiveLinks() {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".menu a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (href === path) a.classList.add("active");
    });
  })();

  // Buscador filtra links
  (function setupSearch(){
    if (!search) return;
    const links = Array.from(document.querySelectorAll(".menu a"));
    const norm = (s) => (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"");

    search.addEventListener("input", () => {
      const q = norm(search.value.trim());
      links.forEach(a => {
        const text = norm(a.textContent);
        const show = !q || text.includes(q);
        a.style.display = show ? "" : "none";
      });
    });
  })();
})();
