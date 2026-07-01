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

## Part 3에서 볼 핵심

필터 UI의 JavaScript는 접근성 관점에서 **선택된 조건에 따라 결과의 표시 상태와 개수 피드백을 동기화하는 역할**을 한다.

```txt
change 이벤트
- checkbox / radio / select 값이 실제로 바뀌는 시점에 필터를 다시 적용

reset 이벤트
- form의 기본 초기화 동작이 끝난 뒤 결과 상태를 다시 계산
- setTimeout으로 실행 타이밍을 한 번 늦춤

hidden
- 필터 조건에 맞지 않는 결과 항목을 현재 결과 목록에서 제외
- CSS 클래스로만 숨기는 것보다 HTML 상태가 명확함

결과 개수
- 필터 적용 결과를 사용자가 바로 인지할 수 있는 피드백
```

이번 구현에서 사용한 주요 흐름은 다음과 같다.

```txt
1. form에서 선택된 checkbox 값을 배열로 수집
2. 선택된 radio 값을 단일 값으로 읽음
3. select의 정렬 값을 읽음
4. 각 결과 카드의 data-category / data-level을 읽음
5. some / includes로 카테고리 조건 비교
6. data-level로 난이도 조건 비교
7. 조건에 맞지 않는 항목은 hidden 처리
8. 표시되는 항목 수를 세어 결과 개수 텍스트 갱신
9. sort / localeCompare / 우선순위 객체로 정렬 확장
```

정렬 기능은 접근성 핵심이라기보다 JavaScript 기본기 확장에 가깝다. 특히 `map`, `some`, `includes`, `sort`, `localeCompare` 같은 배열/문자열 메서드는 별도 JS 연습 과제로 다시 복습할 필요가 있다.

이번 JS 학습에서 느낀 점:

```txt
- 처음부터 함수를 잘게 나누면 구조는 깔끔하지만 학습 중에는 값의 흐름을 추적하기 어렵다.
- 학습용 구현은 한 함수 안에서 먼저 흐름을 완성한 뒤, 동작을 확인하고 리팩토링하는 방식이 더 이해하기 쉽다.
- 접근성 스터디의 목표와 JavaScript 로직 심화 목표를 구분해서 다룰 필요가 있다.
```

## 면접에서 설명할 수 있는 문장

> 필터 UI는 사용자가 조건을 선택하는 폼이기 때문에 `form`을 사용하고, 관련 있는 조건은 `fieldset`과 `legend`로 묶었습니다.

> 카테고리는 복수 선택이 가능하므로 `checkbox`, 난이도는 하나만 선택하는 조건이므로 같은 `name`을 가진 `radio`로 구성했습니다.

> 모든 입력 요소는 `label`과 연결해 클릭 영역과 접근성을 확보하고, 결과 목록은 반복 콘텐츠라 `ul/li` 구조로 작성했습니다.

> 필터 영역은 조작 영역이라 카드형 박스로 구분하고, 결과 카드는 콘텐츠 가독성 중심으로 정리했습니다. 폼 요소는 브라우저 기본 UI를 유지하면서 간격, 정렬, 포커스 스타일만 보완했습니다.

> radio는 같은 `name`을 가진 항목들이 하나의 그룹으로 동작하기 때문에 Tab 키로는 checked 된 항목에 진입하고, 그룹 내부 선택은 방향키로 이동하는 것이 일반적인 브라우저 동작입니다.

> JavaScript는 선택된 조건을 읽고 결과 항목의 `data-*` 값과 비교한 뒤, 조건에 맞지 않는 항목을 `hidden`으로 제외하고 결과 개수를 갱신하는 역할로 사용했습니다.

> 정렬은 제목 텍스트를 `localeCompare("ko")`로 비교하고, 난이도는 `basic`, `advanced`에 숫자 우선순위를 부여해 의도한 순서로 처리했습니다.

## 다음 단계 메모

접근성 중심의 필터 UI는 여기서 마무리한다.

다음 접근성 스터디 후보:

```txt
- Form Validation UI
  - aria-invalid
  - aria-describedby
  - 에러 메시지 연결
  - submit 시 오류 안내

- Modal Dialog
  - role="dialog"
  - aria-modal
  - focus 이동
  - ESC 닫기

- Table UI
  - caption
  - th scope
  - 정렬 가능한 컬럼
  - 빈 상태
```

별도 JavaScript 복습 과제:

```txt
- NodeList와 Array 차이
- Array.from / map
- some / includes
- sort / localeCompare
- data-* 기반 필터링
- 한 함수 안에서 구현 후 리팩토링하는 흐름
```
