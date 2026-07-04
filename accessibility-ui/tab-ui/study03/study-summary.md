# Study 03 요점정리 - 탭 UI JavaScript 인터랙션

## 이번 스터디 목표

탭 UI의 HTML, SCSS 구조 위에 vanilla JavaScript로 클릭 전환 기능을 붙였다.

이번 파트의 목적은 단순히 화면을 바꾸는 것이 아니라, 탭의 선택 상태와 패널 노출 상태가 서로 어긋나지 않도록 관리하는 것이다.

- 클릭한 탭만 `aria-selected="true"`로 변경한다.
- 나머지 탭은 `aria-selected="false"`로 변경한다.
- 클릭한 탭과 연결된 패널만 노출한다.
- 나머지 패널은 `hidden` 처리한다.
- 이벤트 위임으로 탭 버튼 클릭을 처리한다.
- DOM 요소가 없거나 연결 패널을 찾지 못하는 경우를 방어한다.

## 구현 흐름

현재 탭 전환 로직은 다음 순서로 동작한다.

```txt
1. DOMContentLoaded 시점에 초기화 함수를 실행한다.
2. .tabs 요소를 찾는다.
3. .tabs가 없으면 종료한다.
4. 현재 .tabs 내부의 탭 버튼과 패널을 찾는다.
5. .tabs에 click 이벤트를 연결한다.
6. 클릭된 요소가 .tabs__button인지 확인한다.
7. 클릭한 버튼의 aria-controls 값을 읽는다.
8. 해당 id를 가진 패널을 찾는다.
9. 대상 패널이 없으면 종료한다.
10. 모든 탭의 aria-selected를 false로 바꾼다.
11. 모든 패널을 hidden 처리한다.
12. 클릭한 탭만 aria-selected를 true로 바꾼다.
13. 연결된 패널만 hidden을 해제한다.
```

핵심 코드는 다음 흐름이다.

```js
const tabButton = event.target.closest(".tabs__button");
const targetPanelId = tabButton.getAttribute("aria-controls");
const targetPanel = target.querySelector(`#${targetPanelId}`);
```

## aria-controls를 기준으로 패널을 찾은 이유

탭 버튼의 텍스트나 index를 기준으로 패널을 찾을 수도 있다.

하지만 텍스트는 번역이나 문구 수정에 따라 바뀔 수 있고, index는 탭 순서가 바뀌면 연결이 어긋날 수 있다.

`aria-controls`는 해당 탭 버튼이 제어하는 패널의 `id`를 명시적으로 참조하므로, 탭과 패널의 연결 기준으로 더 안정적이다.

```html
<button aria-controls="panel-html">HTML</button>
<div id="panel-html">...</div>
```

면접에서 설명할 수 있는 문장:

> 텍스트는 번역이나 문구 수정에 영향을 받고, index는 탭 순서가 바뀌면 틀어질 수 있습니다. 그래서 버튼이 제어할 패널 id를 직접 참조하는 `aria-controls`를 기준으로 패널을 찾았습니다.

## 탐색 범위를 .tabs 내부로 제한한 이유

처음에는 `document.querySelectorAll()`로 전체 문서에서 탭 버튼과 패널을 찾을 수 있다.

하지만 같은 페이지에 탭 컴포넌트가 여러 개 생기면, 문서 전체 탐색은 다른 탭 컴포넌트의 버튼이나 패널까지 함께 건드릴 수 있다.

그래서 현재 탭 컴포넌트 내부에서만 요소를 찾도록 했다.

```js
const tabButtons = target.querySelectorAll(".tabs__button");
const tabPanels = target.querySelectorAll(".tabs__panel");
```

```txt
document.querySelectorAll()
- 문서 전체 탐색
- 같은 클래스가 여러 곳에 있으면 모두 잡힘
- 다른 컴포넌트에 영향을 줄 수 있음

