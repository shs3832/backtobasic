# Back to Basic - UI Publisher Study

퍼블리셔 기반 UI 개발자의 실무 기본기를 다시 손에 익히기 위한 스터디 저장소입니다.

목표는 알고리즘 코딩테스트 대비가 아니라, 퍼블리셔/프론트엔드 퍼블리셔/웹 UI 개발자 공고에서 나올 수 있는 기본 구현 과제를 작게 나누어 반복 연습하는 것입니다.

## 스터디 목적

- HTML, CSS/SCSS, vanilla JavaScript 기본 구현 감각 회복
- 운영 UI, 공통 UI, 레거시 개선에 필요한 마크업/스타일 구조 점검
- 접근성 기본 속성과 시맨틱 마크업 습관화
- 반응형 UI를 깨지지 않게 구성하는 연습
- 나중에 React 컴포넌트로 옮기기 쉬운 구조 설계
- 면접에서 "왜 이렇게 구현했는지" 설명할 수 있는 코드 작성

## 진행 방식

하나의 과제를 한 번에 길게 구현하지 않고, 파트별로 나누어 진행합니다.

예시 흐름:

```txt
Part 1. HTML 마크업
Part 2. SCSS/CSS 구조
Part 3. 반응형 레이아웃
Part 4. UI 디테일과 상태 스타일
Part 5. vanilla JavaScript 인터랙션
Part 6. 리뷰, 면접 답변, React 전환 관점 정리
```

각 파트에서는 구현보다 먼저 다음을 확인합니다.

- 이번 파트의 목표
- 구현 범위
- 완료 기준
- 접근성 체크 포인트
- 실무에서 깨지기 쉬운 부분
- 면접에서 설명할 수 있는 문장

## 스터디 운영 원칙

- 과제는 실무 코딩테스트처럼 짧고 명확하게 제시합니다.
- 처음부터 정답 코드를 주기보다, 의도 질문을 먼저 던지고 답변을 바탕으로 보완점을 정리합니다.
- 코드 수정은 명시적인 수정 지시가 있을 때만 진행합니다.
- 학습 중 나온 개념은 스터디가 끝날 때 `study-summary.md`로 정리합니다.
- 스터디 정리 후 저장소의 흐름이나 목록 갱신이 필요하면 `README.md`도 함께 수정합니다.
- 너무 고급 아키텍처로 가지 않고, 유지보수 가능한 기본 구현을 우선합니다.

## 디렉터리 구조

```txt
backtobasic/
├─ README.md
├─ study01/
│  ├─ goal.md
│  ├─ study-summary.md
│  └─ responsive-card-list/
│     └─ index.html
├─ study02/
│  ├─ goal.md
│  ├─ study-summary.md
│  └─ responsive-card-list/
│     ├─ index.html
│     ├─ scss/
│     └─ css/
├─ study03/
│  ├─ goal.md
│  ├─ study-summary.md
│  └─ responsive-card-list/
│     ├─ index.html
│     ├─ scss/
│     ├─ css/
│     └─ js/
├─ study04/
│  ├─ goal.md
│  ├─ study-summary.md
│  └─ responsive-card-list/
│     ├─ index.html
│     ├─ scss/
│     ├─ css/
│     └─ js/
├─ tab-ui/
│  ├─ study01/
│  │  ├─ goal.md
│  │  ├─ study-summary.md
│  │  └─ index.html
│  ├─ study02/
│  │  ├─ goal.md
│  │  ├─ study-summary.md
│  │  ├─ index.html
│  │  ├─ scss/
│  │  └─ css/
│  └─ study03/
│     ├─ goal.md
│     ├─ study-summary.md
│     ├─ index.html
│     ├─ scss/
│     ├─ css/
│     └─ js/
├─ accordion-ui/
│  └─ study/
│     ├─ goal.md
│     ├─ study-summary.md
│     ├─ index.html
│     ├─ scss/
│     ├─ css/
│     └─ js/
└─ filter-ui/
   └─ study/
      ├─ goal.md
      ├─ study-summary.md
      ├─ index.html
      ├─ scss/
      ├─ css/
      └─ js/
```

## 스터디 목록

