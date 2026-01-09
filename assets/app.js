// === MAPA DEL SITIO ===
const SITE = [
  { title: "Inicio", href: "/repositorio-digital-sectorial/index.html", id: "inicio", desc: "Página principal del repositorio." },

  { title: "Convenio de Adhesión", href: "/repositorio-digital-sectorial/paginas/convenio.html", id: "convenio", desc: "Convenio de adhesión y antecedentes." },

  {
    title: "Anexos Técnicos",
    href: "/repositorio-digital-sectorial/paginas/anexos-tecnicos.html",
    id: "anexos-tecnicos",
    desc: "Estructura y anexos técnicos del repositorio.",
    children: [
      { title: "Anexos de provisión de datos", href: "/repositorio-digital-sectorial/paginas/anexos-provision.html", id: "anexos-provision", desc: "Documentos para provisión de datos." },
      { title: "Anexos de consumo de datos", href: "/repositorio-digital-sectorial/paginas/anexos-consumo.html", id: "anexos-consumo", desc: "Documentos para consumo de datos." },
    ]
  },

  { title: "Reglas de Uso", href: "/repositorio-digital-sectorial/paginas/reglas-uso.html", id: "reglas-uso", desc: "Reglas de uso del repositorio." },
];

// Detecta basePath de GitHub Pages (repo name)
function getRepoBase() {
  // Espera URLs tipo: https://usuario.github.io/repositorio-digital-sectorial/...
  const parts = location.pathname.split("/").filter(Boolean);
  if (parts.length >= 1) return "/" + parts[0]; // "/repositorio-digital-sectorial"
  return "";
}

function toHref(href) {
  // hrefs en SITE vienen con /repositorio-digital-sectorial/...
  // Si el repo cambia, lo ajusta automáticamente usando el base actual.
  const base = getRepoBase();
  const cleaned = href.replace(/^\/[^/]+/, base);
  return cleaned;
}

function currentPath() {
  return location.pathname;
}

function buildMenu() {
  const menu = document.getElementById("menu");
  if (!menu) return;

  const path = currentPath();

  const wrap = document.createElement("div");

  SITE.forEach(item => {
    const a = document.createElement("a");
    a.href = toHref(item.href);
    a.textContent = item.title;

    // activo
    const isActive = path === new URL(a.href, location.origin).pathname;
    if (isActive) a.classList.add("active");

    wrap.appendChild(a);

    if (item.children && item.children.length) {
      const sub = document.createElement("div");
      sub.className = "sub";

      item.children.forEach(ch => {
        const sa = document.createElement("a");
        sa.href = toHref(ch.href);
        sa.textContent = ch.title;

        const subActive = path === new URL(sa.href, location.origin).pathname;
        if (subActive) sa.classList.add("active");

        sub.appendChild(sa);
      });

      wrap.appendChild(sub);
    }
  });

  menu.innerHTML = "";
  menu.appendChild(wrap);
}

function buildQuickList() {
  const list = document.getElementById("quickList");
  if (!list) return;

  const flat = [];
  SITE.forEach(i => {
    if (i.id !== "inicio") flat.push(i);
    if (i.children) i.children.forEach(c => flat.push(c));
  });

  list.innerHTML = "";

  flat.forEach(it => {
    const row = document.createElement("a");
    row.className = "quickitem";
    row.href = toHref(it.href);
    row.dataset.title = (it.title || "").toLowerCase();
    row.dataset.desc = (it.desc || "").toLowerCase();

    row.innerHTML = `
      <div class="left">
        <div class="title">${it.title}</div>
        <div class="desc">${it.desc || ""}</div>
      </div>
      <div class="go">Abrir</div>
    `;

    list.appendChild(row);
  });
}

function wireSearch() {
  const input = document.getElementById("searchInput");
  const list = document.getElementById("quickList");
  if (!input || !list) return;

  input.addEventListener("input", () => {
    const q = (input.value || "").trim().toLowerCase();

    [...list.querySelectorAll(".quickitem")].forEach(el => {
      const t = el.dataset.title || "";
      const d = el.dataset.desc || "";
      const ok = !q || t.includes(q) || d.includes(q);
      el.style.display = ok ? "flex" : "none";
    });
  });
}

// Init
buildMenu();
buildQuickList();
wireSearch();
