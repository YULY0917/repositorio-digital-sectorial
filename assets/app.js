document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const overlay = document.querySelector(".overlay");

  const closeMenu = () => document.body.classList.remove("menu-open");

  if (burger) {
    burger.addEventListener("click", () => {
      document.body.classList.toggle("menu-open");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
});
