# Toast / Notification UI 요점정리

## 스터디 목표

운영 화면에서 작업 결과를 성공 또는 오류 토스트로 알려주는 Toast / Notification UI를 HTML, SCSS, vanilla JavaScript로 구현했다.

이번 과제의 핵심은 토스트를 띄우는 것뿐 아니라, 성공/오류 알림의 성격을 구분하고 사용자가 작업 결과를 놓치지 않도록 표시 시간과 접근성 알림 강도를 조절하는 것이었다.

## Part 1. HTML 마크업

```txt
button
- 성공/오류 토스트를 발생시키는 현재 화면의 액션

toast__regions
- 화면 우하단에 토스트가 표시될 전체 영역

toast__region--success
- 성공 토스트가 들어가는 live region
- aria-live="polite"

toast__region--error
- 오류 토스트가 들어가는 live region
- aria-live="assertive"
```

성공과 오류는 둘 다 `aria-live`로 통일했다.

```txt
aria-live="polite"
- 사용자의 흐름을 크게 끊지 않아도 되는 성공/정보 알림

aria-live="assertive"
- 더 빠르게 인지해야 하는 오류/실패 알림
```

`role="alert"`도 오류 알림에서 흔히 쓰이지만, 이번 스터디에서는 같은 속성 안에서 강도 차이를 보기 위해 `aria-live`로 통일했다.

## Part 2. SCSS/CSS

```txt
.toast__regions
- position: fixed
- right/bottom 기준 우하단 배치
- width: min(360px, 100vw - 48px)

.toast__region
- 성공/오류 live region 컨테이너
- 여러 토스트가 들어올 수 있도록 grid gap 사용

.toast__item
- JS가 생성하는 실제 토스트 카드
- 공통 카드 스타일 담당

.toast__item--success / --error
- border-left 색상으로 상태를 빠르게 구분
```

색상만으로 상태를 전달하지 않고, 토스트 안에 상태 텍스트를 함께 둔다.

```html
<strong class="toast__status">성공</strong>
<p class="toast__message">사용자 상태가 활성으로 변경되었습니다.</p>
```

색상은 빠른 시각적 구분이고, 텍스트는 실제 의미 전달이다.

## Part 3. JavaScript

토스트 생성과 표시 책임을 분리했다.

```js
function createToast(type, message) {
  const toast = document.createElement("div");
  toast.className = `toast__item toast__item--${type}`;
  toast.innerHTML = `
    <strong class="toast__status">${type === "success" ? "성공" : "오류"}</strong>
    <p class="toast__message">${message}</p>
    <button type="button" class="toast__close">닫기</button>
  `;
  return toast;
}
```

```js
function showToast(region, type, message) {
  const toast = createToast(type, message);
  const closeButton = toast.querySelector(".toast__close");
  region.append(toast);

  const timerId = setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION[type]);

  closeButton.addEventListener("click", () => {
    clearTimeout(timerId);
    toast.remove();
  });
}
```

핵심 판단:

```txt
createToast
- 토스트 DOM을 만든다.

showToast
- 토스트를 화면에 붙인다.
- 닫기 버튼 이벤트를 연결한다.
- 자동 제거 타이머를 등록한다.
```

`toast.querySelector(".toast__close")`는 문서 전체가 아니라 방금 만든 토스트 내부에서 닫기 버튼을 찾는다. 토스트가 여러 개 생겨도 각 닫기 버튼이 자기 토스트만 제거할 수 있다.

## 타이머와 이벤트 정리

토스트 내부 닫기 버튼에 붙인 이벤트는 토스트 DOM이 제거되고 참조가 사라지면 브라우저가 정리할 수 있으므로 보통 별도 `removeEventListener`까지 하지 않는다.

반면 `setTimeout`은 DOM과 별개로 예약된 작업이므로, 사용자가 직접 닫을 때 `clearTimeout(timerId)`로 남은 타이머를 취소했다.

```txt
document/window 이벤트
- 전역 객체가 계속 살아 있으므로 직접 removeEventListener 필요

토스트 내부 DOM 이벤트
- DOM 제거 후 참조가 없으면 보통 별도 제거 불필요

setTimeout
- 예약 작업이므로 직접 닫을 때 clearTimeout 하면 더 깔끔함
```

## 표시 시간

성공과 오류는 표시 시간을 다르게 뒀다.

```js
const TOAST_DURATION = {
  success: 3000,
  error: 6000,
};
```

성공 메시지는 확인 피드백이라 짧게 보여도 자연스럽지만, 오류 메시지는 사용자가 읽고 후속 행동을 판단해야 하므로 더 오래 보여주는 편이 좋다.

## React 전환 관점

React에서는 토스트 목록을 배열 state로 관리하는 방식이 자연스럽다.

```txt
toasts state
- [{ id, type, message }]

showToast
- 새 토스트 객체를 배열에 추가

removeToast
- id 기준으로 배열에서 제거

useEffect
- 자동 제거 타이머 등록
- cleanup에서 clearTimeout
```

`aria-live` 영역은 컴포넌트 안에 유지하고, 새 토스트가 추가될 때 type에 따라 `polite` 또는 `assertive` 영역에 메시지를 전달하는 방식으로 확장할 수 있다.

## 이번 회고

Toast UI는 단순히 알림 카드를 띄우는 UI처럼 보이지만 실무 판단 지점이 많았다.

이번 과제에서 남길 포인트:

```txt
- 성공/오류 알림은 성격이 다르다.
- aria-live="polite"와 aria-live="assertive"로 알림 강도를 나눌 수 있다.
- 화면에 보이는 토스트와 스크린리더용 live region은 역할을 분리할 수 있다.
- 색상만으로 상태를 전달하지 말고 상태 텍스트를 함께 제공한다.
- 자동 제거는 편하지만 오류 메시지는 놓칠 수 있으므로 더 오래 보여준다.
- 타이머는 DOM 이벤트와 다르게 clearTimeout으로 정리할 수 있다.
```

앞으로 JS 스터디에서는 먼저 이벤트 안에 직접 구현하고, 반복되는 흐름이 보이면 함수로 분리하는 방식이 이해에 더 도움이 된다.
