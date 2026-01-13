(function () {
  // Detecta si estamos dentro de /paginas/
  const inPaginas = window.location.pathname.includes("/paginas/");
  const base = inPaginas ? ".." : ".";

  // Elementos
  const sidebar = document.getElementById("sidebar");
  const search = document.getElementById("search");
  const results = document.getElementById("searchResults");

  if (!sidebar) return;

  // Menú: EXACTAMENTE como lo quieres
  const menuItems = [
    { label: "Inicio", href: `${base}/index.html` },
    { label: "Convenio de Adhesión", href: `${base}/paginas/convenio.html` },
    {
      label: "Anexos Técnicos",
      href: `${base}/paginas/anexos-tecnicos.html`,
      children: [
        { label: "Anexos de Provisión de Datos", href: `${base}/paginas/anexos-provision.html` },
        { label: "Anexos de Consumo de Datos", href: `${base}/paginas/anexos-consumo.html` },
      ],
    },
    { label: "Reglas de Uso", href: `${base}/paginas/reglas-uso.html` },
  ];

  // Render sidebar con LOGO + MENÚ (siempre)
  sidebar.innerHTML = `
    <div class="logoWrap">
      <img src="${base}/assets/Logo.png" alt="Logo Nodo L&P" />
      <div class="logoTitle">Repositorio Digital Sectorial</div>
    </div>
    <nav class="menu" id="menu"></nav>
  `;

  const menuEl = document.getElementById("menu");

  // Helper: marca activo si coincide pathname
  const current = window.location.pathname;

  function isActive(href) {
    // Compara solo el final de la ruta (para evitar problemas con github.io)
    const a = href.split("/").pop();
    const b = current.split("/").pop();
    return a === b;
  }

  // Construir menú
  menuItems.forEach(item => {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    if (isActive(item.href)) a.classList.add("active");
    menuEl.appendChild(a);

    if (item.children && item.children.length) {
      const sub = document.createElement("div");
      sub.className = "sub";
      item.children.forEach(ch => {
        const ca = document.createElement("a");
        ca.href = ch.href;
        ca.textContent = ch.label;
        if (isActive(ch.href)) ca.classList.add("active");
        sub.appendChild(ca);
      });
      menuEl.appendChild(sub);
    }
  });

  // Buscador (solo si existe en la topbar)
  if (search && results) {
    // Crea lista plana de búsqueda
    const flat = [];
    menuItems.forEach(i => {
      flat.push({ label: i.label, href: i.href });
      (i.children || []).forEach(c => flat.push({ label: c.label, href: c.href }));
    });

    function render(list) {
      results.innerHTML = "";
      list.forEach(x => {
        const row = document.createElement("div");
        row.style.padding = "10px 12px";
        row.style.borderTop = "1px solid #e5e7eb";
        row.innerHTML = `<a href="${x.href}" style="text-decoration:none;color:#0f172a;font-weight:700">${x.label}</a>`;
        results.appendChild(row);
      });
      results.style.display = list.length ? "block" : "none";
    }

    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      if (!q) return render([]);
      const filtered = flat.filter(x => x.label.toLowerCase().includes(q));
      render(filtered);
    });

    // Cierra resultados al hacer click fuera
    document.addEventListener("click", (e) => {
      if (!results.contains(e.target) && e.target !== search) {
        results.style.display = "none";
      }
    });
  }
})();
