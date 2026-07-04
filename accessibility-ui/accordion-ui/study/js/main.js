function handleAccordion() {
  const target = document.querySelector(`.accordion`);
  if (!target) return;

  target.addEventListener("click", (event) => {
    const button = event.target.closest(".accordion__button");
    if (!button) return;
    const controlPanel = button.getAttribute("aria-controls");
    if (!controlPanel) return;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const panel = target.querySelector(`#${controlPanel}`);
    if (!panel) return;
    const isNextExpanded = !isExpanded;
    button.setAttribute("aria-expanded", String(isNextExpanded));
    panel.hidden = !isNextExpanded;
  });
}

document.addEventListener("DOMContentLoaded", handleAccordion);
