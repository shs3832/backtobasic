# Study 04 요점정리 - 반응형 카드 리스트 최종 리뷰

## 이번 스터디 목표

HTML, SCSS/CSS, vanilla JavaScript로 나눠 구현한 반응형 카드 리스트 과제를 최종 리뷰했다.

이번 파트의 목적은 새 기능을 추가하는 것이 아니라, 지금까지 구현한 내용을 실무와 면접 관점에서 설명 가능한 형태로 정리하는 것이다.

- HTML, CSS, JS의 책임을 구분한다.
- 찜하기 상태 관리 기준을 설명한다.
- React로 전환할 때 사고방식이 어떻게 바뀌는지 정리한다.
- 실무에서 깨질 수 있는 지점을 점검한다.
- 면접 답변을 더 자연스럽고 짧게 정리하는 방식을 연습한다.
- 다음 과제 로드맵을 정한다.

## HTML, CSS, JS 책임 분리

이번 카드 리스트에서 각 기술의 역할은 다음처럼 정리할 수 있다.

```txt
HTML
- 구조화된 콘텐츠와 의미 담당
- 카드 리스트, 카드 항목, 제목, 설명, 링크, 버튼의 역할 정의
- aria-labelledby, aria-label, aria-pressed, aria-hidden 같은 접근성 속성의 기본 토대 제공

CSS
- 구조화된 콘텐츠를 시각적으로 표현
- Grid 레이아웃, 카드 스타일, 반응형, hover/focus 상태 담당
- 화면 크기와 콘텐츠 길이에 따라 레이아웃이 깨지지 않도록 표현 제어

JavaScript
- 사용자 인터랙션과 상태 변경 담당
- 찜하기 클릭 감지
- aria-pressed, aria-label, 버튼 텍스트, 상태 클래스 갱신
- 이벤트 위임으로 반복 카드 버튼 처리
```

짧게 기억하면 다음과 같다.

```txt
HTML = 무엇이 있는가
CSS = 어떻게 보이는가
JS = 어떻게 반응하는가
```

면접에서 설명할 수 있는 문장:

> HTML은 카드 리스트의 콘텐츠와 의미 구조를 담당하고, CSS는 그 구조를 반응형 카드 UI로 시각화합니다. JavaScript는 사용자의 찜하기 클릭을 처리해 버튼 상태와 접근성 속성을 갱신하는 역할을 맡습니다.

## 찜하기 상태 기준

이번 구현에서는 찜하기 상태를 `aria-pressed` 기준으로 판단했다.

```js
const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
```

`aria-pressed`를 기준으로 삼은 이유는 찜하기 버튼이 눌림/해제 상태가 유지되는 토글 버튼이기 때문이다.

```txt
aria-pressed
- 토글 버튼의 의미 있는 상태
- true / false로 현재 눌림 상태 표현
- 보조기술에 현재 상태 전달
- JS 상태 판단 기준으로 사용 가능

textContent
- 화면에 보이는 문구
- 사용자가 상태를 시각적으로 이해하도록 도움

is-active
- CSS 스타일 적용을 위한 클래스
- 선택 상태를 시각적으로 표현
```

면접에서 설명할 수 있는 문장:

> 찜하기 버튼은 눌림/해제 상태가 유지되는 토글 버튼이므로 `aria-pressed`를 상태 기준으로 사용했습니다. 버튼 텍스트도 상태를 보여줄 수 있지만, `aria-pressed`는 보조기술에 현재 눌림 상태를 명확히 전달하는 속성이기 때문에 시각 표현인 텍스트나 스타일 클래스보다 상태 기준으로 더 적절하다고 판단했습니다.

## React 전환 관점

vanilla JavaScript에서는 DOM을 직접 찾아서 수정했다.

```js
favoriteButton.setAttribute("aria-pressed", "true");
favoriteButton.setAttribute("aria-label", `${title} 찜하기 취소`);
favoriteButton.classList.add("is-active");
favoriteButton.textContent = "찜함";
```

