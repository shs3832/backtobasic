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
    if (modal.hasAttribute("hidden")) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      const focusableElements = getFocusableElements();
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement =
        focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }
  });
}

function getFocusableElements() {
  return modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  );
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