| Study | 주제 | 상태 | 정리 |
| --- | --- | --- | --- |
| study01 | 반응형 카드 리스트 - HTML 마크업 | 완료 | [study-summary.md](./study01/study-summary.md) |
| study02 | 반응형 카드 리스트 - SCSS/CSS | 완료 | [study-summary.md](./study02/study-summary.md) |
| study03 | 반응형 카드 리스트 - JavaScript 인터랙션 | 완료 | [study-summary.md](./study03/study-summary.md) |
| study04 | 반응형 카드 리스트 - 최종 리뷰 | 완료 | [study-summary.md](./study04/study-summary.md) |
| tab-ui/study01 | 탭 UI - HTML 마크업 | 완료 | [study-summary.md](./tab-ui/study01/study-summary.md) |
| tab-ui/study02 | 탭 UI - SCSS/CSS 스타일링 | 완료 | [study-summary.md](./tab-ui/study02/study-summary.md) |
| tab-ui/study03 | 탭 UI - JavaScript 인터랙션 | 완료 | [study-summary.md](./tab-ui/study03/study-summary.md) |
| accordion-ui/study | 아코디언 UI - HTML/SCSS/JavaScript | 완료 | [study-summary.md](./accordion-ui/study/study-summary.md) |
| filter-ui/study | 필터 UI - HTML/SCSS | 진행 중 | [study-summary.md](./filter-ui/study/study-summary.md) |

## Study 01 - 반응형 카드 리스트

첫 번째 과제는 반응형 카드 리스트입니다.

Part 1로 HTML 마크업을 중심으로 진행했습니다.

학습한 핵심 내용:

- `main`, `section`, `ul/li`, `article`의 역할
- `h1`, `h2`, `h3` heading 계층
- `aria-labelledby`, `aria-label`, `aria-pressed`, `aria-hidden`
- 이미지 `alt`와 장식 요소 처리
- 링크와 버튼의 역할 차이
- BEM 느낌의 클래스명과 유지보수성

## Study 02 - 반응형 카드 리스트 SCSS/CSS

Part 2로 SCSS 구조와 반응형 카드 리스트 스타일을 진행했습니다.

학습한 핵심 내용:

- SCSS `@use` 순서와 reset/component 출력 순서
- `_variables`, `_mixins`, `_reset`, `_card` 파일 역할 분리
- CSS Grid의 `repeat`, `minmax`, `fr`, `gap`
- desktop-first와 mobile-first 미디어쿼리 차이
- `aspect-ratio`, `object-fit: cover`, `display: block`
- `line-clamp`를 이용한 제목/설명 2줄 제한
- `@media (hover: hover)`와 `focus-visible`
- `prefers-reduced-motion` 사용 기준

## Study 03 - 반응형 카드 리스트 JavaScript 인터랙션

Part 3으로 vanilla JavaScript를 사용해 찜하기 토글 기능을 구현했습니다.

학습한 핵심 내용:

- `DOMContentLoaded`와 `window.onload` 차이
- 이벤트 위임 방식
- `event.target`과 `closest`
- DOM이 없을 때 에러를 막는 방어 코드
- `getAttribute`로 읽은 문자열 상태를 boolean으로 변환하는 방식
- `aria-pressed`, `aria-label`, `textContent`, `classList` 동기화
- React의 state 기반 사고와 vanilla JS의 직접 DOM 갱신 차이

## Study 04 - 반응형 카드 리스트 최종 리뷰

Part 4로 HTML, SCSS/CSS, vanilla JavaScript 구현을 최종 점검하고 면접 답변과 React 전환 관점을 정리했습니다.

학습한 핵심 내용:

- HTML, CSS, JavaScript의 책임 분리
- `aria-pressed`를 토글 상태 기준으로 삼은 이유
- vanilla JS의 DOM 직접 갱신과 React의 state 기반 렌더링 차이
- React 전환 시 데이터 배열, `CardList`, `Card`, 상태 관리로 나누는 방식
- 실무에서 깨질 수 있는 HTML/CSS/JS 리스크
- 면접 답변을 짧고 판단 있게 말하는 방식

다음 단계:

- 탭 UI 과제 진행
- 탭 구조의 접근성 속성 학습
- 선택 상태와 키보드 이동 처리 관점 정리

## Tab UI Study 01 - HTML 마크업

탭 UI의 HTML 구조를 먼저 작성했습니다.

학습한 핵심 내용:

