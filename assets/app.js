(function () {
  // ========= Helpers =========
  const norm = (s) => (s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // ========= Asegurar overlay =========
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  }

  // ========= Asegurar burger =========
  let burger = document.querySelector(".burger");
  const topbar = document.querySelector(".topbar");

  if (!burger && topbar) {
    burger = document.createElement("button");
    burger.className = "burger";
    burger.type = "button";
    burger.setAttribute("aria-label", "Abrir menú");
    burger.textContent = "☰";
    topbar.insertBefore(burger, topbar.firstChild);
  }

  function openMenu() { document.body.classList.add("menu-open"); }
  function closeMenu(){ document.body.classList.remove("menu-open"); }

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener("click", closeMenu);

  // ========= Marcar link activo =========
  (function markActiveLinks() {
    const path = location.pathname.split("/").pop(); // ej: reglas-uso.html
    document.querySelectorAll(".menu a").forEach(a => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (href && href === path) a.classList.add("active");
      if (!path && href === "index.html") a.classList.add("active");
    });
  })();

  // ========= Buscador Global =========
  // Soporta:
  // - input con id="search"
  // - o cualquier input dentro de .searchwrap
  const searchInput =
    document.getElementById("search") ||
    document.querySelector(".searchwrap input[type='search'], .searchwrap input");

  const searchWrap = document.querySelector(".searchwrap");

  if (!searchInput || !searchWrap) return;

  // Crear panel resultados si no existe
  let panel = document.querySelector(".search-results");
  if (!panel) {
    panel = document.createElement("div");
    panel.className = "search-results";
    panel.innerHTML = `
      <div class="sr-head">
        <strong>Resultados</strong>
        <button type="button" class="sr-close" aria-label="Cerrar">×</button>
      </div>
      <div class="sr-body"></div>
    `;
    searchWrap.appendChild(panel);
  }
  const body = panel.querySelector(".sr-body");
  const closeBtn = panel.querySelector(".sr-close");

  function panelOpen() { panel.classList.add("open"); }
  function panelClose() {
    panel.classList.remove("open");
    body.innerHTML = "";
  }

  if (closeBtn) closeBtn.addEventListener("click", () => {
    searchInput.value = "";
    panelClose();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") panelClose();
  });

  // ========= Índice global de documentos (AJÚSTALO SI CAMBIAS NOMBRES) =========
  // Cada item: title (lo que se muestra), page (dónde está listado), file (ruta PDF), tags (para buscar)
  const DOCS = [
    // Convenio
    {
      title: "Convenio Sectorial Nodo Laboral y Previsional",
      page: "paginas/convenio.html",
      file: "docs/Convenio-Sectorial-Nodo.pdf",
      tags: "convenio adhesion nodo laboral previsional"
    },

    // Reglas de uso
    {
      title: "Reglas de Uso del Repositorio Digital Sectorial",
      page: "paginas/reglas-uso.html",
      file: "docs/Reglas_de_uso.pdf",
      tags: "reglas uso repositorio"
    },

    // Provisión (Anexo 1-2)
    { title: "SP - Anexo 1 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/SP_Anexo1.pdf", tags: "sp superintendencia pensiones anexo 1 provision" },
    { title: "SP - Anexo 2 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/SP_Anexo2.pdf", tags: "sp superintendencia pensiones anexo 2 provision" },

    { title: "DT - Anexo 1 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/DT_Anexo1.pdf", tags: "dt direccion trabajo anexo 1 provision" },
    { title: "DT - Anexo 2 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/DT_Anexo2.pdf", tags: "dt direccion trabajo anexo 2 provision" },

    { title: "SUSESO - Anexo 1 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/SUSESO_Anexo1.pdf", tags: "suseso seguridad social anexo 1 provision" },
    { title: "SUSESO - Anexo 2 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/SUSESO_Anexo2.pdf", tags: "suseso seguridad social anexo 2 provision" },

    { title: "IPS - Anexo 1 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/IPS_Anexo1.pdf", tags: "ips instituto prevision social anexo 1 provision" },
    { title: "IPS - Anexo 2 (Provisión de Datos)", page: "paginas/anexos-provision-datos.html", file: "docs/IPS_Anexo2.pdf", tags: "ips instituto prevision social anexo 2 provision" },

    // Consumo (Anexo 3-4)
    { title: "SP - Anexo 3 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/SP_Anexo3.pdf", tags: "sp superintendencia pensiones anexo 3 consumo" },
    { title: "SP - Anexo 4 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/SP_Anexo4.pdf", tags: "sp superintendencia pensiones anexo 4 consumo" },

    { title: "DT - Anexo 3 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/DT_Anexo3.pdf", tags: "dt direccion trabajo anexo 3 consumo" },
    { title: "DT - Anexo 4 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/DT_Anexo4.pdf", tags: "dt direccion trabajo anexo 4 consumo" },

    { title: "SUSESO - Anexo 3 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/SUSESO_Anexo3.pdf", tags: "suseso seguridad social anexo 3 consumo" },
    { title: "SUSESO - Anexo 4 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/SUSESO_Anexo4.pdf", tags: "suseso seguridad social anexo 4 consumo" },

    { title: "IPS - Anexo 3 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/IPS_Anexo3.pdf", tags: "ips instituto prevision social anexo 3 consumo" },
    { title: "IPS - Anexo 4 (Consumo de Datos)", page: "paginas/anexos-consumo-datos.html", file: "docs/IPS_Anexo4.pdf", tags: "ips instituto prevision social anexo 4 consumo" },
  ];

  // ========= Render resultados =========
  function renderResults(q) {
    body.innerHTML = "";

    if (!q) { panelClose(); return; }

    const nq = norm(q);

    const hits = DOCS
      .map(d => ({ ...d, _hay: norm(d.title + " " + d.tags) }))
      .filter(d => d._hay.includes(nq))
      .slice(0, 30);

    if (!hits.length) {
      body.innerHTML = `<div class="sr-empty">Sin resultados para “${q}”.</div>`;
      panelOpen();
      return;
    }

    const frag = document.createDocumentFragment();

    hits.forEach(d => {
      const a = document.createElement("a");
      a.className = "sr-item";
      // Link a la página donde está el documento (mantienes navegación por menú)
      a.href = d.page;
      a.innerHTML = `
        <div class="sr-title">${d.title}</div>
        <div class="sr-meta">${d.page.replace("paginas/","")}</div>
      `;
      frag.appendChild(a);
    });

    body.appendChild(frag);
    panelOpen();
  }

  // ========= Eventos =========
  searchInput.addEventListener("input", () => {
    renderResults(searchInput.value);
  });

  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) renderResults(searchInput.value);
  });

  // Cerrar si clic fuera del buscador
  document.addEventListener("click", (e) => {
    const within = searchWrap.contains(e.target);
    if (!within) panelClose();
  });

})();
