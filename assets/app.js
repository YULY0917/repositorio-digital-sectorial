(function () {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const burger = document.querySelector(".burger");

  const input = document.getElementById("search");
  const clearBtn = document.querySelector(".search-clear") || document.querySelector(".clear-btn");
  const resultsBox = document.getElementById("searchResults") || document.getElementById("search-results");

  // =============================
  // MENU MOVIL (✅ ahora calza con CSS)
  // =============================
  function openMenu() {
    document.body.classList.add("menu-open");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
  }

  burger?.addEventListener("click", () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  // Cerrar al tocar un link en móvil
  document.querySelectorAll(".menu a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 980) closeMenu();
    });
  });

  // =============================
  // LINK ACTIVO
  // =============================
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === current) a.classList.add("active");
  });

  // =============================
  // BUSCADOR (✅ funciona en index y en /paginas)
  // =============================
  const DOCS = [
    // Páginas
    { title:"Inicio", section:"Página", url:"index.html", keywords:"inicio home" },
    { title:"Convenio de Adhesión", section:"Página", url:"convenio.html", keywords:"convenio adhesion" },
    { title:"Anexos Técnicos", section:"Página", url:"anexos-tecnicos.html", keywords:"anexos tecnicos anexo 1 anexo 2 anexo 3 anexo 4" },
    { title:"Anexos de Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"provision datos anexo 1 anexo 2 sp dt ips suseso" },
    { title:"Anexos de Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"consumo datos anexo 3 anexo 4 sp dt ips suseso" },
    { title:"Reglas de Uso", section:"Página", url:"reglas-uso.html", keywords:"reglas uso" },

    // PDFs (nota: se resuelven según si estás en raíz o en /paginas)
    { title:"Convenio Sectorial Nodo Laboral y Previsional", section:"PDF", url:"docs/Convenio-Sectorial-Nodo.pdf", keywords:"convenio sectorial nodo laboral previsional" },
    { title:"Reglas de Uso del Repositorio Digital Sectorial", section:"PDF", url:"docs/Reglas_de_uso.pdf", keywords:"reglas uso repositorio digital sectorial" }
  ];

  function norm(s){
    return (s||"")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim();
  }

  // ¿Estamos en /paginas/ o en raíz?
  const inPages = location.pathname.includes("/paginas/");

  function resolveUrl(u){
    // Páginas HTML
    if (u.endsWith(".html")) {
      if (u === "index.html") return inPages ? "../index.html" : "index.html";
      return inPages ? u : ("paginas/" + u);
    }
    // PDFs
    if (u.startsWith("docs/")) {
      return inPages ? ("../" + u) : u;
    }
    return u;
  }

  function hideResults(){
    if (!resultsBox) return;
    resultsBox.classList.remove("is-open");
    resultsBox.innerHTML = "";
  }

  function renderResults(items, rawQuery){
    if (!resultsBox) return;

    const q = rawQuery.trim();
    if (!q){ hideResults(); return; }

    const head = `<div class="sr-head">Resultados para <b>${q}</b> (${items.length})</div>`;
    const rows = items.slice(0, 12).map(it => {
      const href = resolveUrl(it.url);
      const isPdf = href.endsWith(".pdf");
      const target = isPdf ? ` target="_blank" rel="noopener"` : "";
      return `
        <a href="${href}" ${target}>
          <div class="sr-title">${it.title}</div>
          <div class="sr-sub">${it.section}</div>
        </a>
      `;
    }).join("");

    resultsBox.innerHTML = head + (rows || `<div class="sr-head">No se encontraron coincidencias.</div>`);
    resultsBox.classList.add("is-open");
  }

  function setupSearch(){
    if (!input || !resultsBox) return;

    const onChange = () => {
      const qRaw = input.value || "";
      const q = norm(qRaw);

      if (clearBtn){
        clearBtn.style.display = q ? "inline-flex" : "none";
      }

      if (!q){
        hideResults();
        return;
      }

      const hits = DOCS.filter(d => {
        const hay = norm(d.title + " " + d.section + " " + d.keywords);
        return hay.includes(q);
      });

      renderResults(hits, qRaw);
    };

    input.addEventListener("input", onChange);
    input.addEventListener("focus", onChange);

    document.addEventListener("click", (e) => {
      const inside = e.target.closest(".searchwrap");
      if (!inside) hideResults();
    });

    clearBtn?.addEventListener("click", () => {
      input.value = "";
      clearBtn.style.display = "none";
      hideResults();
      input.focus();
    });
  }

  setupSearch();
})();
