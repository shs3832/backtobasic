# Table UI 요점정리

## 이번 스터디 목표

운영자가 사용자 목록을 확인하는 Admin Table UI를 HTML, SCSS, vanilla JavaScript로 나누어 구현한다.

이번 과제의 핵심은 테이블을 예쁘게 꾸미는 것이 아니라, 많은 데이터를 안정적으로 읽을 수 있도록 표의 의미 구조와 상태 표현, 정렬 흐름을 단계별로 익히는 것이다.

## 진행 파트

```txt
Part 1. HTML 마크업
- table
- caption
- thead / tbody
- th / td
- scope="col"
- scope="row"
- 행 액션 버튼

Part 2. SCSS/CSS - 운영 테이블 가독성 및 상태 표현
- 테이블 컨테이너
- 헤더 / 셀 간격
- 행 구분선
- 긴 텍스트 처리
- 상태 배지
- hover / focus-visible
- 좁은 화면 대응

Part 3. JavaScript 정렬
- 정렬 버튼
- 클릭 이벤트
- 데이터 정렬
- DOM 갱신
- aria-sort

Part 4. 리뷰
- 테이블 접근성 체크
- 실무에서 깨질 수 있는 부분
- 면접 답변 정리
- React 전환 관점
```

## Part 1에서 볼 핵심

Table UI에서는 데이터의 열과 행 관계가 명확해야 한다.

```txt
caption
- 테이블이 어떤 데이터를 담고 있는지 설명

thead
- 컬럼 제목 영역

tbody
- 실제 데이터 행 영역

th scope="col"
- 열 제목

th scope="row"
- 행의 대표값

button type="button"
- 행 단위 동작을 수행하는 액션
```

## Part 1에서 정리한 판단

Part 1을 진행하면서 아래 내용을 확인했다.

```txt
- caption이 화면 제목과 어떻게 다른지
- 컬럼 헤더와 행 헤더가 왜 구분되는지
- 사용자 이름을 td가 아니라 th scope="row"로 볼 수 있는 이유
- 상세 / 수정 액션을 링크가 아니라 버튼으로 보는 기준
- 삭제 액션을 별도 패턴으로 분리해야 하는 이유
```

## Part 2에서 볼 핵심

운영 UI의 CSS는 화려한 표현보다 가독성과 안정성이 중요하다.

```txt
페이지 배경과 테이블 표면 분리
- 데이터 영역을 빠르게 찾을 수 있게 함

thead 배경
- 컬럼 제목 영역과 실제 데이터 영역을 구분

th / td padding과 border
- 반복 데이터의 행과 열을 안정적으로 읽게 함

status-badge
- td는 셀 구조를 담당하고, 상태 텍스트 표현은 span이 담당
- 공통 스타일은 status-badge
- 상태별 스타일은 modifier class로 분리

table-action
- 테이블 안의 행 액션 버튼만 정확히 스타일링
- td button 같은 넓은 선택자보다 안전함

table-container
- 좁은 화면에서 테이블 구조를 찌그러뜨리지 않고 가로 스크롤로 확인
```

## Part 2에서 정리한 판단

운영 테이블은 데이터가 주인공이고, 스타일은 데이터를 안정적으로 읽도록 돕는 역할이다.

```txt
- 테이블 배경은 페이지 배경과 구분되게 둔다.
- 헤더 행은 본문과 구분되게 표현한다.
- 상태는 색상만이 아니라 텍스트를 반드시 유지한다.
- 상태 class와 화면 텍스트는 같은 의미를 가져야 한다.
- 액션 버튼은 너무 크거나 화려하면 데이터보다 시선이 튈 수 있다.
- 테이블 안의 특정 버튼은 class 기반 선택자로 스타일 범위를 좁힌다.
- 긴 데이터나 다국어 텍스트를 고려하면 min-width와 overflow-x가 필요하다.
```

## Part 3에서 볼 핵심

정렬 기능에서는 DOM 요소를 배열처럼 다루고, 정렬 결과를 다시 화면에 반영한다.

```txt
querySelectorAll
- 정렬 버튼과 tbody 안의 tr을 찾음

Array.from
- NodeList를 실제 배열로 바꿈
- 배열 안의 값은 문자열이 아니라 tr DOM 요소 참조

row.children
- tr 안의 th / td 셀을 순서대로 읽음

sort
- 비교값을 기준으로 tr 요소들의 순서를 바꿈

appendChild
- 기존 DOM 요소를 복사하지 않고 이동시킴
- 정렬된 배열 순서대로 tbody에 다시 배치

localeCompare
- 문자열을 한국어 기준으로 비교

aria-sort
- 현재 어떤 컬럼이 어떤 방향으로 정렬되었는지 보조기술에 전달
```

## Part 3에서 정리한 판단

정렬은 화면 순서만 바꾸는 기능이 아니라, 현재 정렬 상태까지 함께 관리해야 하는 UI 상태다.

