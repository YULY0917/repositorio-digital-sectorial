(function () {
  const body = document.body;
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");

  const input = document.getElementById("search");
  const clearBtn = document.querySelector(".search-clear");
  const resultsBox = document.getElementById("searchResults");

  // ===== MENÚ MÓVIL (coincide con style.css: body.menu-open) =====
  function openMenu() { body.classList.add("menu-open"); }
  function closeMenu() { body.classList.remove("menu-open"); }

  if (burger) {
    burger.addEventListener("click", () => {
      body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }
  if (overlay) overlay.addEventListener("click", closeMenu);

  // ===== activar link del menú =====
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === current) a.classList.add("active");
  });

  // ===== buscador global =====
  // Detecta si estamos en /paginas/ para resolver URLs correctamente
  const inPaginas = location.pathname.includes("/paginas/");
  const DOC_PREFIX = inPaginas ? "../docs/" : "docs/";
  const PAGE_PREFIX = inPaginas ? "" : "paginas/";

  const DOCS = [
    // Páginas
    { title: "Convenio de Adhesión", section: "Página", url: PAGE_PREFIX + "convenio.html", keywords: "convenio adhesion" },
    { title: "Datos disponibles", section: "Página", url: PAGE_PREFIX + "datos-disponibles.html", keywords: "datos disponibles sets dt ips suseso sp fase 1" },
    { title: "Documentos Nodo", section: "Página", url: PAGE_PREFIX + "documentos-nodo.html", keywords: "documentos nodo manuales procedimientos soporte" },
    { title: "Anexos Técnicos", section: "Página", url: PAGE_PREFIX + "anexos-tecnicos.html", keywords: "anexos tecnicos anexo 1 anexo 2 anexo 3 anexo 4" },
    { title: "Anexos de Provisión de Datos", section: "Página", url: PAGE_PREFIX + "anexos-provision-datos.html", keywords: "provision datos anexo 1 anexo 2 sp dt ips suseso" },
    { title: "Anexos de Consumo de Datos", section: "Página", url: PAGE_PREFIX + "anexos-consumo-datos.html", keywords: "consumo datos anexo 3 anexo 4 sp dt ips suseso" },
    { title: "Reglas de Uso", section: "Página", url: PAGE_PREFIX + "reglas-uso.html", keywords: "reglas uso" },

    // PDFs
    { title: "Convenio Sectorial Nodo Laboral y Previsional", section: "Convenio", url: DOC_PREFIX + "Convenio-Sectorial-Nodo.pdf", keywords: "convenio sectorial nodo laboral previsional" },
    { title: "Reglas de Uso del Repositorio Digital Sectorial", section: "Reglas de Uso", url: DOC_PREFIX + "Reglas_de_uso.pdf", keywords: "reglas uso repositorio" },
    { title: "Sets de datos disponibles (4 OAEs) – Fase 1", section: "Datos disponibles", url: DOC_PREFIX + "Sets_datos_disponibles_4_OAEs_Fase1.pdf", keywords: "sets datos disponibles dt ips suseso sp fase 1" }
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
  }

  function renderResults(items, q){
    if (!resultsBox) return;
    if (!q){ hideResults(); return; }

    const head = `<div class="sr-head">Resultados para <b>${q}</b> (${items.length})</div>`;
    const rows = items.slice(0, 12).map(it => {
      const target = it.url.endsWith(".pdf") ? ` target="_blank" rel="noopener"` : "";
      return `
        <a href="${it.url}" ${target}>
          <div class="sr-title">${it.title}</div>
          <div class="sr-sub">${it.section}</div>
        </a>
      `;
    }).join("");

    resultsBox.innerHTML = head + (rows || `<div class="sr-head">No se encontraron coincidencias.</div>`);
    resultsBox.style.display = "block";
  }

  function setupSearch(){
    if (!input || !resultsBox) return;

    const onChange = () => {
      const qRaw = input.value;
      const q = norm(qRaw);

      if (clearBtn) clearBtn.style.display = q ? "inline-flex" : "none";
      if (!q){ hideResults(); return; }

      const hits = DOCS.filter(d => norm(d.title + " " + d.section + " " + d.keywords).includes(q));
      renderResults(hits, qRaw.trim());
    };

    input.addEventListener("input", onChange);
    input.addEventListener("focus", onChange);

    document.addEventListener("click", (e) => {
      const inside = e.target.closest(".searchwrap");
      if (!inside) hideResults();
    });

    if (clearBtn){
      clearBtn.addEventListener("click", () => {
        input.value = "";
        clearBtn.style.display = "none";
        hideResults();
        input.focus();
      });
    }
  }

  setupSearch();
})();
