# Filter UI Study - Part 1 HTML 마크업

## 목표

상품 리스트를 조건에 따라 필터링하는 UI를 만들기 전에, CSS와 JavaScript 없이 HTML만으로 의미 있는 폼 구조와 결과 목록 구조를 작성한다.

이번 파트의 핵심은 화면을 예쁘게 만드는 것이 아니라, 필터 조건을 사용자가 이해하고 조작할 수 있도록 `form`, `fieldset`, `legend`, `label`을 올바르게 구성하는 것이다.

## 구현 범위

이번 파트에서는 `index.html`만 작성한다.

```txt
filter-ui/study/
└─ index.html
```

SCSS, CSS, JavaScript는 다음 파트에서 작성한다.

## 화면 구성

```txt
상품 필터 학습

학습용 UI 컴포넌트를 조건에 따라 찾아봅니다.

[필터]

카테고리
□ HTML
□ CSS
□ JavaScript

난이도
○ 전체
○ 기본
○ 심화

정렬
[최신순 v]

[초기화]

[결과]
총 6개

- 반응형 카드 리스트
- 탭 UI
- 아코디언 FAQ
...
```

## 구현 요구사항

- 페이지의 핵심 콘텐츠는 `main` 안에 작성한다.
- 페이지 대표 제목은 `h1`으로 작성한다.
- 필터와 결과 영역 전체는 `section`으로 묶는다.
- `section` 제목은 `h2`로 작성하고 `aria-labelledby`로 연결한다.
- 필터 영역은 `form`으로 작성한다.
- 관련 있는 체크박스 묶음은 `fieldset`과 `legend`로 그룹화한다.
- 카테고리는 `checkbox`로 작성한다.
- 난이도는 하나만 선택하는 조건이므로 `radio`로 작성한다.
- 정렬은 `select`와 `label`로 작성한다.
- 초기화 버튼은 `type="reset"`으로 작성한다.
- 결과 영역에는 결과 개수 텍스트를 작성한다.
- 결과 목록은 `ul/li` 구조로 작성한다.
- 결과 아이템은 제목, 설명, 태그 정보를 포함한다.

## 필터 조건

### 카테고리

복수 선택이 가능한 조건이므로 checkbox로 작성한다.

```txt
HTML
CSS
JavaScript
```

### 난이도

하나만 선택되는 조건이므로 radio로 작성한다.

```txt
전체
기본
심화
```

### 정렬

select로 작성한다.

```txt
최신순
이름순
난이도순
```

## 더미 데이터

결과 목록은 최소 6개 이상 작성한다.

```txt
1.
제목: 반응형 카드 리스트
설명: CSS Grid와 카드 컴포넌트 구조를 연습하는 예제입니다.
카테고리: HTML, CSS
난이도: 기본

2.
제목: 탭 UI
설명: 선택된 탭과 패널을 연결하고 상태를 관리하는 예제입니다.
카테고리: HTML, JavaScript
난이도: 심화

3.
제목: 아코디언 FAQ
설명: 질문 버튼과 답변 패널의 펼침 상태를 관리하는 예제입니다.
카테고리: HTML, CSS, JavaScript
난이도: 기본

4.
제목: 폼 기본 구조
설명: label, fieldset, legend를 사용해 입력 그룹을 구성하는 예제입니다.
카테고리: HTML
난이도: 기본

5.
제목: 리스트 필터링
설명: 선택된 조건에 따라 결과 목록을 갱신하는 예제입니다.
카테고리: JavaScript
난이도: 심화

6.
제목: 반응형 필터 패널
설명: 모바일과 데스크톱에서 필터 영역 배치를 다르게 구성하는 예제입니다.
카테고리: CSS
난이도: 심화
```

## 접근성 체크 포인트

- `html`의 `lang` 값은 `ko`로 작성한다.
- `section`은 `aria-labelledby`로 제목과 연결한다.
- 필터 그룹은 `fieldset`과 `legend`로 묶는다.
- 모든 `input`은 연결된 `label`을 가진다.
- `radio`는 같은 `name` 값을 사용해 하나만 선택되게 한다.
- `select`는 `label`과 연결한다.
- 초기화 버튼은 실제 폼 초기화 목적이므로 `type="reset"`을 사용한다.
- 결과 개수는 사용자가 현재 결과 상태를 이해할 수 있게 텍스트로 제공한다.
- 결과 목록은 반복 콘텐츠이므로 `ul/li`로 작성한다.

## 권장 클래스 구조

```html
<main>
  <h1>상품 필터 학습</h1>

  <section class="filter-section" aria-labelledby="filter-section-title">
    <h2 id="filter-section-title" class="filter-section__title">학습 예제 찾기</h2>
    <p class="filter-section__description">...</p>

    <form class="filter-form">
      <fieldset class="filter-form__group">
        <legend class="filter-form__legend">카테고리</legend>

        <div class="filter-form__option">
          <input type="checkbox" id="category-html" name="category" value="html" />
          <label for="category-html">HTML</label>
        </div>
      </fieldset>

      <fieldset class="filter-form__group">
        <legend class="filter-form__legend">난이도</legend>

        <div class="filter-form__option">
          <input type="radio" id="level-all" name="level" value="all" checked />
          <label for="level-all">전체</label>
        </div>
      </fieldset>

      <div class="filter-form__field">
        <label for="sort">정렬</label>
        <select id="sort" name="sort">
          <option value="latest">최신순</option>
        </select>
      </div>

      <button type="reset" class="filter-form__reset">초기화</button>
    </form>

    <div class="filter-result">
      <p class="filter-result__count">총 6개</p>

      <ul class="result-list">
        <li class="result-list__item">
          <article class="result-card">
            <h3 class="result-card__title">...</h3>
            <p class="result-card__description">...</p>
            <ul class="result-card__tags">
              <li class="result-card__tag">HTML</li>
            </ul>
          </article>
        </li>
      </ul>
    </div>
  </section>
</main>
```

## 완료 기준

- HTML 문법 오류 없이 작성되어 있다.
- `main`, `section`, `form`, `fieldset`, `legend`, `label`, `input`, `select`, `ul/li`가 역할에 맞게 사용되어 있다.
- 카테고리 checkbox는 복수 선택 가능한 구조다.
- 난이도 radio는 같은 `name`으로 묶여 하나만 선택된다.
- 모든 입력 요소는 label과 연결되어 있다.
- 결과 개수와 결과 목록이 작성되어 있다.
- CSS 없이도 문서 구조를 읽었을 때 필터와 결과 흐름이 자연스럽다.

## 면접에서 설명할 수 있는 문장

> 필터 UI는 사용자가 조건을 선택하는 폼이기 때문에 `form`을 사용했고, 관련 있는 조건들은 `fieldset`과 `legend`로 묶었습니다.

> 카테고리는 여러 개를 동시에 선택할 수 있어 `checkbox`를 사용했고, 난이도는 하나만 선택하는 조건이라 같은 `name`을 가진 `radio`로 구성했습니다.

> 모든 입력 요소는 `label`과 연결해 클릭 영역과 접근성을 확보했고, 결과 목록은 반복 콘텐츠이므로 `ul/li` 구조로 작성했습니다.