```txt
- 정렬 버튼은 th 자체가 아니라 button으로 제공한다.
- data-sort-key를 사용하면 HTML에서도 정렬 기준을 파악할 수 있다.
- 정렬 대상은 개별 셀이 아니라 tr 행 전체다.
- 같은 컬럼을 다시 누르면 ascending / descending을 토글한다.
- 비교 결과를 그대로 쓰면 오름차순, 부호를 뒤집으면 내림차순이 된다.
- 화면 정렬 결과와 aria-sort 상태는 반드시 일치해야 한다.
- 모든 정렬 헤더의 aria-sort를 none으로 초기화한 뒤 현재 헤더만 갱신한다.
```

## 리팩토링 판단

처음부터 함수를 나누기보다, 먼저 한 흐름으로 동작하게 만든 뒤 역할이 보이는 부분을 분리했다.

```txt
getSortValue(row, sortKey)
- row에서 정렬 기준 값을 꺼냄
- 정렬 기준이 추가될 때 수정 지점이 됨

renderRows(rows)
- 정렬된 tr 요소들을 tbody에 다시 배치
- 작은 예제에서는 필수 분리는 아니지만 학습용으로 역할을 확인하기 좋음

updateAriaSort(button)
- 기존 aria-sort 상태를 clear
- 현재 클릭한 헤더에 currentSortDirection을 반영
- 접근성 상태 갱신이라는 책임이 분명함
```

## Part 4 리뷰

이번 Table UI는 코딩보다 관점 정리가 중요한 파트로 마무리했다.

```txt
실무에서 먼저 깨질 수 있는 지점
- 이메일, 식별자, 회사명, 로그 메시지처럼 길이를 예측하기 어려운 데이터 셀
- 다국어 환경에서 같은 의미의 텍스트가 더 길어지는 경우
- 액션 버튼이나 상태 배지가 반복되며 테이블보다 더 튀는 경우

접근성에서 잘 챙긴 지점
- caption으로 테이블 자체의 내용을 설명
- th scope="col"로 컬럼 제목 제공
- th scope="row"로 각 행의 대표값 제공
- 정렬 동작은 button으로 제공
- 정렬 결과와 aria-sort 상태를 함께 갱신

아쉬운 지점
- JavaScript 정렬 흐름은 아직 손에 완전히 익지는 않음
- Array.from, sort, appendChild가 함께 쓰이는 구조는 반복 학습이 필요
- 다만 DOM 요소를 배열화하고 tr 자체를 재배치한다는 흐름은 이해함
```

## React 전환 관점

React로 옮기면 DOM을 직접 재배치하기보다 데이터와 상태를 기준으로 다시 렌더링한다.

```txt
state가 될 값
- sortKey
- sortDirection

props 또는 state가 될 값
- users

계산값
- sortedUsers
- aValue / bValue 같은 정렬 비교용 임시 값

컴포넌트로 나눌 수 있는 부분
- UserTable
- StatusBadge
- TableActionButton
- SortButton
```

vanilla JavaScript에서는 이미 그려진 DOM에서 `tr`을 읽고 다시 배치했다.

```txt
DOM -> tr 배열화 -> 정렬 -> appendChild로 재배치
```

React에서는 원본 데이터와 정렬 상태를 기준으로 정렬된 배열을 계산하고 다시 렌더링한다.

```txt
users + sortKey + sortDirection -> sortedUsers -> map 렌더링
```

## 다음 운영 UI 과제로 이어지는 부분

다음 과제인 Pagination UI에서는 Table UI에서 배운 상태 관리와 접근성 상태 전달이 이어진다.

```txt
Table UI
- aria-sort
- 현재 정렬 기준과 방향을 전달

Pagination UI
- aria-current="page"
- 현재 페이지 위치를 전달
```

운영 UI에서는 정렬, 페이지, 선택, 열림, 오류 같은 상태가 자주 바뀐다. 화면에 보이는 상태와 HTML/ARIA에 반영되는 상태를 함께 맞추는 감각이 중요하다.

## 면접에서 설명할 수 있는 문장

> 테이블에서는 컬럼 제목은 `th scope="col"`로, 행을 대표하는 사용자 이름은 `th scope="row"`로 작성해 헤더와 데이터 셀의 관계를 명확히 했습니다.

> 상태값은 색상만으로 구분하지 않고 텍스트를 유지했으며, `status-badge` 공통 class와 상태별 modifier class로 표현을 분리했습니다.

> 정렬은 `tbody` 안의 `tr` 요소들을 배열로 바꾼 뒤, 각 행에서 비교할 값을 읽고 `sort()`로 행 요소 자체의 순서를 바꿔 다시 DOM에 배치했습니다.

> 정렬 후에는 화면 순서뿐 아니라 `aria-sort`도 갱신해 보조기술 사용자가 현재 정렬 기준과 방향을 알 수 있도록 했습니다.

> React로 전환하면 `sortKey`와 `sortDirection`은 state로 관리하고, 정렬된 목록은 원본 데이터와 정렬 상태에서 파생되는 계산값으로 다루는 것이 자연스럽습니다.

## 다음 단계

다음 운영 UI 과제는 Pagination UI다.
