(function () {
  // =========================
  // Config
  // =========================
  const REPO_BASE = "/repositorio-digital-sectorial"; // <-- tu repo en GitHub Pages

  // Índice global de documentos (AJUSTABLE)
  // tags: palabras por las que debe encontrar (oae, anexo, etc.)
  const DOCS = [
    // Convenio
    {
      title: "Convenio Sectorial Nodo Laboral y Previsional",
      section: "Convenio de Adhesión",
      tags: "convenio adhesion nodo laboral previsional",
      url: `${REPO_BASE}/docs/Convenio-Sectorial-Nodo.pdf`,
      type: "pdf",
    },

    // Reglas de Uso
    {
      title: "Reglas de Uso del Repositorio Digital Sectorial",
      section: "Reglas de Uso",
      tags: "reglas uso repositorio digital sectorial nodo laboral previsional",
      url: `${REPO_BASE}/docs/Reglas_de_uso.pdf`,
      type: "pdf",
    },

    // Provisión de Datos (Anexo 1 y 2)
    {
      title: "SP - Anexo 1 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "sp superintendencia de pensiones anexo 1 provision datos",
      url: `${REPO_BASE}/docs/SP_Anexo1.pdf`,
      type: "pdf",
    },
    {
      title: "SP - Anexo 2 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "sp superintendencia de pensiones anexo 2 provision datos",
      url: `${REPO_BASE}/docs/SP_Anexo2.pdf`,
      type: "pdf",
    },
    {
      title: "SUSESO - Anexo 1 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "suseso superintendencia de seguridad social anexo 1 provision datos",
      url: `${REPO_BASE}/docs/SUSESO_Anexo1.pdf`,
      type: "pdf",
    },
    {
      title: "SUSESO - Anexo 2 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "suseso superintendencia de seguridad social anexo 2 provision datos",
      url: `${REPO_BASE}/docs/SUSESO_Anexo2.pdf`,
      type: "pdf",
    },
    {
      title: "DT - Anexo 1 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "dt direccion del trabajo anexo 1 provision datos",
      url: `${REPO_BASE}/docs/DT_Anexo1.pdf`,
      type: "pdf",
    },
    {
      title: "DT - Anexo 2 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "dt direccion del trabajo anexo 2 provision datos",
      url: `${REPO_BASE}/docs/DT_Anexo2.pdf`,
      type: "pdf",
    },
    {
      title: "IPS - Anexo 1 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "ips instituto de prevision social anexo 1 provision datos",
      url: `${REPO_BASE}/docs/IPS_Anexo1.pdf`,
      type: "pdf",
    },
    {
      title: "IPS - Anexo 2 (Provisión de Datos)",
      section: "Anexos de Provisión de Datos",
      tags: "ips instituto de prevision social anexo 2 provision datos",
      url: `${REPO_BASE}/docs/IPS_Anexo2.pdf`,
      type: "pdf",
    },

    // Consumo de Datos (Anexo 3 y 4)
    {
      title: "SP - Anexo 3 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "sp superintendencia de pensiones anexo 3 consumo datos",
      url: `${REPO_BASE}/docs/SP_Anexo3.pdf`,
      type: "pdf",
    },
    {
      title: "SP - Anexo 4 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "sp superintendencia de pensiones anexo 4 consumo datos",
      url: `${REPO_BASE}/docs/SP_Anexo4.pdf`,
      type: "pdf",
    },
    {
      title: "SUSESO - Anexo 3 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "suseso superintendencia de seguridad social anexo 3 consumo datos",
      url: `${REPO_BASE}/docs/SUSESO_Anexo3.pdf`,
      type: "pdf",
    },
    {
      title: "SUSESO - Anexo 4 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "suseso superintendencia de seguridad social anexo 4 consumo datos",
      url: `${REPO_BASE}/docs/SUSESO_Anexo4.pdf`,
      type: "pdf",
    },
    {
      title: "DT - Anexo 3 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "dt direccion del trabajo anexo 3 consumo datos",
      url: `${REPO_BASE}/docs/DT_Anexo3.pdf`,
      type: "pdf",
    },
    {
      title: "DT - Anexo 4 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "dt direccion del trabajo anexo 4 consumo datos",
      url: `${REPO_BASE}/docs/DT_Anexo4.pdf`,
      type: "pdf",
    },
    {
      title: "IPS - Anexo 3 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "ips instituto de prevision social anexo 3 consumo datos",
      url: `${REPO_BASE}/docs/IPS_Anexo3.pdf`,
      type: "pdf",
    },
    {
      title: "IPS - Anexo 4 (Consumo de Datos)",
      section: "Anexos de Consumo de Datos",
      tags: "ips instituto de prevision social anexo 4 consumo datos",
      url: `${REPO_BASE}/docs/IPS_Anexo4.pdf`,
      type: "pdf",
    },
  ];

  // =========================
  // Helpers
  // =========================
  const norm = (s) =>
    (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  function ensureOverlay() {
    let overlay = document.querySelector(".overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "overlay";
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  function openMenu() {
    document.body.classList.add("menu-open");
  }
  function closeMenu() {
    document.body.classList.remove("menu-open");
  }

  // =========================
  // Menu mobile
  // =========================
  const burger = document.querySelector(".burger");
  const overlay = ensureOverlay();

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.contains("menu-open") ? closeMenu() : openMenu();
    });
  }
  overlay.addEventListener("click", closeMenu);

  // Marcar link activo
  (function markActiveLinks() {
    const path = location.pathname.split("/").pop();
    document.querySelectorAll(".menu a").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("/").pop();
      if (href && href === path) a.classList.add("active");
      if (!path && href === "index.html") a.classList.add("active");
    });
  })();

  // =========================
  // Search UI
  // =========================
  const searchInput =
    document.getElementById("search") ||
    document.querySelector(".searchwrap input");

  if (!searchInput) return;

  // contenedor resultados
  let resultsBox = document.querySelector(".search-results");
  if (!resultsBox) {
    resultsBox = document.createElement("div");
    resultsBox.className = "search-results";
    // lo insertamos justo después del buscador
    const wrap = searchInput.closest(".searchwrap") || searchInput.parentElement;
    wrap.style.position = "relative";
    wrap.appendChild(resultsBox);
  }

  function hideResults() {
    resultsBox.innerHTML = "";
    resultsBox.classList.remove("open");
  }

  function renderResults(items, q) {
    if (!items.length) {
      resultsBox.innerHTML = `<div class="sr-empty">Sin resultados para <b>${q}</b></div>`;
      resultsBox.classList.add("open");
      return;
    }

    const html = items
      .slice(0, 15)
      .map((d) => {
        const isPdf = d.type === "pdf";
        return `
          <a class="sr-item" href="${d.url}" target="${isPdf ? "_blank" : "_self"}" rel="noopener">
            <div class="sr-title">${d.title}</div>
            <div class="sr-meta">${d.section}</div>
          </a>
        `;
      })
      .join("");

    resultsBox.innerHTML = html;
    resultsBox.classList.add("open");
  }

  function searchDocs(query) {
    const q = norm(query);
    if (!q || q.length < 2) {
      hideResults();
      return;
    }

    const scored = DOCS.map((d) => {
      const hay = norm(`${d.title} ${d.section} ${d.tags}`);
      let score = 0;

      // score básico
      if (hay.includes(q)) score += 3;

      // score por tokens
      const tokens = q.split(/\s+/).filter(Boolean);
      tokens.forEach((t) => {
        if (hay.includes(t)) score += 1;
      });

      return { d, score };
    })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.d);

    renderResults(scored, query.trim());
  }

  searchInput.addEventListener("input", (e) => searchDocs(e.target.value));

  // cerrar resultados con Escape
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      hideResults();
      searchInput.blur();
    }
  });

  // cerrar resultados al click afuera
  document.addEventListener("click", (e) => {
    const wrap = searchInput.closest(".searchwrap") || searchInput.parentElement;
    if (!wrap.contains(e.target)) hideResults();
  });
})();
