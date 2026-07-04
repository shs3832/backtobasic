function handleTabControls() {
  const target = document.querySelector(`.tabs`);
  if (!target) return;

  const tabButtons = target.querySelectorAll(".tabs__button");
  const tabPanels = target.querySelectorAll(".tabs__panel");

  target.addEventListener("click", (event) => {
    const tabButton = event.target.closest(".tabs__button");
    if (!tabButton) return;
    const tabPanel = tabButton.getAttribute("aria-controls");
    const targetPanel = target.querySelector(`#${tabPanel}`);
    if (!targetPanel) return;
    tabButtons.forEach((el) => {
      el.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach((el) => {
      el.hidden = true;
    });

    tabButton.setAttribute("aria-selected", "true");
    targetPanel.hidden = false;
  });
}

document.addEventListener("DOMContentLoaded", handleTabControls);
