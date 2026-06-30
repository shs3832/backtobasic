# 필터 UI 요점정리

## 이번 스터디 목표

상품 리스트를 조건에 따라 필터링하는 UI를 HTML, SCSS, vanilla JavaScript로 나누어 구현한다.

이번 과제의 핵심은 필터 폼 구조를 의미 있게 잡고, 선택 조건에 따라 결과 목록을 갱신하는 흐름을 이해하는 것이다.

## 진행 예정 파트

```txt
Part 1. HTML 마크업
- form
- fieldset / legend
- checkbox / radio / select
- label 연결
- 결과 목록 구조

Part 2. SCSS/CSS 스타일링
- 필터 영역과 결과 영역 배치
- 체크박스/라디오/셀렉트 기본 스타일
- 결과 카드 스타일
- 반응형 대응
- focus-visible

Part 3. JavaScript 인터랙션
- 선택된 필터 값 읽기
- 조건에 맞는 결과만 표시
- 결과 개수 갱신
- 정렬 처리
- 초기화 버튼 처리
- 빈 결과 상태 처리

Part 4. 리뷰
- 폼 접근성 체크
- 실무에서 깨질 수 있는 부분
- React 전환 관점
- 면접 답변 정리
```

## Part 1에서 볼 핵심

필터 UI는 탭이나 아코디언처럼 패널을 열고 닫는 구조보다, 사용자가 조건을 선택하는 **폼 UI**에 가깝다.

따라서 ARIA 속성을 많이 추가하기보다 HTML 폼 요소의 기본 의미를 잘 사용하는 것이 중요하다.

```txt
form
- 필터 조건 전체를 감싸는 영역

fieldset
- 관련 있는 입력 요소 묶음

legend
- fieldset 그룹의 제목

label
- 입력 요소의 이름
- 클릭 영역 확대
- 보조기술에 입력 목적 전달

checkbox
- 여러 개 선택 가능

radio
- 같은 name 안에서 하나만 선택 가능

select
- 정렬처럼 정해진 옵션 중 하나를 선택
```

## 접근성 기본 체크

필터 UI에서 가장 먼저 확인할 것은 입력 요소와 이름의 연결이다.

```html
<input type="checkbox" id="category-html" name="category" value="html" />
<label for="category-html">HTML</label>
```

`label`의 `for` 값과 `input`의 `id`가 일치해야 한다.

radio는 같은 그룹 안에서 하나만 선택되어야 하므로 같은 `name` 값을 사용한다.

```html
<input type="radio" name="level" value="all" />
<input type="radio" name="level" value="basic" />
<input type="radio" name="level" value="advanced" />
```

## Part 2에서 볼 핵심

필터 UI의 스타일은 과한 커스텀보다 **폼 요소의 기본 사용성을 유지하면서 정렬과 위계를 보완하는 것**이 중요하다.

```txt
필터 영역
- 사용자가 조건을 조작하는 컨트롤 영역
- 카드형 박스로 구분
- fieldset / legend의 그룹 위계 유지

결과 영역
- 조건에 따라 표시되는 콘텐츠 영역
- 제목, 설명, 태그, 난이도 순으로 시각 위계 구성
- 모바일 1열, 넓은 화면 2열로 읽기 흐름 유지
```

checkbox, radio, select는 브라우저 기본 UI를 유지하고, 간격과 정렬만 보완했다.

```scss
.filter__options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
```

키보드 사용자가 현재 조작 중인 요소를 알 수 있도록 `focus-visible`을 공통으로 지정했다.

```scss
.filter {
  input:focus-visible,
  select:focus-visible,
  button:focus-visible {
    outline: 3px solid $color-primary;
    outline-offset: 3px;
  }
}
```

hover 스타일은 실제 hover가 가능한 환경에서만 적용했다.

```scss
@media (hover: hover) {
  .filter__reset:hover {
    color: $color-primary;
  }
}
```

결과 목록은 설명형 카드라 3열보다 1~2열이 더 읽기 좋다고 판단했다.

```scss
.result-list {
  display: grid;
  grid-template-columns: 1fr;
}

@media screen and (min-width: 768px) {
  .result-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

`minmax(0, 1fr)`은 정해진 열 수 안에서 칸을 균등하게 나누되, 내부 콘텐츠 때문에 그리드가 밀리는 문제를 줄이기 위해 사용한다.

## 면접에서 설명할 수 있는 문장

> 필터 UI는 사용자가 조건을 선택하는 폼이기 때문에 `form`을 사용하고, 관련 있는 조건은 `fieldset`과 `legend`로 묶었습니다.

> 카테고리는 복수 선택이 가능하므로 `checkbox`, 난이도는 하나만 선택하는 조건이므로 같은 `name`을 가진 `radio`로 구성했습니다.

> 모든 입력 요소는 `label`과 연결해 클릭 영역과 접근성을 확보하고, 결과 목록은 반복 콘텐츠라 `ul/li` 구조로 작성했습니다.

> 필터 영역은 조작 영역이라 카드형 박스로 구분하고, 결과 카드는 콘텐츠 가독성 중심으로 정리했습니다. 폼 요소는 브라우저 기본 UI를 유지하면서 간격, 정렬, 포커스 스타일만 보완했습니다.

> radio는 같은 `name`을 가진 항목들이 하나의 그룹으로 동작하기 때문에 Tab 키로는 checked 된 항목에 진입하고, 그룹 내부 선택은 방향키로 이동하는 것이 일반적인 브라우저 동작입니다.

## 다음 단계 메모

Part 3에서는 JavaScript로 필터 조건을 읽고 결과 목록을 갱신한다.

코드를 작성할 때는 다음 관점으로 검토한다.

```txt
- 선택된 checkbox 값을 어떻게 수집할 것인가
- 선택된 radio 값을 어떻게 읽을 것인가
- data-category / data-level 기준으로 결과를 필터링할 수 있는가
- 결과 개수를 필터 결과와 동기화할 수 있는가
- reset 후 화면 상태도 함께 초기화되는가
- 결과가 없을 때 빈 상태 메시지를 제공할 것인가
```
