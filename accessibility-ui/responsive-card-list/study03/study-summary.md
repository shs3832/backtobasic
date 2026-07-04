# Study 03 요점정리 - 반응형 카드 리스트 JavaScript 인터랙션

## 이번 스터디 목표

HTML과 SCSS/CSS로 만든 카드 리스트에 vanilla JavaScript로 찜하기 토글 기능을 구현했다.

이번 파트의 목적은 복잡한 프론트엔드 구조를 만드는 것이 아니라, DOM을 직접 다루는 기본 흐름을 다시 손에 익히는 것이다.

- DOM이 준비된 뒤 스크립트를 실행한다.
- 반복되는 버튼을 이벤트 위임 방식으로 처리한다.
- 클릭된 대상이 실제 처리 대상인지 확인한다.
- `aria-pressed` 값을 기준으로 토글 상태를 읽고 변경한다.
- 시각 상태와 접근성 상태를 함께 갱신한다.
- DOM 요소가 없을 때 에러가 나지 않도록 방어 코드를 작성한다.

## 최종 코드 흐름

```js
function addFavorite() {
  const target = document.querySelector(".card-list");
  if (!target) return;

  target.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".card__favorite");
    const cardTarget = event.target.closest(".card");
    if (!favoriteButton) return;

    const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
    const title = cardTarget?.querySelector(".card__title")?.textContent.trim() ?? "카드";

    if (isPressed) {
      favoriteButton.setAttribute("aria-pressed", "false");
      favoriteButton.setAttribute("aria-label", `${title} 찜하기`);
      favoriteButton.classList.remove("is-active");
      favoriteButton.textContent = "찜하기";
    } else {
      favoriteButton.setAttribute("aria-pressed", "true");
      favoriteButton.setAttribute("aria-label", `${title} 찜하기 취소`);
      favoriteButton.classList.add("is-active");
      favoriteButton.textContent = "찜함";
    }
  });
}

document.addEventListener("DOMContentLoaded", addFavorite);
```

## 이벤트 위임

이벤트 위임은 여러 자식 요소에 이벤트를 각각 붙이지 않고, 공통 부모 요소에 이벤트를 한 번만 등록해서 처리하는 방식이다.

이번 과제에서는 찜하기 버튼이 카드마다 반복되므로 `.card-list`에 클릭 이벤트를 한 번만 등록했다.

```js
const target = document.querySelector(".card-list");

target.addEventListener("click", (event) => {
  ...
});
```

장점:

- 카드 개수가 늘어나도 이벤트 리스너를 추가로 붙일 필요가 없다.
- 반복 UI에 잘 맞는다.
- 나중에 카드가 동적으로 추가되어도 같은 방식으로 처리할 수 있다.

면접에서 설명할 수 있는 문장:

> 찜하기 버튼이 카드마다 반복되기 때문에 각 버튼에 이벤트를 개별로 등록하지 않고, 공통 부모인 `.card-list`에 이벤트를 한 번만 등록했습니다. 이렇게 하면 카드 개수가 늘어나도 이벤트 바인딩이 늘어나지 않고, 반복 UI를 더 유연하게 처리할 수 있습니다.

## DOM 방어 코드

```js
const target = document.querySelector(".card-list");
if (!target) return;
```

`.card-list`가 없는 페이지에서 이 스크립트가 실행되면 `target.addEventListener`에서 에러가 날 수 있다.

그래서 요소가 없으면 함수를 종료하도록 방어 코드를 작성했다.

실무에서는 공통 JS 파일이 여러 페이지에 같이 들어가는 경우가 있으므로, DOM이 없을 때 에러가 나지 않도록 처리하는 습관이 중요하다.

## closest

```js
const favoriteButton = event.target.closest(".card__favorite");
```

`closest()`는 현재 클릭된 요소에서 시작해 부모 방향으로 올라가며 조건에 맞는 가장 가까운 요소를 찾는다.

이벤트 위임에서는 `.card-list` 안의 모든 클릭이 들어올 수 있다.

```txt
이미지 클릭
제목 클릭
태그 클릭
상세보기 링크 클릭
찜하기 버튼 클릭
```

이 중 실제로 처리해야 하는 것은 찜하기 버튼 클릭뿐이다.

그래서 클릭 지점이 `.card__favorite` 버튼이거나 그 내부인 경우에만 처리한다.

```js
if (!favoriteButton) return;
```

면접에서 설명할 수 있는 문장:

