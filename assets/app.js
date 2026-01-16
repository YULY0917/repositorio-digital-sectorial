(function () {
  // =============================
  // MENU (no lo cambio, solo estable)
  // =============================
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");

  function openMenu(){ document.body.classList.add("menu-open"); }
  function closeMenu(){ document.body.classList.remove("menu-open"); }

  burger?.addEventListener("click", () => {
    document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  document.querySelectorAll(".menu a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 980) closeMenu();
    });
  });

  // Activo en menú
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === current) a.classList.add("active");
  });

  // =============================
  // BUSCADOR (FIX)
  // =============================
  const input = document.getElementById("search");
  const clearBtn = document.querySelector(".search-clear");
  const resultsBox = document.getElementById("searchResults");

  if (!input || !resultsBox) return;

  // Datos (ajusta si agregas más PDFs/páginas)
  const DOCS = [
    { title:"Inicio", section:"Página", url:"index.html", keywords:"inicio home" },
    { title:"Convenio de Adhesión", section:"Página", url:"convenio.html", keywords:"convenio adhesion" },
    { title:"Anexos Técnicos", section:"Página", url:"anexos-tecnicos.html", keywords:"anexos tecnicos anexo 1 anexo 2 anexo 3 anexo 4" },
    { title:"Anexos de Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"provision datos sp dt ips suseso anexo 1 anexo 2" },
    { title:"Anexos de Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"consumo datos sp dt ips suseso anexo 3 anexo 4" },
    { title:"Reglas de Uso", section:"Página", url:"reglas-uso.html", keywords:"reglas uso" },

    // PDFs (en /docs/)
    { title:"Convenio Sectorial Nodo Laboral y Previsional", section:"PDF", url:"docs/Convenio-Sectorial-Nodo.pdf", keywords:"convenio pdf" },
    { title:"Reglas de Uso del Repositorio Digital Sectorial", section:"PDF", url:"docs/Reglas_de_uso.pdf", keywords:"reglas uso pdf" }
  ];

  function norm(s){
    return (s||"")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim();
  }

  // Resolver rutas según dónde estás (raíz vs /paginas/)
  const inPages = location.pathname.includes("/paginas/");

  function resolveUrl(u){
    // HTML
    if (u.endsWith(".html")){
      if (u === "index.html") return inPages ? "../index.html" : "index.html";
      return inPages ? u : ("paginas/" + u);
    }
    // PDFs en /docs
    if (u.startsWith("docs/")){
      return inPages ? ("../" + u) : u;
    }
    return u;
  }

  function openResults(){ resultsBox.classList.add("is-open"); resultsBox.style.display = "block"; }
  function closeResults(){ resultsBox.classList.remove("is-open"); resultsBox.style.display = "none"; resultsBox.innerHTML=""; }

  function render(items, rawQuery){
    const q = rawQuery.trim();
    if (!q){ closeResults(); return; }

    const head = `<div class="sr-head">Resultados para <b>${q}</b> (${items.length})</div>`;
    const rows = items.slice(0, 12).map(it => {
      const href = resolveUrl(it.url);
      const isPdf = href.toLowerCase().endsWith(".pdf");
      const target = isPdf ? ` target="_blank" rel="noopener"` : "";
      return `
        <a href="${href}" ${target}>
          <div class="sr-title">${it.title}</div>
          <div class="sr-sub">${it.section}</div>
        </a>
      `;
    }).join("");

    resultsBox.innerHTML = head + (rows || `<div class="sr-head">No se encontraron coincidencias.</div>`);
    openResults();
  }

  function onInput(){
    const raw = input.value || "";
    const q = norm(raw);

    if (clearBtn){
      clearBtn.style.display = q ? "inline-flex" : "none";
    }

    if (!q){
      closeResults();
      return;
    }

    const hits = DOCS.filter(d => {
      const hay = norm(d.title + " " + d.section + " " + d.keywords);
      return hay.includes(q);
    });

    render(hits, raw);
  }

  input.addEventListener("input", onInput);
  input.addEventListener("focus", onInput);

  // Click fuera cierra resultados
  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".searchwrap");
    if (!inside) closeResults();
  });

  // Botón X
  clearBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    closeResults();
    input.focus();
  });

  // ESC cierra
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeResults();
  });
})();
