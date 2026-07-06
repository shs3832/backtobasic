const sortButtons = document.querySelectorAll(".sort-button");
const tableBody = document.querySelector("tbody");

let currentSortKey = "";
let currentSortDirection = "ascending";

function getSortValue(row, sortKey) {
  const cells = row.children;
  if (sortKey === "name") {
    return cells[0].textContent.trim();
  }
  if (sortKey === "joinedAt") {
    return cells[4].textContent.trim();
  }

  return "";
}

function renderRows(rows) {
  rows.forEach((row) => {
    tableBody.appendChild(row);
  });
}

function updateAriaSort(button) {
  const sortableHeaders = document.querySelectorAll("th[aria-sort]");
  const headerCell = button.closest("th");

  sortableHeaders.forEach((header) => {
    header.setAttribute("aria-sort", "none");
  });
  headerCell.setAttribute("aria-sort", currentSortDirection);
}

sortButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sortKey = button.dataset.sortKey;
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    if (currentSortKey === sortKey) {
      currentSortDirection =
        currentSortDirection === "ascending" ? "descending" : "ascending";
    } else {
      currentSortKey = sortKey;
      currentSortDirection = "ascending";
    }

    rows.sort((a, b) => {
      const aValue = getSortValue(a, sortKey);
      const bValue = getSortValue(b, sortKey);

      const result = aValue.localeCompare(bValue, "ko");
      return currentSortDirection === "ascending" ? result : -result;
    });

    renderRows(rows);
    updateAriaSort(button);
  });
});
