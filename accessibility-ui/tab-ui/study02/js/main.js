function handleTabControls() {
  const target = document.querySelector(`.card-list`);
  if (!target) return;

  target.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".card__favorite");
    const cardTarget = event.target.closest(".card");
    if (!favoriteButton) return;
    const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
    const title = cardTarget?.querySelector(".card__title")?.textContent.trim() ?? "카드";

    if (isPressed) {
      favoriteButton.setAttribute("aria-pressed", "false");
      favoriteButton.setAttribute("aria-label", `${title} 찜하기`);
      favoriteButton.classList.remove("is-active");
      favoriteButton.textContent = "찜하기";
    } else {
      favoriteButton.setAttribute("aria-pressed", "true");
      favoriteButton.setAttribute("aria-label", `${title} 찜하기 취소`);
      favoriteButton.classList.add("is-active");
      favoriteButton.textContent = "찜함";
    }
  });
}

document.addEventListener("DOMContentLoaded", handleTabControls);
