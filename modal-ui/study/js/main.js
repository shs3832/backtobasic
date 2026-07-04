const openButton = document.querySelector(".modal-open");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal__close");
const cancelButton = modal?.querySelector(".modal__actions button");

function initModal() {
  if (!openButton || !modal || !closeButton || !cancelButton) {
    return;
  }
  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  cancelButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (modal.hasAttribute("hidden")) return;
    closeModal();
  });
}

function openModal() {
  modal.hidden = false;
  closeButton.focus();
}

function closeModal() {
  modal.hidden = true;
  openButton.focus();
}

document.addEventListener("DOMContentLoaded", initModal);
