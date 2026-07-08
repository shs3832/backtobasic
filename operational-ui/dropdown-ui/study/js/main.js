const triggerButton = document.querySelector(".dropdown__trigger");
const menu = document.querySelector(".dropdown__menu");
const menuItems = document.querySelectorAll(".dropdown__item");
const dropdown = document.querySelector(".dropdown");

triggerButton.addEventListener("click", () => {
  const isExpanded = triggerButton.getAttribute("aria-expanded") === "true";
  triggerButton.setAttribute("aria-expanded", String(!isExpanded));
  menu.hidden = isExpanded;
});

function closeMenu() {
  triggerButton.setAttribute("aria-expanded", "false");
  menu.hidden = true;
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  closeMenu();
});

document.addEventListener("click", (event) => {
  if (dropdown.contains(event.target)) return;
  closeMenu();
});

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    closeMenu();
  });
});
