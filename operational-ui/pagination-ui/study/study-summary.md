# Pagination UI 요점정리

## 이번 스터디 목표

운영자가 목록 데이터의 현재 위치와 이동 가능한 페이지를 이해할 수 있는 Pagination UI를 HTML, SCSS, vanilla JavaScript로 나누어 구현한다.

이번 과제의 핵심은 버튼을 예쁘게 배치하는 것이 아니라, 현재 페이지와 이동 가능 여부, 전체 데이터 범위를 명확하게 전달하는 것이다.

## 진행 파트

```txt
Part 1. HTML 마크업
- nav
- aria-label
- 이전 / 다음 버튼
- 페이지 번호 버튼
- aria-current="page"
- disabled
- 총 개수 / 현재 표시 범위

Part 2. SCSS/CSS
- 페이지네이션 버튼 그룹
- 현재 페이지 스타일
- disabled 스타일
- hover / focus-visible

Part 3. JavaScript
- currentPage 상태
- 이전 / 다음 이동
- 페이지 번호 클릭
- aria-current 갱신
- disabled 갱신
- 현재 표시 범위 텍스트 갱신

Part 4. 리뷰
- 페이지네이션 접근성 체크
- 서버 페이지네이션 관점
- React 전환 관점
```

## Part 1에서 볼 핵심

Pagination UI에서는 사용자가 현재 위치와 이동 가능 여부를 바로 이해할 수 있어야 한다.

```txt
nav
- 페이지 이동 컨트롤 영역

aria-label
- 어떤 탐색 영역인지 설명

aria-current="page"
- 현재 페이지를 보조기술에 전달

disabled
- 이동할 수 없는 이전 / 다음 버튼 상태

총 개수 / 현재 표시 범위
- 전체 데이터 규모와 현재 보고 있는 범위 제공
```

## Part 1에서 정리한 판단

Part 1을 진행하면서 아래 내용을 확인했다.

```txt
- 페이지 번호를 span이 아니라 button으로 보는 이유
- URL 이동이 있는 경우 a가 더 적절할 수 있는 이유
- 현재 페이지에 aria-current="page"가 필요한 이유
- 이전 / 다음 버튼의 disabled 상태가 필요한 이유
- 총 개수와 현재 표시 범위가 운영 UI에서 중요한 이유
```

## Part 2에서 볼 핵심

Pagination UI 스타일에서는 버튼을 꾸미는 것보다 상태를 구분하는 것이 중요하다.

```txt
pagination
- 총 개수 문장과 페이지 이동 컨트롤을 한 묶음으로 관리
- 좁은 화면에서 줄바꿈될 수 있도록 flex-wrap 사용

pagination__count
- 총 개수와 현재 표시 범위를 설명하는 문장
- p 태그의 기본 margin을 제거해 레이아웃을 안정화

pagination button
- 이전 / 다음 / 페이지 번호 버튼의 공통 스타일
- 얇은 border와 흰 배경으로 운영 UI 톤 유지

aria-current="page"
- 현재 페이지 버튼을 시각적으로 강조

disabled
- 이동할 수 없는 이전 / 다음 버튼을 흐리게 표현

focus-visible
- 키보드 사용자가 현재 포커스 위치를 알 수 있게 함
```

## Part 2에서 정리한 판단

Pagination UI에서 가장 먼저 구분되어야 하는 상태는 이동 가능 여부와 현재 위치다.

```txt
- 현재 페이지는 primary 색상으로 강조한다.
- 이동할 수 없는 버튼은 disabled 스타일로 표현한다.
- 현재 페이지와 disabled 상태는 색상만이 아니라 HTML 속성과 함께 관리한다.
- count 문장과 버튼 그룹은 좁은 화면에서 겹치지 않도록 flex-wrap과 gap을 둔다.
```

## Part 3에서 볼 핵심

Pagination JavaScript는 DOM 조작보다 계산 로직의 비중이 높았다.

