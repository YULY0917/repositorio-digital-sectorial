(function () {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");
  const burger = document.querySelector(".burger");

  const input = document.getElementById("search");
  const clearBtn = document.querySelector(".search-clear");
  const resultsBox = document.getElementById("searchResults");

  // ====== MENU MOVIL (CLAVE) ======
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

  // Cerrar menú al hacer click en un link (móvil)
  document.querySelectorAll(".menu a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth <= 980) closeMenu();
    });
  });

  // ====== ACTIVO EN MENU ======
  const current = location.pathname.split("/").pop();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href && href === current) a.classList.add("active");
  });

  // ====== BUSCADOR ======
  const DOCS = [
    // páginas (las resolvemos según si estás en raíz o en /paginas)
    { title:"Inicio", section:"Página", url:"index.html", keywords:"inicio home" },
    { title:"Convenio de Adhesión", section:"Página", url:"convenio.html", keywords:"convenio adhesion" },
    { title:"Anexos Técnicos", section:"Página", url:"anexos-tecnicos.html", keywords:"anexos tecnicos" },
    { title:"Anexos de Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"provision datos anexo 1 anexo 2" },
    { title:"Anexos de Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"consumo datos anexo 3 anexo 4" },
    { title:"Reglas de Uso", section:"Página", url:"reglas-uso.html", keywords:"reglas uso" },

    // PDFs (rutas relativas desde /paginas)
    { title:"Convenio Sectorial Nodo Laboral y Previsional", section:"PDF", url:"../docs/Convenio-Sectorial-Nodo.pdf", keywords:"convenio pdf" },
    { title:"Reglas de Uso del Repositorio Digital Sectorial", section:"PDF", url:"../docs/Reglas_de_uso.pdf", keywords:"reglas uso pdf" }
  ];

  function norm(s){
    return (s||"")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim();
  }

  // Si estás en raíz, las páginas están en /paginas/...
  const inRoot = !location.pathname.includes("/paginas/");
  function pageHref(url){
    if (url.endsWith(".html") && inRoot && url !== "index.html") return "paginas/" + url;
    return url;
  }

  function hideResults(){
    if (!resultsBox) return;
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
  }

  function renderResults(items, q){
    if (!resultsBox) return;

    if (!q){
      hideResults();
      return;
    }

    const head = `<div class="sr-head">Resultados para <b>${q}</b> (${items.length})</div>`;
    const rows = items.slice(0, 12).map(it => {
      const url = it.url.endsWith(".html") ? pageHref(it.url) : it.url;
      const isPdf = it.url.includes("../docs/");
      const target = isPdf ? ` target="_blank" rel="noopener"` : "";
      return `
        <a href="${url}" ${target}>
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

      renderResults(hits, qRaw.trim());
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