> 이벤트 위임 방식에서는 부모 요소에서 클릭 이벤트를 받기 때문에 카드 내부의 다양한 클릭이 모두 들어올 수 있습니다. 그래서 `event.target.closest(".card__favorite")`로 클릭 지점이 찜하기 버튼 또는 그 내부인지 확인하고, 버튼이 아닌 경우에는 `return`으로 종료했습니다.

## aria-pressed 읽기

```js
const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
```

`getAttribute()`는 문자열을 반환한다.

```txt
aria-pressed="true"  -> "true"
aria-pressed="false" -> "false"
속성이 없음          -> null
```

문자열 `"false"`는 JavaScript 조건문에서 truthy로 평가될 수 있다.

그래서 값을 그대로 조건문에 넣지 않고, `"true"`와 명시적으로 비교해 boolean 값으로 변환했다.

```txt
"true" === "true"  -> true
"false" === "true" -> false
null === "true"    -> false
```

면접에서 설명할 수 있는 문장:

> `getAttribute`는 문자열을 반환하기 때문에 `aria-pressed="false"`도 문자열 `"false"`로 읽힙니다. 문자열을 그대로 조건문에 쓰면 의도와 다르게 truthy로 처리될 수 있어, `"true"`와 명시적으로 비교해 boolean 상태로 변환했습니다.

## 상태 갱신

찜하기 버튼은 클릭 시 여러 상태가 함께 바뀌어야 한다.

```txt
aria-pressed
- 보조기술에 토글 버튼의 현재 눌림 상태 전달

aria-label
- 반복되는 버튼이 어떤 카드의 찜하기인지, 현재 어떤 동작을 하는지 전달

is-active
- CSS에서 선택된 상태를 시각적으로 표현하기 위한 상태 클래스

textContent
- 화면을 보는 사용자에게 현재 상태를 텍스트로 표시
```

하나만 바꾸면 사용자에 따라 정보가 어긋날 수 있다.

예를 들어 텍스트만 `찜함`으로 바꾸고 `aria-pressed`가 여전히 `false`라면, 화면 사용자와 보조기술 사용자가 서로 다른 상태를 전달받게 된다.

정리:

```txt
시각 상태
- textContent
- is-active

접근성 상태
- aria-pressed
- aria-label
```

## 카드 제목으로 aria-label 만들기

```js
const cardTarget = event.target.closest(".card");
const title = cardTarget?.querySelector(".card__title")?.textContent.trim() ?? "카드";
```

반복되는 찜하기 버튼은 모두 화면상 `찜하기`라는 텍스트를 가진다.

그래서 스크린리더 사용자에게 어떤 카드의 찜하기 버튼인지 더 명확히 전달하기 위해 카드 제목을 읽어 `aria-label`에 반영했다.

예:

```txt
반응형 카드 레이아웃 찜하기
반응형 카드 레이아웃 찜하기 취소
```

### optional chaining

```js
cardTarget?.querySelector(".card__title")?.textContent
```

`?.`는 중간 요소가 `null` 또는 `undefined`일 때 에러를 내지 않고 `undefined`를 반환하게 한다.

### null 병합 연산자

```js
?? "카드"
```

앞의 값이 `null` 또는 `undefined`일 때 기본값 `"카드"`를 사용한다.

정리:

```txt
카드 제목을 찾을 수 있음
-> 해당 제목으로 aria-label 생성

카드 제목을 찾을 수 없음
-> "카드" 기본값 사용
```

## DOMContentLoaded

```js
document.addEventListener("DOMContentLoaded", addFavorite);
```

`DOMContentLoaded`는 HTML 문서 파싱이 끝나 DOM 요소를 찾을 수 있게 된 시점에 실행된다.

이번 찜하기 기능은 이미지나 폰트 로딩이 필요하지 않고, 버튼 DOM만 있으면 되기 때문에 `window.onload`보다 `DOMContentLoaded`가 더 적절하다.

```txt
DOMContentLoaded
- HTML 파싱이 끝나면 실행
- DOM 이벤트 연결에 적합
- 이미지, CSS, 폰트 로딩까지 기다리지 않음

window.onload
- 이미지, CSS, 폰트 등 전체 리소스가 로드된 후 실행
- 더 늦게 실행됨
- 이미지 크기 계산처럼 리소스 로드가 필요한 경우에 적합
```

면접에서 설명할 수 있는 문장:

