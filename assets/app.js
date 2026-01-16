(function () {
  // =============================
  // MENU (no lo cambio)
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
  // BUSCADOR GLOBAL (FIX REAL)
  // =============================
  const input = document.getElementById("search");
  const clearBtn = document.querySelector(".search-clear");
  const resultsBox = document.getElementById("searchResults");

  if (!input || !resultsBox) return;

  // ¿Estamos en /paginas/ o en raíz?
  const inPages = location.pathname.includes("/paginas/");

  function resolveUrl(u){
    // HTML
    if (u.endsWith(".html")){
      if (u === "index.html") return inPages ? "../index.html" : "index.html";
      return inPages ? u : ("paginas/" + u);
    }
    // PDFs dentro de /docs
    if (u.startsWith("docs/")){
      return inPages ? ("../" + u) : u;
    }
    return u;
  }

  function norm(s){
    return (s||"")
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .trim();
  }

  // ===== Índice GLOBAL =====
  // Puedes agregar más entradas aquí si subes más documentos.
  const DOCS = [
    // PÁGINAS
    { title:"Inicio", section:"Página", url:"index.html", keywords:"inicio home repositorio digital sectorial" },
    { title:"Convenio de Adhesión", section:"Página", url:"convenio.html", keywords:"convenio adhesion documento" },
    { title:"Anexos Técnicos", section:"Página", url:"anexos-tecnicos.html", keywords:"anexos tecnicos anexo 1 anexo 2 anexo 3 anexo 4" },
    { title:"Anexos de Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"provision datos proveedor anexo 1 anexo 2 sp dt ips suseso" },
    { title:"Anexos de Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"consumo datos consumidor anexo 3 anexo 4 sp dt ips suseso" },
    { title:"Reglas de Uso", section:"Página", url:"reglas-uso.html", keywords:"reglas uso" },

    // PDFs generales (si existen)
    { title:"Convenio Sectorial Nodo Laboral y Previsional", section:"PDF", url:"docs/Convenio-Sectorial-Nodo.pdf", keywords:"convenio pdf nodo laboral previsional" },
    { title:"Reglas de Uso del Repositorio Digital Sectorial", section:"PDF", url:"docs/Reglas_de_uso.pdf", keywords:"reglas uso pdf repositorio" },

    // ===== OAEs (GLOBAL por OAE + anexos) =====
    // IPS
    { title:"IPS – Anexo 1", section:"PDF", url:"docs/IPS_Anexo1.pdf", keywords:"ips instituto de prevision social anexo 1 provision proveedor" },
    { title:"IPS – Anexo 2", section:"PDF", url:"docs/IPS_Anexo2.pdf", keywords:"ips instituto de prevision social anexo 2 provision proveedor" },
    { title:"IPS – Anexo 3", section:"PDF", url:"docs/IPS_Anexo3.pdf", keywords:"ips instituto de prevision social anexo 3 consumo consumidor" },
    { title:"IPS – Anexo 4", section:"PDF", url:"docs/IPS_Anexo4.pdf", keywords:"ips instituto de prevision social anexo 4 consumo consumidor" },

    // DT
    { title:"DT – Anexo 1", section:"PDF", url:"docs/DT_Anexo1.pdf", keywords:"dt direccion del trabajo anexo 1 provision proveedor" },
    { title:"DT – Anexo 2", section:"PDF", url:"docs/DT_Anexo2.pdf", keywords:"dt direccion del trabajo anexo 2 provision proveedor" },
    { title:"DT – Anexo 3", section:"PDF", url:"docs/DT_Anexo3.pdf", keywords:"dt direccion del trabajo anexo 3 consumo consumidor" },
    { title:"DT – Anexo 4", section:"PDF", url:"docs/DT_Anexo4.pdf", keywords:"dt direccion del trabajo anexo 4 consumo consumidor" },

    // SUSESO
    { title:"SUSESO – Anexo 1", section:"PDF", url:"docs/SUSESO_Anexo1.pdf", keywords:"suseso superintendencia de seguridad social anexo 1 provision proveedor" },
    { title:"SUSESO – Anexo 2", section:"PDF", url:"docs/SUSESO_Anexo2.pdf", keywords:"suseso superintendencia de seguridad social anexo 2 provision proveedor" },
    { title:"SUSESO – Anexo 3", section:"PDF", url:"docs/SUSESO_Anexo3.pdf", keywords:"suseso superintendencia de seguridad social anexo 3 consumo consumidor" },
    { title:"SUSESO – Anexo 4", section:"PDF", url:"docs/SUSESO_Anexo4.pdf", keywords:"suseso superintendencia de seguridad social anexo 4 consumo consumidor" },

    // SP
    { title:"SP – Anexo 1", section:"PDF", url:"docs/SP_Anexo1.pdf", keywords:"sp superintendencia de pensiones anexo 1 provision proveedor" },
    { title:"SP – Anexo 2", section:"PDF", url:"docs/SP_Anexo2.pdf", keywords:"sp superintendencia de pensiones anexo 2 provision proveedor" },
    { title:"SP – Anexo 3", section:"PDF", url:"docs/SP_Anexo3.pdf", keywords:"sp superintendencia de pensiones anexo 3 consumo consumidor" },
    { title:"SP – Anexo 4", section:"PDF", url:"docs/SP_Anexo4.pdf", keywords:"sp superintendencia de pensiones anexo 4 consumo consumidor" },

    // Atajos por OAE (para que te muestre también páginas relacionadas)
    { title:"IPS – Ver en Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"ips instituto de prevision social provision" },
    { title:"IPS – Ver en Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"ips instituto de prevision social consumo" },

    { title:"DT – Ver en Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"dt direccion del trabajo provision" },
    { title:"DT – Ver en Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"dt direccion del trabajo consumo" },

    { title:"SUSESO – Ver en Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"suseso provision" },
    { title:"SUSESO – Ver en Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"suseso consumo" },

    { title:"SP – Ver en Provisión de Datos", section:"Página", url:"anexos-provision-datos.html", keywords:"sp provision" },
    { title:"SP – Ver en Consumo de Datos", section:"Página", url:"anexos-consumo-datos.html", keywords:"sp consumo" }
  ];

  function openResults(){
    resultsBox.classList.add("is-open");
    resultsBox.style.display = "block";
  }
  function closeResults(){
    resultsBox.classList.remove("is-open");
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
  }

  function render(items, rawQuery){
    const q = rawQuery.trim();
    if (!q){ closeResults(); return; }

    const head = `<div class="sr-head">Resultados para <b>${q}</b> (${items.length})</div>`;
    const rows = items.slice(0, 20).map(it => {
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

    // Match por keywords + title + section
    const hits = DOCS.filter(d => {
      const hay = norm(d.title + " " + d.section + " " + d.keywords);
      return hay.includes(q);
    });

    // Prioridad: exact match de siglas (ips/dt/suseso/sp)
    const sig = q;
    hits.sort((a,b) => {
      const aScore = (norm(a.title).startsWith(sig) ? 2 : 0) + (norm(a.keywords).includes(" " + sig + " ") ? 1 : 0);
      const bScore = (norm(b.title).startsWith(sig) ? 2 : 0) + (norm(b.keywords).includes(" " + sig + " ") ? 1 : 0);
      return bScore - aScore;
    });

    render(hits, raw);
  }

  input.addEventListener("input", onInput);
  input.addEventListener("focus", onInput);

  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".searchwrap");
    if (!inside) closeResults();
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    clearBtn.style.display = "none";
    closeResults();
    input.focus();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeResults();
  });
})();