```txt
currentPage
- 현재 페이지 상태

totalItems
- 전체 데이터 수

pageSize
- 한 페이지에 보여줄 데이터 수

totalPages
- 전체 페이지 수
- Math.ceil(totalItems / pageSize)

visiblePageCount
- 한 번에 보여줄 페이지 번호 버튼 수

currentGroup
- 현재 페이지가 몇 번째 페이지 번호 그룹에 속하는지

startPage / endPage
- 현재 페이지 번호 그룹에서 처음과 마지막으로 보여줄 페이지 번호

startItem / endItem
- 현재 페이지에서 실제로 보여주는 데이터 범위
```

## Part 3에서 정리한 판단

Pagination JS에서는 값의 단위를 구분하는 것이 중요했다.

```txt
페이지 단위
- currentPage
- totalPages
- visiblePageCount
- currentGroup
- startPage
- endPage

데이터 개수 단위
- totalItems
- pageSize
- startItem
- endItem
```

특히 `endPage`는 페이지 번호이므로 전체 데이터 수인 `totalItems`가 아니라 전체 페이지 수인 `totalPages`와 비교해야 한다.

```txt
endPage
- 마지막으로 보여줄 페이지 번호
- totalPages를 넘으면 안 됨

endItem
- 현재 페이지에서 마지막으로 보여줄 데이터 번호
- totalItems를 넘으면 안 됨
```

## JavaScript 구현 흐름

```txt
1. currentPage를 상태로 둔다.
2. totalItems, pageSize, visiblePageCount로 totalPages를 계산한다.
3. currentPage 기준으로 currentGroup, startPage, endPage를 계산한다.
4. currentPage 기준으로 startItem, endItem을 계산한다.
5. 현재 표시 범위 텍스트를 갱신한다.
6. 이전 / 다음 버튼의 disabled 상태를 갱신한다.
7. 페이지 번호 버튼의 textContent를 현재 그룹에 맞게 갱신한다.
8. 현재 페이지 버튼에 aria-current="page"를 설정한다.
9. 전체 페이지 수를 넘어가는 버튼은 hidden으로 감춘다.
```

## 페이지네이션 계산식

페이지네이션에서는 페이지 번호 단위와 데이터 개수 단위를 나눠서 계산한다.

### 전체 페이지 수

```js
const totalPages = Math.ceil(totalItems / pageSize);
```

```txt
예: 총 128명, 10명씩 표시
128 / 10 = 12.8
올림해서 13페이지
```

### 현재 페이지 그룹

```js
const currentGroup = Math.ceil(currentPage / visiblePageCount);
```

```txt
visiblePageCount = 5

1-5페이지   => 1그룹
6-10페이지  => 2그룹
11-13페이지 => 3그룹
```

### 현재 그룹의 시작/끝 페이지

```js
const startPage = (currentGroup - 1) * visiblePageCount + 1;
const endPage = Math.min(startPage + visiblePageCount - 1, totalPages);
```

```txt
currentPage = 12
currentGroup = 3

startPage = (3 - 1) * 5 + 1
          = 11

endPage = Math.min(11 + 5 - 1, 13)
        = Math.min(15, 13)
        = 13

결과: 11, 12, 13만 표시
```

`endPage`는 페이지 번호이므로 `totalItems`가 아니라 `totalPages`와 비교한다.

### 현재 페이지의 데이터 표시 범위

```js
const startItem = (currentPage - 1) * pageSize + 1;
const endItem = Math.min(currentPage * pageSize, totalItems);
```

```txt
currentPage = 2
pageSize = 10

startItem = (2 - 1) * 10 + 1
          = 11

endItem = Math.min(2 * 10, 128)
        = 20

결과: 11-20명 표시
```

```txt
currentPage = 13
pageSize = 10

startItem = 121
endItem = Math.min(130, 128)
        = 128

결과: 121-128명 표시
```

## 배열과 DOM을 다루는 감각

Table UI에서 처음 낯설었던 `Array.from()` 흐름이 이번 Pagination UI에서는 조금 더 자연스럽게 느껴졌다.

