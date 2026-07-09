const successButton = document.querySelector(".toast__button-success");
const errorButton = document.querySelector(".toast__button-error");
const successRegion = document.querySelector(".toast__region--success");
const errorRegion = document.querySelector(".toast__region--error");
const TOAST_DURATION = {
  success: 3000,
  error: 6000,
};
function createToast(type, message) {
  const toast = document.createElement("div");
  toast.className = `toast__item toast__item--${type}`;
  toast.innerHTML = `
    <strong class="toast__status">${type === "success" ? "성공" : "오류"}</strong>
    <p class="toast__message">${message}</p>
    <button type="button" class="toast__close">닫기</button>
  `;
  return toast;
}

function showToast(region, type, message) {
  const toast = createToast(type, message);
  const closeButton = toast.querySelector(".toast__close");
  region.append(toast);

  const timerId = setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION[type]);

  closeButton.addEventListener("click", () => {
    clearTimeout(timerId);
    toast.remove();
  });
}

successButton.addEventListener("click", () => {
  showToast(successRegion, "success", "사용자 상태가 활성으로 변경되었습니다.");
});
errorButton.addEventListener("click", () => {
  showToast(
    errorRegion,
    "error",
    "사용자 상태 변경에 실패했습니다. 잠시 후 다시 시도해주세요.",
  );
});
