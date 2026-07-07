const totalItems = 128;
const pageSize = 10;
const visiblePageCount = 5;

let currentPage = 1;

const totalPages = Math.ceil(totalItems / pageSize);
const pagination = document.querySelector(".pagination");
const prevButton = pagination.querySelector(".pagination__prev");
const nextButton = pagination.querySelector(".pagination__next");
const paginationButtons = pagination.querySelectorAll(
  ".pagination__numbers button",
);
const currentPageRange = pagination.querySelector(".pagination__current");
const pageArray = Array.from(paginationButtons);

function updatePagination() {
  // currentPage가 속한 페이지 번호 그룹을 계산한다.
  // 예: 1-5 => 1그룹, 6-10 => 2그룹, 11-13 => 3그룹
  const currentGroup = Math.ceil(currentPage / visiblePageCount);

  // 현재 그룹에서 화면에 보여줄 첫 페이지와 마지막 페이지를 계산한다.
  const startPage = (currentGroup - 1) * visiblePageCount + 1;
  const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);

  // 현재 페이지에서 실제로 보여주는 데이터 번호 범위를 계산한다.
  // 예: 2페이지, 10개씩 표시 => 11-20
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  currentPageRange.textContent = `${startItem}-${endItem}`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
  pageArray.forEach((button, index) => {
    const pageNumber = startPage + index;
    button.removeAttribute("aria-current");

    if (pageNumber > endPage) {
      button.hidden = true;
      return;
    }
    button.hidden = false;
    button.textContent = pageNumber;
    if (pageNumber === currentPage) {
      button.setAttribute("aria-current", "page");
    }
  });
}

prevButton.addEventListener("click", () => {
  if (currentPage === 1) return;
  currentPage = currentPage - 1;
  updatePagination();
});

nextButton.addEventListener("click", () => {
  if (currentPage === totalPages) return;
  currentPage = currentPage + 1;
  updatePagination();
});

pageArray.forEach((button) => {
  button.addEventListener("click", () => {
    const pageNum = button.textContent;
    currentPage = Number(pageNum);
    updatePagination();
  });
});

updatePagination();
