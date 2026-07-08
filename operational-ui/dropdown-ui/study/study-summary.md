# Dropdown / Action Menu UI 요점정리

## 스터디 목표

운영자가 사용자 상태 변경과 권한 수정 액션을 실행할 수 있는 Dropdown / Action Menu UI를 HTML, SCSS, vanilla JavaScript로 구현했다.

이번 과제의 핵심은 메뉴를 여닫는 동작뿐 아니라, 메뉴를 여는 버튼과 메뉴 영역의 관계, 현재 열림 상태, 메뉴 항목 선택 후 닫힘 흐름을 명확히 만드는 것이었다.

## Part 1. HTML 마크업

```txt
button
- 현재 페이지 안에서 메뉴를 열고 액션을 실행하는 상호작용 요소

aria-expanded
- 메뉴 버튼이 제어하는 메뉴가 현재 열려 있는지 닫혀 있는지 표현

aria-controls
- 메뉴 버튼과 실제 메뉴 영역의 id를 연결

hidden
- 초기 닫힘 상태의 메뉴를 화면과 접근성 트리에서 감춤

dropdown__item button
- 메뉴 항목이 페이지 이동이 아니라 현재 화면의 액션이므로 button 사용
```

`aria-expanded`와 `hidden`은 함께 움직이지만 같은 의미는 아니다.

```txt
aria-expanded
- 버튼이 가진 접근성 상태
- 보조기술에 열림/닫힘 상태를 전달

hidden
- 메뉴 영역 자체의 표시 여부
- 닫힌 메뉴를 실제로 감춤
```

## Part 2. SCSS/CSS

```txt
.dropdown
- trigger와 menu를 묶는 컴포넌트 기준 영역
- position: relative로 menu 위치 기준을 제공

.dropdown__menu
- position: absolute로 trigger 아래에 배치
- box-shadow로 떠 있는 메뉴임을 표현

.dropdown__item
- width: 100%로 메뉴 항목 클릭 영역을 안정적으로 확보
```

hover 스타일은 마우스/트랙패드 환경에서만 적용되도록 분리했다.

```scss
@media (hover: hover) and (pointer: fine) {
  .dropdown__trigger:hover {
    border-color: $color-primary;
    color: $color-primary;
  }

  .dropdown__item:hover {
    background-color: $color-background;
  }
}
```

`focus-visible`은 키보드 사용자를 위한 상태이므로 media query 밖에 둔다.

## Part 3. JavaScript

메뉴 열림/닫힘은 `aria-expanded`와 `hidden`을 함께 갱신한다.

```js
const isExpanded = triggerButton.getAttribute("aria-expanded") === "true";

triggerButton.setAttribute("aria-expanded", String(!isExpanded));
menu.hidden = isExpanded;
```

`getAttribute()`로 읽은 값은 boolean이 아니라 문자열이다.

```txt
"true"
"false"
```

닫기 동작은 여러 이벤트에서 재사용되므로 `closeMenu()`로 분리했다.

```js
function closeMenu() {
  triggerButton.setAttribute("aria-expanded", "false");
  menu.hidden = true;
}
```

닫히는 경우:

```txt
- ESC 키 입력
- 드롭다운 바깥 클릭
- 메뉴 항목 선택
```

바깥 클릭은 현재 마크업 구조를 기준으로 `.dropdown` 전체를 컴포넌트 경계로 보고 판정했다.

```js
if (dropdown.contains(event.target)) return;
```

`contains()`는 클릭된 요소가 특정 DOM 요소 안에 포함되어 있는지 확인하는 메서드다.

## Part 4. React 전환 관점

React에서는 DOM 속성을 직접 읽고 수정하기보다 `isOpen` 같은 state 하나를 기준으로 UI와 접근성 속성을 함께 파생시킨다.

```jsx
const [isOpen, setIsOpen] = useState(false);

<button aria-expanded={isOpen}>사용자 작업</button>
<div hidden={!isOpen}>...</div>
```

Vanilla JS의 `closeMenu()` 개념은 React에서도 유효하다.

```jsx
function closeMenu() {
  setIsOpen(false);
}
```

바깥 클릭 판정은 `querySelector` 대신 `ref`로 DOM을 연결해 처리한다.

```jsx
const dropdownRef = useRef(null);

if (dropdownRef.current?.contains(event.target)) return;
```

`document`나 `window`에 직접 붙인 이벤트는 `useEffect` cleanup에서 제거해야 한다.

```jsx
useEffect(() => {
  document.addEventListener("click", handleDocumentClick);

  return () => {
    document.removeEventListener("click", handleDocumentClick);
  };
}, []);
```

기억할 기준:

```txt
JSX/TSX에 선언한 이벤트
- React가 컴포넌트 생명주기와 함께 관리

document, window, 직접 DOM에 붙인 이벤트
- 직접 등록했으므로 직접 해제
```

## 이번 회고

Dropdown UI는 Table, Pagination보다 구현 난도는 낮았지만 DOM 이벤트의 경계 판단을 익히기 좋은 과제였다.

이번 과제에서 특히 남길 포인트:

```txt
- aria-expanded와 hidden은 역할이 다르다.
- getAttribute() 값은 문자열이다.
- closeMenu()처럼 사용자 동작의 의미를 함수명으로 드러내면 읽기 쉽다.
- contains()는 드롭다운, 모달, 팝오버의 내부/외부 클릭 판정에서 자주 쓰인다.
- React에서는 isOpen, ref, useEffect cleanup으로 같은 흐름을 옮긴다.
```

마크업 구조가 바뀌면 바깥 클릭 판정 기준도 달라진다. DOM 기반 스크립트에서는 항상 현재 HTML 구조를 먼저 확인한 뒤 로직을 판단해야 한다.