- 탭은 페이지 이동이 아니라 콘텐츠 전환 인터랙션이라는 점
- `button`과 `a`의 역할 차이
- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`
- 비활성 패널을 `hidden`으로 관리하는 방식
- 탭 버튼과 패널을 1:1로 연결하는 구조

## Tab UI Study 02 - SCSS/CSS 스타일링

탭 UI의 시각 스타일과 반응형 처리를 진행했습니다.

학습한 핵심 내용:

- 선택된 탭을 `[aria-selected="true"]` 기준으로 스타일링하는 방식
- `.is-active`와 ARIA 상태값의 차이
- `:focus-visible`을 통한 키보드 포커스 표시
- `@media (hover: hover)`로 hover 가능한 환경에만 hover 스타일 적용
- 탭 버튼과 패널 border가 겹칠 때 `margin-top: -1px`로 보정하는 방식
- 변수화할 값과 하드코딩해도 되는 값의 구분
- 모바일에서 탭 버튼을 `flex-wrap`으로 자연스럽게 줄바꿈 처리하는 방식

## Tab UI Study 03 - JavaScript 인터랙션

vanilla JavaScript로 탭 클릭 전환 기능을 구현했습니다.

학습한 핵심 내용:

- `DOMContentLoaded`와 `defer`의 역할
- 이벤트 위임으로 탭 버튼 클릭 처리
- `aria-controls`를 기준으로 연결 패널 찾기
- `target.querySelectorAll()`로 컴포넌트 내부 탐색 범위 제한
- 대상 패널을 먼저 확인한 뒤 상태를 초기화하는 방어 흐름
- `aria-selected`와 `hidden` 상태 동기화
- `hidden` boolean 속성을 `element.hidden = true/false`로 제어하는 방식
- 여러 탭 컴포넌트로 확장할 때 초기화 함수를 매개변수 기반으로 바꾸는 관점
- React로 전환할 때 선택된 탭 id를 state로 관리하는 사고방식

다음 단계:

- 아코디언 FAQ JavaScript 인터랙션 구현
- `aria-expanded`와 `hidden` 상태 동기화
- 여러 개 열림 허용 여부 같은 UI 정책 정리

## Accordion UI Study - HTML/SCSS/JavaScript

FAQ 아코디언 UI의 HTML 구조, 카드형 SCSS 스타일, JavaScript 클릭 토글 기능을 작성했습니다.

학습한 핵심 내용:

- 질문 버튼과 답변 패널을 연결하는 아코디언 구조
- `button`, `aria-expanded`, `aria-controls`, `aria-labelledby`, `hidden`
- FAQ 목록을 `ul/li`로 구성하는 이유
- `role="region"`의 사용 기준과 과할 수 있는 상황
- 질문과 답변을 하나의 카드처럼 보이게 하는 `accordion__item` 역할
- `+/-` 상태 표시를 `::after`로 처리하는 방식
- `[aria-expanded="true"]`를 기준으로 열린 상태 스타일링
- `:focus-visible`과 `@media (hover: hover)` 적용 기준
- 모바일 터치 영역과 긴 질문 문구 대응
- 피그마가 없을 때 가독성, 가시성, 상태 구분을 기준으로 스타일을 잡는 방식
- FAQ에 맞게 여러 개 동시 열림을 허용하는 정책
- 이벤트 위임으로 아코디언 버튼 클릭 처리
- `aria-controls`로 연결 패널 찾기
- `aria-expanded`와 `hidden` 상태 동기화
- DOM 요소나 연결 패널이 없을 때의 방어 코드
- React 전환 시 열린 항목을 state로 관리하는 관점

다음 단계:

- 필터 UI 과제 시작

## Filter UI Study - HTML/SCSS

상품 리스트를 조건에 따라 필터링하는 UI의 HTML 구조와 SCSS 스타일을 작성했습니다.

학습한 핵심 내용:

- 필터 UI는 탭/아코디언보다 폼 UI에 가깝다는 점
- `form`, `fieldset`, `legend`, `label`, `checkbox`, `radio`, `select`의 역할
- checkbox는 복수 선택, radio는 같은 `name` 안에서 단일 선택이라는 기준
- 결과 목록을 `ul/li`와 `article`로 구성하는 방식
- vanilla JS 필터링을 대비해 `data-category`, `data-level`을 두는 방식
- 필터 영역과 결과 영역을 역할에 따라 형제 section으로 분리하는 관점
- 폼 요소의 브라우저 기본 UI를 유지하고 간격/정렬만 보완하는 방식
- `focus-visible`을 input/select/button에 공통 적용하는 방식
- `@media (hover: hover)`로 hover 가능한 환경에만 hover 스타일 적용
- 결과 목록을 모바일 1열, 넓은 화면 2열로 구성하는 방식
- `repeat(2, minmax(0, 1fr))`로 균등한 2열과 overflow 안정성을 확보하는 방식

다음 단계:

- 필터 UI JavaScript 인터랙션 구현
- 선택된 checkbox/radio/select 값 읽기
- `data-*` 속성 기준으로 결과 목록 필터링
- 결과 개수와 빈 상태 메시지 갱신

## 앞으로 추가할 과제 후보

- 반응형 카드 리스트
- 탭 UI
- 아코디언 FAQ
- 반응형 헤더와 모바일 메뉴
- 폼 마크업과 기본 검증
- 모달 UI
- 리스트 필터 UI
- 간단한 운영 UI 대시보드 섹션

## 회고 기록 방식

각 스터디가 끝나면 해당 폴더에 요점 정리 파일을 남깁니다.

```txt
studyXX/
├─ goal.md
├─ study-summary.md
└─ ...
```

`study-summary.md`에는 다음 내용을 정리합니다.

- 이번 스터디 목표
- 구현 구조
- 중요한 개념
- 실무 판단 기준
- 접근성 체크 포인트
- 면접에서 설명할 수 있는 문장
- 다음 파트로 넘어가기 전 메모