target.querySelectorAll()
- 현재 .tabs 내부만 탐색
- 컴포넌트 단위로 동작
- 재사용과 유지보수에 유리함
```

면접에서 설명할 수 있는 문장:

> 같은 페이지에 탭 UI가 여러 개 생길 수 있기 때문에, 문서 전체가 아니라 현재 이벤트를 처리하는 `.tabs` 내부에서만 버튼과 패널을 찾도록 했습니다.

## 대상 패널을 먼저 확인한 이유

상태 초기화보다 대상 패널 확인을 먼저 하는 것이 안전하다.

`aria-controls` 값이 잘못되었거나 해당 id를 가진 패널이 없을 수 있기 때문이다.

위험한 순서:

```txt
1. 모든 탭과 패널을 먼저 초기화한다.
2. 연결 패널을 찾는다.
3. 패널이 없다.
4. return 한다.
5. 화면에 보이는 패널이 없어질 수 있다.
```

안전한 순서:

```txt
1. 클릭한 탭을 확인한다.
2. 연결될 패널을 찾는다.
3. 패널이 있을 때만 기존 상태를 초기화한다.
4. 새 탭과 패널을 활성화한다.
```

면접에서 설명할 수 있는 문장:

> 대상 패널이 없는 경우에도 기존 UI 상태가 깨지지 않도록, 먼저 패널 존재 여부를 확인한 뒤 상태를 초기화했습니다.

## hidden 프로퍼티를 사용한 이유

`hidden`은 boolean attribute다.

값 문자열보다 속성이 존재하는지 여부가 중요하다.

```html
<div hidden></div>
```

`hidden="false"`처럼 작성해도 속성이 존재하기 때문에 숨김으로 처리될 수 있다.

그래서 JavaScript에서는 문자열 attribute보다 DOM 프로퍼티로 다루는 것이 더 직관적이다.

```js
el.hidden = true;
targetPanel.hidden = false;
```

면접에서 설명할 수 있는 문장:

> `hidden`은 boolean 속성이기 때문에 `element.hidden = true/false`로 제어하는 편이 더 직관적입니다.

## 이벤트 위임을 사용한 이유

탭 버튼마다 이벤트를 각각 연결할 수도 있다.

하지만 버튼이 추가되거나 삭제될 때 이벤트 연결도 함께 관리해야 하므로 유지보수 포인트가 늘어난다.

현재 구현은 상위 요소인 `.tabs`에 이벤트를 한 번만 연결하고, 클릭된 요소가 탭 버튼인지 확인한다.

```js
target.addEventListener("click", (event) => {
  const tabButton = event.target.closest(".tabs__button");
  if (!tabButton) return;
});
```

이벤트 위임의 장점:

```txt
1. 이벤트 리스너를 한 번만 등록한다.
2. 버튼이 추가되거나 줄어들어도 구조가 맞으면 대응하기 쉽다.
3. 이벤트 처리 로직을 한 곳에서 관리할 수 있다.
```

면접에서 설명할 수 있는 문장:

> 탭 버튼마다 이벤트를 붙이지 않고 상위 `.tabs`에 이벤트를 위임했습니다. 이렇게 하면 버튼 개수가 늘어나거나 줄어들어도 클릭 처리 로직을 한 곳에서 관리할 수 있습니다.

## DOMContentLoaded와 defer

현재 HTML에는 `defer`가 붙어 있다.

```html
<script src="js/main.js" defer></script>
```

그리고 JavaScript에서는 `DOMContentLoaded`를 사용했다.

```js
document.addEventListener("DOMContentLoaded", handleTabControls);
```

둘 다 DOM이 준비된 뒤 스크립트가 실행되도록 하기 위한 안전장치에 가깝다.

```txt
defer
- HTML 파싱을 막지 않는다.
- DOM 파싱이 끝난 뒤 스크립트를 실행한다.
- head에 script를 둘 때 유용하다.

DOMContentLoaded
- DOM 구성이 끝난 시점에 콜백을 실행한다.
- script 위치와 관계없이 DOM 접근을 안전하게 하기 좋다.
```

둘을 함께 써도 동작상 문제는 없지만, 단순 과제에서는 다소 중복이다.

면접에서 설명할 수 있는 문장:

> 스크립트가 `head`에 있기 때문에 DOM이 만들어지기 전에 실행되는 문제를 막기 위해 `defer`를 사용했습니다. 다만 `defer`가 이미 DOM 파싱 이후 실행을 보장하므로, 실제 프로젝트에서는 `DOMContentLoaded`와 `defer` 중 하나로 정리할 수도 있습니다.

## 여러 탭 컴포넌트로 확장하는 관점

현재 코드는 첫 번째 `.tabs` 하나만 초기화한다.

```js
const target = document.querySelector(".tabs");
```

같은 페이지에 탭 UI가 여러 개 있다면 모든 `.tabs`를 찾고, 각 탭 컨테이너를 초기화 함수의 매개변수로 넘기는 구조로 확장할 수 있다.

```js
function initTabs(target) {
  const tabButtons = target.querySelectorAll(".tabs__button");
  const tabPanels = target.querySelectorAll(".tabs__panel");

  target.addEventListener("click", (event) => {
    // target 내부에서만 처리
  });
}