> 찜하기 기능은 이미지 같은 외부 리소스가 아니라 DOM 요소에 이벤트를 연결하는 작업이므로, 전체 리소스 로드를 기다리는 `window.onload`보다 DOM 파싱이 끝난 시점에 실행되는 `DOMContentLoaded`를 사용했습니다.

## React와 다른 점

React에서는 상태를 바꾸면 UI가 다시 렌더링된다.

```jsx
setIsFavorite((prev) => !prev);
```

하지만 vanilla JavaScript에서는 DOM을 직접 갱신해야 한다.

```txt
현재 상태 읽기
다음 상태 판단하기
attribute 바꾸기
class 바꾸기
text 바꾸기
```

이번 스터디에서 가장 중요한 감각은 다음이다.

```txt
vanilla JS에서는 상태를 자동으로 반영해주지 않는다.
현재 상태를 읽고, 다음 상태를 계산하고, DOM에 직접 반영해야 한다.
```

## 보완하면 좋은 점

현재 코드는 동작하지만, 최종 정리 단계에서 아래를 다듬으면 더 좋다.

### 함수명

현재 함수명:

```js
function addFavorite() {}
```

이 함수는 찜하기를 즉시 추가하는 함수라기보다, 찜하기 이벤트를 초기화하는 함수에 가깝다.

더 적절한 이름:

```js
function initFavoriteToggle() {}
```

또는:

```js
function bindFavoriteEvents() {}
```

`toggleFavorite`는 실제 토글 처리만 별도 함수로 분리할 때 더 잘 어울린다.

### 변수명

현재:

```js
const target = document.querySelector(".card-list");
```

보완:

```js
const cardList = document.querySelector(".card-list");
```

`target`보다 `cardList`가 역할을 더 명확하게 드러낸다.

### 다음 상태 분리

현재 코드도 동작하지만, 현재 상태와 다음 상태를 분리하면 실수를 줄일 수 있다.

```js
const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
const nextPressed = !isPressed;
```

```txt
isPressed
- 현재 상태

nextPressed
- 클릭 후 상태
```

이렇게 하면 `false`일 때 다시 `false`를 넣는 실수를 줄일 수 있다.

## Part 3 최종 체크리스트

- `js/main.js`가 연결되어 있는가?
- DOM이 준비된 뒤 이벤트를 연결하는가?
- `.card-list`가 없을 때 에러 없이 종료되는가?
- 이벤트 위임 방식으로 처리하는가?
- 클릭 대상이 `.card__favorite`인지 확인하는가?
- `aria-pressed` 값을 boolean으로 변환해 상태 판단하는가?
- 클릭 후 `aria-pressed` 값이 반대로 바뀌는가?
- 클릭 후 `aria-label`이 카드 제목 기준으로 바뀌는가?
- 클릭 후 버튼 텍스트가 `찜하기` / `찜함`으로 바뀌는가?
- 클릭 후 `is-active` 클래스가 토글되는가?
- 디버그용 `console.log`를 제거했는가?

## 면접에서 설명할 수 있는 문장

찜하기 버튼은 카드마다 반복되는 요소이므로 각 버튼에 이벤트를 개별 등록하지 않고, 공통 부모인 `.card-list`에 이벤트를 등록해 이벤트 위임 방식으로 처리했습니다.

부모에서 클릭 이벤트를 받으면 카드 내부의 여러 클릭이 모두 들어올 수 있기 때문에 `event.target.closest(".card__favorite")`로 실제 처리 대상이 찜하기 버튼인지 먼저 확인했습니다.

버튼의 상태는 `aria-pressed` 값을 기준으로 읽었고, `getAttribute`가 문자열을 반환하기 때문에 `"true"`와 명시적으로 비교해 boolean 상태로 변환했습니다.

상태가 바뀔 때는 화면 사용자와 보조기술 사용자에게 같은 상태가 전달되도록 `aria-pressed`, `aria-label`, 버튼 텍스트, 상태 클래스를 함께 갱신했습니다.

## 다음 파트로 넘어가기 전 메모

Part 4에서는 반응형 카드 리스트 과제를 최종 점검하고, React 전환 관점으로 정리한다.

다음 파트에서 집중할 내용:

- HTML, SCSS, JS 전체 구조 리뷰
- 실제 브라우저에서 반응형/키보드 동작 확인
- 함수명과 변수명 최종 정리
- React로 전환할 때 데이터, 컴포넌트, state가 어떻게 나뉘는지 정리
