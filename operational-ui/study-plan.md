# 운영 UI 개발 패턴 스터디 계획

## 스터디 목적

접근성 중심 UI 기본기 1회독 이후, 운영/관리자 화면에서 자주 사용하는 UI 패턴을 HTML, SCSS, vanilla JavaScript로 구현한다.

이번 단계의 목표는 화려한 화면을 만드는 것이 아니라, 많은 데이터를 안정적으로 보여주고 사용자가 반복 작업을 빠르게 처리할 수 있는 UI 구조를 익히는 것이다.

## 진행 기준

운영 UI는 접근성 기본기에서 다룬 구조와 상태 제어를 바탕으로, 다음 질문을 함께 본다.

```txt
- 데이터를 어떻게 보여줄 것인가
- 상태를 어떻게 구분할 것인가
- 사용자가 원하는 정보를 어떻게 빨리 찾을 것인가
- 반복 작업을 어떻게 줄일 것인가
- 비어 있음, 로딩, 오류 상태를 어떻게 보여줄 것인가
- 실수하기 쉬운 액션을 어떻게 안전하게 처리할 것인가
- React 컴포넌트로 옮긴다면 어떤 상태와 props로 나눌 것인가
```

## 권장 폴더 구조

운영 UI 패턴은 `operational-ui/` 아래에 과제별로 분리한다.

```txt
operational-ui/
├─ study-plan.md
├─ table-ui/
│  └─ study/
│     ├─ goal.md
│     ├─ study-summary.md
│     ├─ index.html
│     ├─ scss/
│     │  ├─ style.scss
│     │  ├─ _variables.scss
│     │  ├─ _reset.scss
│     │  └─ _table.scss
│     ├─ css/
│     │  └─ style.min.css
│     └─ js/
│        └─ main.js
├─ pagination-ui/
│  └─ study/
├─ dropdown-ui/
│  └─ study/
├─ toast-ui/
│  └─ study/
└─ admin-list-ui/
   └─ study/
```

## 진행 방식

접근성 스터디와 비슷하게 파트별로 진행한다.

```txt
Part 1. HTML 마크업
- 구조와 시맨틱
- 접근성 기본 속성
- 데이터가 들어갈 자리

Part 2. SCSS/CSS
- 레이아웃
- 상태 스타일
- 반응형/overflow
- hover/focus-visible

Part 3. vanilla JavaScript
- 정렬, 열림/닫힘, 상태 변경
- 이벤트 위임
- DOM 갱신
- 키보드 조작

Part 4. 리뷰
- 실무에서 깨질 수 있는 부분
- 접근성 체크
- 면접 답변
- React 전환 관점
```

## 스터디 순서

### 1. Table UI

운영 UI에서 가장 기본이 되는 목록 화면 패턴이다.

학습 포인트:

- `table`, `caption`, `thead`, `tbody`, `th`, `td`
- `scope` 사용 기준
- 컬럼 정렬 버튼
- `aria-sort`
- 상태 배지
- 행 액션 버튼
- 빈 상태
- 긴 텍스트 말줄임
- 가로 스크롤
- 체크박스 선택 확장 가능성

Part 구성:

```txt
Part 1. 테이블 HTML 마크업
Part 2. 테이블 SCSS/CSS 스타일링
Part 3. 정렬 JavaScript
Part 4. 리뷰와 React 전환 관점
```

### 2. Pagination UI

목록 데이터가 많을 때 현재 위치와 이동 가능한 페이지를 명확히 보여주는 패턴이다.

학습 포인트:

- 이전/다음 버튼
- 현재 페이지
- 비활성 버튼
- `aria-current="page"`
- 총 개수와 현재 범위 텍스트
- 서버 페이지네이션으로 확장되는 관점

### 3. Dropdown / Action Menu UI

운영 화면에서 상태 변경, 더보기 액션, 필터 옵션 등에 자주 사용되는 패턴이다.

학습 포인트:

- 열기 버튼과 메뉴 연결
- `aria-expanded`
- `aria-controls`
- ESC 닫기
- 바깥 클릭 닫기
- 키보드 이동
- 메뉴 항목 역할

### 4. Toast / Notification UI

저장, 삭제, 실패 같은 작업 결과를 사용자에게 알려주는 패턴이다.

학습 포인트:

- 성공/오류/경고 상태
- 자동 사라짐
- 수동 닫기
- `aria-live`
- 여러 알림이 쌓일 때의 처리

### 5. Admin List UI

운영 UI 패턴을 조합하는 종합 과제다.

학습 포인트:

- 검색
- 필터
- 테이블
- 페이지네이션
- 상태 배지
- 행 액션
- 빈 상태
- 로딩 상태
- 오류 상태

## 이번 단계에서 특히 볼 것

운영 UI는 작은 컴포넌트 하나보다 여러 상태가 함께 움직이는 화면이 많다.

```txt
검색어가 바뀜
필터가 바뀜
정렬이 바뀜
페이지가 바뀜
결과가 비어 있음
작업 성공/실패 알림이 뜸
```

vanilla JavaScript에서는 이 상태를 DOM과 직접 동기화하면서 이해하고, 이후 React에서는 이 값들이 state, props, derived data로 어떻게 나뉘는지 다시 해석한다.

## 접근성 기본기와 이어지는 부분

접근성 파트에서 배운 패턴은 운영 UI에서도 계속 사용한다.

```txt
button / a 역할 구분
fieldset / legend
aria-expanded
aria-current
aria-sort
aria-live
hidden
focus-visible
이벤트 위임
포커스 이동과 복귀
```

## 우선순위

가장 먼저 진행할 과제는 `Table UI`다.

운영 UI에서 테이블은 사용자, 주문, 상품, 권한, 로그, 정산 등 거의 모든 목록 화면의 기반이 되기 때문에 가장 실무성이 높다.
