(function () {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const burger = document.querySelector(".burger");
  const search = document.querySelector("#search");

  // ===== 1) Menú activo =====
  const current = location.pathname.replace(/\/+$/, "");
  const links = Array.from(document.querySelectorAll(".menu a"));

  links.forEach(a => {
    const href = a.getAttribute("href");
    if (!href) return;

    // Normaliza para comparar rutas
    const url = new URL(href, location.href);
    const path = url.pathname.replace(/\/+$/, "");

    if (path === current) a.classList.add("active");
  });

  // ===== 2) Buscador (filtra links del menú) =====
  function normalize(s){
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"");
  }

  if (search) {
    search.addEventListener("input", () => {
      const q = normalize(search.value.trim());
      links.forEach(a => {
        const text = normalize(a.textContent);
        a.style.display = (!q || text.includes(q)) ? "" : "none";
      });
    });
  }

  // ===== 3) Menú móvil =====
  function openMenu() {
    document.body.classList.add("menu-open");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
  }

  if (burger) burger.addEventListener("click", () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener("click", closeMenu);

  // Cierra menú al hacer click en un link (móvil)
  links.forEach(a => a.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 980px)").matches) closeMenu();
  }));
})();
