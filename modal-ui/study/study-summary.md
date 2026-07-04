# 모달 UI 요점정리

## 이번 스터디 목표

접근성 기본기 마지막 과제로 모달 UI를 HTML, SCSS, vanilla JavaScript로 구현했다.

이번 과제의 핵심은 모달을 화면에 띄우는 것만이 아니라, 모달이 열렸을 때 사용자의 작업 흐름과 키보드 포커스가 모달 내부로 자연스럽게 이동하고, 닫혔을 때 원래 흐름으로 돌아오도록 만드는 것이다.

## 구현 구조

```txt
modal-ui/study/
├─ index.html
├─ scss/
│  ├─ style.scss
│  ├─ _variables.scss
│  ├─ _reset.scss
│  └─ _modal.scss
├─ css/
│  └─ style.min.css
└─ js/
   └─ main.js
```

## HTML에서 정리한 핵심

모달 열기 버튼은 페이지 이동이 아니라 현재 페이지 안의 UI 상태를 바꾸는 동작이므로 `button`으로 작성했다.

```html
<button type="button" class="modal-open">삭제 확인 모달 열기</button>
```

모달 컨테이너는 일반 `div`만으로는 보조기술에 대화상자 의미가 전달되지 않으므로 `role="dialog"`를 사용했다.

```html
<div
  class="modal"
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  hidden
>
```

`role="dialog"`는 이 영역이 대화상자라는 역할을 전달하고, `aria-modal="true"`는 모달이 열린 동안 사용자의 주요 작업 범위가 모달 내부라는 의미를 전달한다.

모달 제목과 설명은 각각 `aria-labelledby`, `aria-describedby`로 연결했다.

```html
<h2 class="modal__title" id="modal-title">항목을 삭제하시겠습니까?</h2>
<p class="modal__desc" id="modal-desc">
  삭제한 항목은 복구할 수 없습니다. 계속 진행하시겠습니까?
</p>
```

닫기 버튼의 `x`는 시각적 아이콘에 가깝기 때문에 `aria-label`로 실제 버튼 이름을 제공하고, `x` 자체는 `aria-hidden="true"`로 숨겼다.

```html
<button type="button" class="modal__close" aria-label="모달 닫기">
  <span aria-hidden="true">x</span>
</button>
```

초기 상태의 모달은 `hidden`으로 감춰둔다. 이렇게 하면 화면에서 보이지 않을 뿐 아니라, 닫힌 모달이 보조기술 흐름에 먼저 노출되는 것도 막을 수 있다.

## CSS에서 정리한 핵심

모달 레이어는 뷰포트 전체를 덮어야 하므로 `position: fixed`와 `inset: 0`을 사용했다.

```scss
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
}
```

`inset: 0`은 `top`, `right`, `bottom`, `left`를 모두 0으로 지정하는 축약형이다.

모달 박스는 레이어 안에서 중앙에 배치하기 위해 `display: grid`와 `place-items: center`를 사용했다.

```scss
.modal {
  display: grid;
  place-items: center;
}
```

같은 중앙 정렬은 flex로도 가능하지만, 모달처럼 자식 요소가 하나인 레이어에서는 `grid + place-items`가 간결하다.

모달 박스의 너비는 `min(100%, 420px)`로 잡았다.

```scss
.modal__content {
  width: min(100%, 420px);
}
```

데스크톱에서는 420px 이상 과하게 넓어지지 않도록 제한하고, 모바일에서는 화면 너비가 420px보다 작아질 때 100% 기준으로 자연스럽게 줄어든다.

`hidden` 상태는 CSS에서도 한 번 더 보장했다.

```scss
.modal[hidden] {
  display: none;
}
```

`.modal`에 `display: grid`가 있으므로, hidden 상태에서도 확실히 보이지 않도록 `[hidden]` 스타일을 명시하는 것이 안전하다.

키보드 사용자가 현재 조작 위치를 알 수 있도록 버튼에는 `focus-visible` 스타일을 적용했다.

```scss
button:focus-visible {
  outline: 3px solid $color-primary;
  outline-offset: 3px;
}
```

## JavaScript에서 정리한 핵심

모달 열기 버튼을 누르면 `hidden`을 해제하고 모달 내부의 닫기 버튼으로 포커스를 이동했다.

```js
function openModal() {
  modal.hidden = false;
  closeButton.focus();
}
```

모달은 화면에 보이는 것만으로는 충분하지 않고, 키보드 포커스도 모달 내부로 이동해야 사용자가 현재 작업 영역이 바뀌었음을 알 수 있다.

모달을 닫을 때는 다시 `hidden` 상태로 만들고, 모달을 열었던 버튼으로 포커스를 돌려줬다.

```js
function closeModal() {
  modal.hidden = true;
  openButton.focus();
}
```

이렇게 하면 사용자는 모달을 열기 전 위치로 자연스럽게 복귀할 수 있다.

