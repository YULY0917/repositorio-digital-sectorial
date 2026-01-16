(function () {
  const body = document.body;

  // ===== MENÚ MÓVIL =====
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");

  function openMenu(){ body.classList.add("menu-open"); }
  function closeMenu(){ body.classList.remove("menu-open"); }

  if (burger) {
    burger.addEventListener("click", () => {
      body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener("click", closeMenu);

  // ===== ACTIVO EN MENÚ =====
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === current) a.classList.add("active");
  });

  // ===== BUSCADOR GLOBAL (robusto) =====
  const input = document.getElementById("search") || document.querySelector('input[type="search"]');
  const clearBtn =
    document.querySelector(".search-clear") ||
    document.querySelector(".clear-btn");

  // Soporta #searchResults o #search-results
  const resultsBox =
    document.getElementById("searchResults") ||
    document.getElementById("search-results") ||
    document.querySelector(".search-results");

  // Detecta carpeta /paginas/ para armar rutas correctas
  const inPaginas = location.pathname.includes("/paginas/");
  const PAGE_PREFIX = inPaginas ? "" : "paginas/";
  const DOC_PREFIX = inPaginas ? "../docs/" : "docs/";

  const DOCS = [
    // Páginas
    { title:"Inicio", section:"Página", url: (inPaginas ? "../index.html" : "index.html"), keywords:"inicio home" },
    { title:"Convenio de Adhesión", section:"Página", url: PAGE_PREFIX + "convenio.html", keywords:"convenio adhesion" },
    { title:"Datos disponibles", section:"Página", url: PAGE_PREFIX + "datos-disponibles.html", keywords:"datos disponibles sets dt ips suseso sp fase 1" },
    { title:"Documentos Nodo", section:"Página", url: PAGE_PREFIX + "documentos-nodo.html", keywords:"documentos nodo manuales procedimientos soporte" },
    { title:"Anexos Técnicos", section:"Página", url: PAGE_PREFIX + "anexos-tecnicos.html", keywords:"anexos tecnicos anexo 1 anexo 2 anexo 3 anexo 4" },
    { title:"Anexos de Provisión de Datos", section:"Página", url: PAGE_PREFIX + "anexos-provision-datos.html", keywords:"provision datos anexo 1 anexo 2 sp dt ips suseso" },
    { title:"Anexos de Consumo de Datos", section:"Página", url: PAGE_PREFIX + "anexos-consumo-datos.html", keywords:"consumo datos anexo 3 anexo 4 sp dt ips suseso" },
    { title:"Reglas de Uso", section:"Página", url: PAGE_PREFIX + "reglas-uso.html", keywords:"reglas uso" },

    // PDFs (ajusta nombres si tus PDFs se llaman distinto)
    { title:"Convenio Sectorial Nodo Laboral y Previsional", section:"PDF", url: DOC_PREFIX + "Convenio-Sectorial-Nodo.pdf", keywords:"convenio sectorial nodo" },
    { title:"Reglas de Uso del Repositorio Digital Sectorial", section:"PDF", url: DOC_PREFIX + "Reglas_de_uso.pdf", keywords:"reglas uso repositorio" },
    { title:"Sets de datos disponibles (4 OAEs) – Fase 1", section:"PDF", url: DOC_PREFIX + "Sets_datos_disponibles_4_OAEs_Fase1.pdf", keywords:"sets datos disponibles dt ips suseso sp fase 1" }
  ];

  function norm(s){
    return (s||"")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim();
  }

  function hideResults(){
    if (!resultsBox) return;
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
    resultsBox.classList.remove("is-open");
  }

  function showResults(html){
    if (!resultsBox) return;
    resultsBox.innerHTML = html;
    resultsBox.style.display = "block";
    resultsBox.classList.add("is-open");
  }

  function render(qRaw){
    if (!input || !resultsBox) return;

    const q = norm(qRaw);
    if (clearBtn) clearBtn.style.display = q ? "inline-flex" : "none";
    if (!q){ hideResults(); return; }

    const hits = DOCS.filter(d => norm(d.title + " " + d.section + " " + d.keywords).includes(q));
    const head = `<div class="sr-title">Resultados para <b>${qRaw}</b> (${hits.length})</div>`;

    const rows = hits.slice(0, 15).map(it => {
      const isPdf = it.url.toLowerCase().endsWith(".pdf");
      const target = isPdf ? ` target="_blank" rel="noopener"` : "";
      return `<a href="${it.url}"${target}><b>${it.title}</b><br><small>${it.section}</small></a>`;
    }).join("");

    showResults(head + (rows || `<div class="sr-title">No se encontraron coincidencias.</div>`));
  }

  if (input) {
    input.addEventListener("input", () => render(input.value));
    input.addEventListener("focus", () => render(input.value));
  }

  if (clearBtn && input) {
    clearBtn.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      hideResults();
      input.focus();
    });
  }

  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".searchwrap");
    if (!inside) hideResults();
  });
})();