React에서는 DOM을 직접 조작하기보다 상태를 바꾸고, 그 상태에 따라 UI가 렌더링되도록 만든다.

```txt
vanilla JS
- DOM을 찾아서 직접 변경

React
- 상태를 변경하고 UI는 상태를 기준으로 다시 표현
```

개념적으로는 다음처럼 바뀐다.

```jsx
<button
  aria-pressed={isFavorite}
  aria-label={`${title} ${isFavorite ? "찜하기 취소" : "찜하기"}`}
  className={`card__favorite ${isFavorite ? "is-active" : ""}`}
>
  {isFavorite ? "찜함" : "찜하기"}
</button>
```

면접에서 설명할 수 있는 문장:

> vanilla JavaScript에서는 클릭 시 `setAttribute`, `classList`, `textContent`로 DOM을 직접 갱신했습니다. React로 전환하면 찜하기 여부를 `useState` 같은 상태로 관리하고, 그 상태값에 따라 `aria-pressed`, `aria-label`, `className`, 버튼 텍스트가 렌더링되도록 구성할 수 있습니다.

## React 데이터와 컴포넌트 구조

React로 전환하면 HTML에 카드 3개를 직접 반복 작성하기보다, 카드 데이터를 객체 배열로 분리하고 `map`으로 렌더링하는 구조가 좋다.

```js
const cards = [
  {
    id: 1,
    badge: "Responsive",
    title: "반응형 카드 레이아웃",
    description: "CSS Grid를 사용해 화면 너비에 따라 카드 열 수가 바뀌는 UI입니다.",
    tags: ["HTML", "SCSS", "Grid"],
    imageAlt: "반응형 카드 레이아웃 예시 화면",
  },
];
```

컴포넌트는 다음처럼 나눌 수 있다.

```txt
CardList
- cards 배열을 map으로 순회
- Card 컴포넌트 반복 렌더링

Card
- 카드 하나의 이미지, 배지, 제목, 설명, 태그, 액션 렌더링
- 찜하기 상태를 내부에서 관리하거나 상위에서 전달받음
```

찜하기 상태 위치는 상황에 따라 달라진다.

```txt
Card 내부 useState
- 카드 하나가 자기 찜 상태만 관리
- 간단한 UI에 적합

CardList 상위 useState
- 여러 카드의 찜 상태를 한 번에 관리
- 저장, 필터, 서버 전송 등 확장에 유리
```

면접에서 설명할 수 있는 문장:

> React로 전환한다면 카드 정보를 HTML에 직접 반복 작성하지 않고, 카드 데이터를 객체 배열로 분리한 뒤 `map`으로 렌더링할 수 있습니다. 카드 목록은 `CardList`, 카드 하나는 `Card` 컴포넌트로 나누면 데이터와 UI 구조가 분리되어 유지보수하기 쉬워집니다.

## React에서 SCSS 클래스 구조

React로 전환하더라도 기존 SCSS의 BEM 기반 클래스 구조는 최대한 유지하는 편이 좋다.

```txt
card-section
card-list
card-list__item
card
card__title
card__favorite
```

이유:

- HTML/SCSS에서 이미 역할이 정리되어 있다.
- React 전환 시 시각 스타일을 다시 만들 필요가 없다.
- `CardList`, `Card` 컴포넌트 경계와 클래스 구조가 잘 맞는다.
- 마크업과 스타일의 이식성이 좋아진다.

React에서는 `class`를 `className`으로 바꾸고, `is-active` 같은 상태 클래스만 state에 따라 조건부로 붙이면 된다.

면접에서 설명할 수 있는 문장:

> React로 전환하더라도 기존 SCSS의 BEM 기반 클래스 구조는 최대한 유지할 수 있다고 봅니다. 이미 `card-list`, `card`, `card__title`처럼 역할이 분리되어 있기 때문에 `CardList`와 `Card` 컴포넌트 경계와도 잘 맞습니다. React에서는 `class`를 `className`으로 바꾸고, `is-active` 같은 상태 클래스만 state에 따라 조건부로 붙이면 됩니다.

