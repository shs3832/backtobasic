function initFilter() {
  const filterForm = document.querySelector(".filter__wrapper");
  const resultList = document.querySelector(".result-list");
  const resultItems = Array.from(
    document.querySelectorAll(".result-list__item"),
  );
  const resultCount = document.querySelector(".filter-result__count");

  if (!filterForm || !resultList || resultItems.length === 0 || !resultCount) {
    return;
  }

  filterForm.addEventListener("change", () => {
    applyFilter(filterForm, resultItems, resultCount, resultList);
  });

  filterForm.addEventListener("reset", () => {
    setTimeout(() => {
      applyFilter(filterForm, resultItems, resultCount, resultList);
    }, 0);
  });
}

function applyFilter(form, resultItems, resultCount, resultList) {
  const selectedCategories = getSelectedCategories(form);
  const selectedLevel = getSelectedLevel(form);
  const sortValue = getSortValue(form);
  const sortedItems = sortItems(resultItems, sortValue);
  let visibleCount = 0;
  sortedItems.forEach((item) => {
    resultList.appendChild(item);
    const categoryMatched = isCategoryMatched(item, selectedCategories);
    const levelMatched = isLevelMatched(item, selectedLevel);
    const shouldShow = categoryMatched && levelMatched;
    item.hidden = !shouldShow;
    if (shouldShow) {
      visibleCount += 1;
    }
  });

  resultCount.textContent = `총 ${visibleCount}개 결과`;
}

function getSelectedCategories(form) {
  const checkedInput = form.querySelectorAll('input[name="category"]:checked');
  const selectedCategories = Array.from(checkedInput).map((el) => {
    return el.value;
  });
  return selectedCategories;
}

function getSelectedLevel(form) {
  const checkedLevel = form.querySelector("input[name='level']:checked");
  if (!checkedLevel) return "all";
  return checkedLevel.value;
}

function getSortValue(form) {
  const sortSelect = form.querySelector('select[name="sort"]');
  if (!sortSelect) return "latest";
  return sortSelect.value;
}

function sortItems(items, sortValue) {
  const levelOrder = {
    basic: 1,
    advanced: 2,
  };
  const sortedItems = [...items];
  if (sortValue === "name") {
    sortedItems.sort((a, b) => {
      const titleA = a.querySelector(".result__title").textContent;
      const titleB = b.querySelector(".result__title").textContent;
      return titleA.localeCompare(titleB, "ko");
    });
  }

  if (sortValue === "level") {
    sortedItems.sort((a, b) => {
      const levelA = a.dataset.level;
      const levelB = b.dataset.level;
      return levelOrder[levelA] - levelOrder[levelB];
    });
  }
  return sortedItems;
}

function isCategoryMatched(item, selectedCategories) {
  if (selectedCategories.length === 0) return true;

  const itemCategories = item.dataset.category || "";
  const itemCategoryList = itemCategories.split(" ");

  return selectedCategories.some((category) => {
    return itemCategoryList.includes(category);
  });
}

function isLevelMatched(item, selectedLevel) {
  if (selectedLevel === "all") return true;
  return item.dataset.level === selectedLevel;
}

document.addEventListener("DOMContentLoaded", initFilter);