```txt
querySelectorAll
- 페이지 번호 버튼들을 NodeList로 가져옴

Array.from
- NodeList를 실제 배열로 바꿈
- forEach로 각 버튼을 순회하며 상태를 갱신하기 쉬워짐

pageArray.forEach
- 각 버튼의 aria-current를 초기화
- index를 사용해 현재 페이지 그룹의 pageNumber를 계산
- 존재하지 않는 페이지 번호는 hidden 처리
```

이번에는 `Array.from()`이 단순 문법이라기보다, DOM 요소 목록을 배열처럼 다루기 위한 준비 단계라는 점이 조금 더 눈에 들어왔다.

## 어려웠던 점

이번 Pagination UI는 HTML과 SCSS는 비교적 수월했지만, JavaScript 계산 로직은 복잡하게 느껴졌다.

```txt
- 버튼 UI는 단순해 보여도 currentPage 기준으로 파생되는 값이 많았다.
- 페이지 번호 단위와 데이터 개수 단위를 구분하는 것이 중요했다.
- currentGroup, startPage, endPage 계산은 아직 손에 완전히 익지는 않았다.
- 완성된 코드만 보면 여전히 어렵게 느껴진다.
- 구현 순서를 작게 나누고 힌트 주석을 따라가니 어디서 막히는지 확인할 수 있었다.
- 다만 숫자를 직접 대입하면 어떤 값이 나와야 하는지 따라갈 수 있게 되었다.
```

이번 단계의 목표는 공식을 외우는 것이 아니라, 각 값이 어떤 의미를 가지는지 구분하는 것이다.

```txt
currentPage가 바뀌면
- 표시 범위가 바뀐다.
- 이전 / 다음 disabled 상태가 바뀐다.
- 페이지 번호 그룹이 바뀔 수 있다.
- aria-current가 이동한다.
```

## 진행 방식 회고

이번 Pagination UI는 필터보다 과제가 쉽다기보다, 구현 순서를 더 잘게 나누고 맞춰가며 진행해서 조금 더 안정적으로 느껴졌다.

```txt
좋았던 점
- 정답 코드를 바로 받기보다 힌트 주석을 기준으로 직접 작성했다.
- 완료된 TODO 주석은 리뷰 후 제거해 코드가 깔끔하게 남았다.
- currentPage 하나를 기준으로 화면 상태가 어떻게 바뀌는지 따라갔다.

아쉬운 점
- 배열과 조건을 다루는 로직은 아직 반복 학습이 필요하다.
- 계산식이 여러 개 겹치면 완성된 코드만 보고는 흐름이 쉽게 꼬인다.
- 다음에 다시 볼 때는 숫자를 직접 대입하며 page 단위와 item 단위를 먼저 구분해야 한다.
```

## 면접에서 설명할 수 있는 문장

> Pagination UI에서는 사용자가 현재 몇 페이지에 있는지, 어느 페이지로 이동할 수 있는지, 전체 데이터 중 어느 범위를 보고 있는지 알 수 있어야 합니다.

> 현재 페이지에는 `aria-current="page"`를 제공해 시각적 강조뿐 아니라 보조기술에도 현재 위치를 전달했습니다.

> 첫 페이지의 이전 버튼처럼 실행할 수 없는 액션은 숨기지 않고 `disabled`로 표현해 페이지네이션 구조는 유지하면서 현재 상태를 명확히 전달했습니다.

> 존재하지 않는 페이지 번호는 `disabled`가 아니라 `hidden`으로 감춰, 사용자가 추가 페이지가 있는 것처럼 오해하지 않게 했습니다.

> 페이지네이션 JavaScript에서는 페이지 번호 단위와 데이터 개수 단위를 구분해 `totalPages`, `startPage`, `endPage`, `startItem`, `endItem`을 계산했습니다.

## 다음 단계

다음에 이어서 본다면 Pagination UI의 계산 로직을 다시 한 번 숫자 대입으로 복습하고, 이후 React 전환 관점에서 `currentPage`, `totalPages`, `pageSize`를 어떻게 state와 props로 나눌지 정리한다.