## 실무에서 깨질 수 있는 부분

### HTML 리스크

카드가 추가되거나 문구가 바뀌면서 접근성 속성이 누락될 수 있다.

예:

```txt
새 카드 추가
-> 이미지 alt 복붙 누락
-> 찜하기 aria-label이 이전 카드 제목으로 남음
```

또는 카드 제목이 없으면 JavaScript에서 `aria-label` 생성 시 기본값 `"카드"`로 떨어질 수 있다.

### CSS 리스크

긴 제목, 긴 설명, 긴 태그 때문에 카드 레이아웃이 밀릴 수 있다.

예:

```txt
태그가 8개로 늘어남
긴 영문 단어가 들어옴
360px 모바일에서 버튼 영역이 줄바꿈됨
이미지 비율이 깨짐
```

그래서 `line-clamp`, `flex-wrap`, `min-width`, `overflow-wrap` 같은 처리를 상황에 따라 검토해야 한다.

### JS 리스크

DOM 구조나 클래스명이 바뀌면 이벤트 위임 로직이 동작하지 않을 수 있다.

예:

```txt
.card__favorite 클래스명이 바뀜
.card__title이 없어짐
.card-list가 다른 이름으로 바뀜
```

그래서 방어 코드와 명확한 클래스 계약이 중요하다.

### 리소스 로딩 실패

리소스 로딩 실패도 실무에서 고려할 수 있다.

```txt
이미지 로딩 실패
- alt 텍스트가 대체 정보 역할
- aspect-ratio로 이미지 영역을 잡아 레이아웃 흔들림 완화

CSS 로딩 실패
- HTML 시맨틱 구조가 남아 콘텐츠 흐름은 유지됨

JS 로딩 실패
- 찜하기 인터랙션은 안 되지만 버튼 텍스트와 기본 의미는 남음
```

면접에서 설명할 수 있는 문장:

> 실무에서는 콘텐츠가 늘어나거나 문구가 길어질 때 카드 높이와 버튼 영역이 깨질 수 있고, 클래스명이나 DOM 구조가 바뀌면 JS 이벤트 위임 로직이 동작하지 않을 수 있습니다. 또한 이미지 로딩 실패 시에도 레이아웃이 크게 흔들리지 않도록 `aspect-ratio`로 이미지 영역을 잡고, 대체 텍스트를 제공했습니다.

## 30초 설명 연습

처음 답변은 큰 줄기는 맞았지만, 구현한 순서대로 말하는 느낌이 있었다.

면접에서는 다음 순서로 말하면 더 자연스럽다.

```txt
1. 무엇을 만든 과제인지
2. HTML 구조를 어떻게 잡았는지
3. CSS 반응형을 어떻게 처리했는지
4. JS 인터랙션을 어떻게 처리했는지
5. 접근성을 어떻게 반영했는지
```

30초 답변 예시:

> 이 과제는 콘텐츠 카드들을 화면 크기에 맞게 보여주는 반응형 카드 리스트 예제입니다. HTML은 반복 콘텐츠라는 성격에 맞게 `ul/li`로 목록을 구성하고, 카드 하나는 제목과 설명, 이미지, 액션을 가진 독립 콘텐츠라 `article`로 작성했습니다. CSS는 Grid를 사용해 데스크톱 3열, 태블릿 2열, 모바일 1열로 전환되도록 했고, 이미지 영역은 `aspect-ratio`로 비율을 유지했습니다. JavaScript는 카드 리스트에 이벤트를 위임해 찜하기 버튼을 처리했고, `aria-pressed`와 `aria-label`을 함께 갱신해 시각 상태와 접근성 상태가 어긋나지 않도록 했습니다.

더 짧은 답변:

> 반응형 카드 리스트를 구현한 과제입니다. HTML은 `ul/li`와 `article`로 반복 카드 구조를 의미 있게 잡았고, CSS는 Grid와 브레이크포인트를 사용해 3열, 2열, 1열로 전환되도록 했습니다. JavaScript는 이벤트 위임 방식으로 찜하기 버튼을 처리했으며, `aria-pressed`, `aria-label`, 버튼 텍스트를 함께 갱신해 접근성 상태와 화면 표시가 일치하도록 했습니다.

