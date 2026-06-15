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
└─ study04/
   ├─ goal.md
   ├─ study-summary.md
   └─ responsive-card-list/
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

- 탭 UI 과제 시작
- 탭 구조의 접근성 속성 학습
- 선택 상태와 키보드 이동 처리 연습

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