ESC 키로 닫는 동작은 모달이 열려 있을 때만 실행되도록 방어했다.

```js
if (modal.hasAttribute("hidden")) return;

if (event.key === "Escape") {
  closeModal();
  return;
}
```

`event.key`는 예전의 keyCode 방식보다 읽기 쉽고, 어떤 키 입력을 처리하는지 코드에서 바로 드러난다.

## Focus Trap

모달이 열린 동안 Tab 포커스가 배경 콘텐츠로 빠져나가지 않도록 focus trap을 적용했다.

```js
if (event.key === "Tab") {
  const focusableElements = getFocusableElements();
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement =
    focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstFocusableElement) {
    event.preventDefault();
    lastFocusableElement.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === lastFocusableElement) {
    event.preventDefault();
    firstFocusableElement.focus();
  }
}
```

focus trap의 판단 기준은 다음과 같다.

```txt
Shift + Tab
- 현재 포커스가 첫 번째 요소라면 모달 밖 이전 요소로 나가려는 상황
- 기본 이동을 막고 마지막 요소로 포커스를 보냄

Tab
- 현재 포커스가 마지막 요소라면 모달 밖 다음 요소로 나가려는 상황
- 기본 이동을 막고 첫 번째 요소로 포커스를 보냄
```

`event.shiftKey`는 Shift 키를 함께 누른 상태인지 알려주고, `document.activeElement`는 현재 포커스를 가진 요소를 알려준다.

focus trap은 단순 편의 기능이 아니라, `aria-modal="true"`로 모달 상태를 알린 뒤 실제 키보드 흐름도 모달 내부에 머무르게 하는 접근성 심화 처리다.

## tabindex 판단

역할에 맞는 HTML을 사용하면 `tabindex`는 대부분 필요하지 않다.

```txt
button, a, input, select, textarea
- 기본적으로 키보드 포커스를 받을 수 있음
```

`tabindex="-1"`은 사용자가 Tab으로 접근할 필요는 없지만 JavaScript로 포커스를 보내야 하는 요소에 사용할 수 있다.

```html
<h2 id="modal-title" tabindex="-1">항목을 삭제하시겠습니까?</h2>
```

짧은 확인 모달에서는 닫기 버튼이나 취소 버튼처럼 첫 번째 조작 요소로 포커스를 보내도 충분하다. 내용이 길고 제목을 먼저 읽는 것이 중요한 모달이라면 제목에 `tabindex="-1"`을 주고 제목으로 포커스를 보낼 수 있다.

양수 `tabindex`는 문서의 자연스러운 포커스 순서를 깨기 쉬우므로 피하는 것이 좋다.

## 접근성 체크 포인트

- 모달을 여는 요소가 `button`인가
- 모달 컨테이너에 `role="dialog"`가 있는가
- 모달 상태를 `aria-modal="true"`로 전달하는가
- 제목과 설명이 `aria-labelledby`, `aria-describedby`로 연결되어 있는가
- 닫기 버튼의 접근 가능한 이름이 명확한가
- 닫힌 모달은 `hidden` 상태인가
- 모달이 열릴 때 포커스가 모달 내부로 이동하는가
- 모달이 닫힐 때 포커스가 원래 열기 버튼으로 복귀하는가
- ESC로 모달을 닫을 수 있는가
- Tab / Shift + Tab 포커스가 모달 내부에서 순환하는가

## 면접에서 설명할 수 있는 문장

> 모달은 `role="dialog"`와 `aria-modal="true"`로 대화상자 역할과 모달 상태를 보조기술에 전달하도록 구성했습니다.

> 모달의 제목과 설명은 `aria-labelledby`, `aria-describedby`로 연결해 모달이 열렸을 때 목적과 내용을 함께 이해할 수 있도록 했습니다.

> 모달이 열릴 때는 내부 닫기 버튼으로 포커스를 이동시키고, 닫을 때는 모달을 열었던 버튼으로 포커스를 복귀시켜 키보드 사용자의 흐름을 유지했습니다.

> ESC 키로 닫을 수 있게 하고, 모달이 닫힌 상태에서는 키 이벤트가 불필요하게 동작하지 않도록 방어했습니다.

> focus trap은 모달 내부의 첫 번째와 마지막 포커스 요소를 기준으로 Tab 이동이 바깥으로 빠져나가려는 순간 기본 이동을 막고 반대쪽 요소로 포커스를 보내는 방식으로 구현했습니다.

## 다음 단계 메모

모달 UI까지 진행하면서 접근성 중심 UI 기본기 1회독을 마무리했다.

다음 단계에서는 카드 리스트, 탭, 아코디언, 필터, 폼 검증, 모달을 한 번에 돌아보며 접근성 전체 회고를 정리한다. 이후에는 테이블, 페이지네이션, 드롭다운, 토스트 같은 운영 UI 개발 패턴으로 확장한다.