## 면접 답변 방식

GPT처럼 너무 길고 정돈된 답변은 오히려 기계적으로 들릴 수 있다.

경력자 답변은 유창함보다 짧고 납득되는 판단이 중요하다.

추천 답변 구조:

```txt
기준
-> 선택
-> 이유
-> 예외/보완
```

짧은 템플릿:

```txt
~라서 ~했습니다.
~한 경우엔 다르게 할 수 있습니다.
```

예:

> 카드 하나만 떼어놔도 제목, 설명, 이미지가 있는 콘텐츠라 `article`을 썼습니다. 단순 목록이면 `li`만 써도 된다고 봅니다.

예:

> 카드 리스트는 열 구조가 명확해서 Grid를 썼습니다. Flex로도 가능하지만 3열, 2열, 1열 전환은 Grid가 더 단순했습니다.

예:

> 버튼이 여러 개라 부모인 `.card-list`에 이벤트를 걸었습니다. 카드가 늘어나도 이벤트를 따로 붙이지 않아도 되는 구조라서요.

면접에서 중요한 것은 완벽한 문장이 아니라, 기준 없이 외운 답변이 아니라는 점을 보여주는 것이다.

## 현재 느낀 점

React만 계속 파는 것만으로는 충분하지 않다는 점을 확인했다.

React가 감싸고 있는 바닥에는 결국 다음 기본기가 있다.

```txt
HTML 구조
CSS 레이아웃
DOM 이벤트
상태 변화
접근성 속성
```

특히 운영 UI, 공통 UI, 레거시 개선 포지션에서는 React가 없는 환경이나 vanilla JS/jQuery가 섞인 환경도 만날 수 있다.

그래서 React 학습과 별개로 HTML, CSS, DOM 기본기를 함께 다지는 것이 필요하다.

정리:

> React는 구현 방식이고, HTML/CSS/DOM 기본기는 UI를 판단하는 기반이다.

## 다음 과제 로드맵

카드 리스트 과제는 Study 04에서 마무리하고, 다음 과제는 탭 UI로 진행한다.

추천 흐름:

```txt
study05 = 탭 UI
study06 = 아코디언 FAQ
```

카드 리스트, 탭 UI, 아코디언 FAQ까지 끝내면 퍼블리셔 코딩테스트에서 자주 나오는 반복 UI, 상태 UI, 접근성 속성의 기본 흐름은 한 번 훑었다고 볼 수 있다.

다만 운영 UI와 레거시 개선까지 고려하면 이후에 아래 과제도 이어서 하는 것이 좋다.

```txt
폼 UI
- label/input 연결
- 에러 메시지
- aria-invalid
- aria-describedby
- required

모달
- focus trap
- ESC 닫기
- aria-modal
- role="dialog"
- 배경 스크롤 제어

반응형 헤더/모바일 메뉴
- nav 구조
- 메뉴 열림/닫힘
- aria-expanded
- resize 대응
- focus 관리

데이터 테이블 또는 필터 리스트
- caption/th/scope
- 정렬/필터 UI
- 빈 상태/로딩 상태
```

## Part 4 체크리스트

- HTML, CSS, JS의 책임을 구분해 설명할 수 있는가?
- `aria-pressed`를 상태 기준으로 사용한 이유를 설명할 수 있는가?
- vanilla JS와 React의 상태 처리 차이를 설명할 수 있는가?
- React 전환 시 데이터, 컴포넌트, state가 어떻게 나뉘는지 말할 수 있는가?
- 실무에서 깨질 수 있는 지점을 HTML/CSS/JS 관점으로 말할 수 있는가?
- 카드 리스트 과제를 30초 안에 설명할 수 있는가?
- 다음 과제로 탭 UI를 진행할 준비가 되었는가?