document.querySelectorAll(".tabs").forEach((tabs) => {
  initTabs(tabs);
});
```

핵심은 페이지 전체에서 활성 탭 하나만 관리하는 것이 아니라, 각 `.tabs` 컴포넌트가 자기 내부에서만 활성 탭과 패널을 관리하게 하는 것이다.

면접에서 설명할 수 있는 문장:

> 같은 페이지에 탭 UI가 여러 개 필요하다면, 각 `.tabs` 컨테이너를 초기화 함수에 매개변수로 넘겨 독립적으로 동작하게 만들 수 있습니다.

## React 전환 관점

vanilla JavaScript에서는 DOM을 직접 찾고 속성을 직접 바꾼다.

```txt
DOM을 찾는다.
속성을 읽는다.
조건을 판단한다.
DOM 속성을 직접 변경한다.
```

React에서는 현재 선택된 탭 id를 state로 관리하고, 그 state 값에 따라 `aria-selected`와 `hidden`을 렌더링한다.

```jsx
const [selectedTab, setSelectedTab] = useState("html");

<button aria-selected={selectedTab === "html"} onClick={() => setSelectedTab("html")}>
  HTML
</button>

<div hidden={selectedTab !== "html"}>HTML 패널</div>
```

차이:

```txt
vanilla JS
- DOM을 직접 찾는다.
- aria-selected와 hidden을 수동으로 변경한다.

React
- 선택된 탭 id를 state로 관리한다.
- aria-selected와 hidden은 state에서 파생된다.
```

면접에서 설명할 수 있는 문장:

> vanilla JS에서는 클릭된 탭을 기준으로 DOM을 직접 찾아 `aria-selected`와 `hidden`을 변경했습니다. React에서는 현재 선택된 탭 id를 state로 관리하고, 그 state 값에 따라 `aria-selected`와 `hidden`을 렌더링합니다.

## 키보드 이동 심화 메모

이번 기본 과제에서는 클릭 전환까지만 구현했다.

접근성을 더 깊게 다루는 경우에는 `keydown` 이벤트에서 방향키를 처리할 수 있다.

```txt
ArrowLeft
- 이전 탭으로 이동

ArrowRight
- 다음 탭으로 이동

Home
- 첫 번째 탭으로 이동

End
- 마지막 탭으로 이동
```

요즘은 `keyCode`보다 `event.key`를 사용하는 편이 좋다.

```js
if (event.key === "ArrowRight") {
  // 다음 탭으로 focus 이동
}
```

이번 과제 범위에서는 필수는 아니지만, 접근성 요구가 높은 과제나 디자인시스템에서는 추가로 고려할 수 있다.

## 오늘 정리한 핵심

```txt
탭 전환의 핵심
- 클릭된 탭을 찾는다.
- aria-controls로 연결 패널 id를 읽는다.
- 대상 패널이 있는지 먼저 확인한다.
- 모든 탭/패널 상태를 초기화한다.
- 클릭된 탭과 연결 패널만 활성화한다.
```

면접에서 설명할 수 있는 전체 문장:

> 탭 전체 영역에 클릭 이벤트를 위임하고, 클릭된 탭의 `aria-controls` 값을 읽어 연결된 패널을 찾았습니다. 이후 모든 탭과 패널 상태를 초기화한 뒤, 선택된 탭은 `aria-selected="true"`로 변경하고 연결된 패널만 `hidden`을 해제해 선택 상태와 노출 상태가 함께 맞도록 구현했습니다.

## 다음 과제 메모

탭 UI 기본 구현은 HTML, SCSS, JavaScript까지 한 바퀴 완료했다.

다음 과제는 아코디언 FAQ UI가 적절하다.

아코디언에서 다룰 핵심:

```txt
- 질문 버튼과 답변 패널 연결
- aria-expanded
- aria-controls
- hidden
- 여러 개 열림 허용 여부
- 클릭 토글
```
