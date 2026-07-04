# 아코디언 UI 요점정리 - HTML/SCSS/JavaScript

## 이번 스터디 목표

FAQ 아코디언 UI의 HTML 구조, 카드형 SCSS 스타일, vanilla JavaScript 클릭 토글 기능을 작성했다.

이번 스터디의 목적은 아코디언을 화려하게 꾸미는 것이 아니라, 질문 버튼과 답변 패널의 관계를 명확히 만들고 열림/닫힘 상태를 HTML, CSS, JavaScript에서 일관되게 다루는 것이다.

- 질문과 답변이 반복되는 FAQ 구조를 `ul/li`로 작성한다.
- 질문 영역은 `button`으로 작성한다.
- `aria-expanded`, `aria-controls`, `aria-labelledby`, `hidden`의 역할을 익힌다.
- 카드형 아코디언 스타일로 질문과 답변을 하나의 항목처럼 보이게 만든다.
- JavaScript로 `aria-expanded`와 `hidden` 상태를 함께 갱신한다.
- FAQ에 맞게 여러 항목이 동시에 열리는 정책을 적용한다.

## HTML 구조 핵심

아코디언은 질문 버튼이 답변 패널을 열고 닫는 구조다.

```html
<button
  type="button"
  id="accordion-question-1"
  aria-expanded="false"
  aria-controls="accordion-panel-1"
>
  HTML 구조는 왜 중요한가요?
</button>

<div
  id="accordion-panel-1"
  role="region"
  aria-labelledby="accordion-question-1"
  hidden
>
  <p>HTML은 콘텐츠의 의미와 구조를 담당합니다.</p>
</div>
```

관계로 보면 다음과 같다.

```txt
button
- 답변 패널을 열고 닫는 트리거
- aria-expanded로 열림/닫힘 상태 표현
- aria-controls로 제어할 패널 id 참조

panel
- 답변 콘텐츠 영역
- id로 button의 aria-controls와 연결
- aria-labelledby로 질문 button을 바라봄
- 닫힌 상태에서는 hidden
```

면접에서 설명할 수 있는 문장:

> 아코디언은 질문 버튼이 답변 패널을 열고 닫는 구조입니다. 버튼에는 `aria-expanded`와 `aria-controls`를 사용하고, 패널에는 `aria-labelledby`와 `hidden`을 사용해 질문과 답변의 관계와 노출 상태를 명확히 했습니다.

## 주요 ARIA 속성

`aria-expanded`는 버튼이 제어하는 영역이 현재 펼쳐져 있는지 알려주는 속성이다.

```txt
닫힌 상태
- button aria-expanded="false"
- panel hidden

열린 상태
- button aria-expanded="true"
- panel hidden 제거
```

`aria-controls`는 버튼이 어떤 패널을 제어하는지 알려준다. 값은 실제 패널의 `id`와 일치해야 한다.

`aria-labelledby`는 패널이 어떤 질문에 대한 답변인지 알려준다. 패널 입장에서는 질문 버튼의 텍스트가 자신의 이름이나 제목 역할을 한다.

면접에서 설명할 수 있는 문장:

> `aria-expanded`는 열림 상태, `aria-controls`는 버튼이 제어하는 패널, `aria-labelledby`는 패널이 어떤 질문에 대한 답변인지를 연결하기 위해 사용했습니다.

## HTML 판단 기준

FAQ는 여러 개의 질문과 답변이 반복되는 목록형 콘텐츠이므로 `ul/li` 구조가 자연스럽다.

질문 영역은 단순 제목이 아니라 사용자가 클릭해서 답변을 펼치거나 접는 트리거이므로 `button`을 사용했다.

`role="region"`은 답변 패널을 하나의 의미 있는 영역으로 전달할 때 사용할 수 있다. 다만 항목이 많거나 답변이 짧으면 region이 너무 많아져 탐색이 번잡할 수 있으므로 실무에서는 패널 내용과 개수에 따라 판단하는 것이 좋다.

## SCSS 구조 핵심

카드형 아코디언은 질문 버튼과 답변 패널이 하나의 FAQ 항목처럼 보여야 한다.

```txt
accordion__item
- 질문 + 답변을 감싸는 카드
- border, border-radius, background 담당

accordion__button
- 클릭 가능한 질문 영역
- padding, flex 정렬, 상태 색상 담당

accordion__panel
- 답변 콘텐츠 영역
- 본문 padding, color, line-height 담당
```

질문 텍스트는 왼쪽, `+/-` 아이콘은 오른쪽에 배치하기 위해 버튼을 flex 컨테이너로 만들었다.

```scss
.accordion__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

`+/-`는 실제 콘텐츠라기보다 시각적 상태 표시이므로 HTML에 별도 태그를 추가하지 않고 CSS의 `::after`로 처리했다. 실제 접근성 상태는 `aria-expanded`가 담당한다.

```scss
.accordion__button::after {
  content: "+";
}

.accordion__button[aria-expanded="true"]::after {
  content: "-";
}
```

면접에서 설명할 수 있는 문장:

> 질문과 답변이 하나의 항목으로 인식되도록 외곽 스타일은 `accordion__item`에 주고, 버튼과 패널은 각각 내부 역할에 맞는 간격과 상태 스타일만 담당하게 했습니다.

## 상태 스타일

열린 상태 스타일은 별도 `.is-open` 클래스가 아니라 `aria-expanded="true"` 기준으로 작성했다.

```scss
.accordion__button[aria-expanded="true"] {
  color: vars.$color-primary;
  border-bottom: 1px solid vars.$color-border;
}
```

이렇게 하면 접근성 상태와 시각적 상태를 같은 기준으로 관리할 수 있다.

hover는 포인터를 올려둘 수 있는 환경에서만 의미가 있으므로 `@media (hover: hover)` 안에 작성했다.

```scss
@media (hover: hover) {
  .accordion__button:not([aria-expanded="true"]):hover {
    background-color: vars.$color-primary-light;
  }
}
```

키보드 사용자는 현재 포커스가 어디에 있는지 시각적으로 확인해야 하므로 `:focus-visible`을 작성했다.

면접에서 설명할 수 있는 문장:

> 이번 구현에서는 `aria-expanded`가 이미 열림 상태를 나타내고 있으므로, 별도의 `.is-open` 클래스를 추가하지 않고 해당 속성을 스타일 기준으로 사용했습니다.

## 모바일과 디자인 기준

모바일에서는 손가락으로 버튼을 조작하기 때문에 터치 영역이 충분해야 한다.

그래서 버튼에 `min-height`와 padding을 적용했고, 긴 질문이 줄바꿈되더라도 아이콘이 줄어들지 않도록 했다.

피그마가 없는 상태에서는 장식보다 가독성과 가시성을 우선으로 본다.

```txt
점검 기준
- 제목, 설명, 리스트의 정보 위계가 보이는가
- 버튼이 충분히 넓고 누를 수 있어 보이는가
- 열린 항목과 닫힌 항목이 구분되는가
- 섹션, 리스트, 항목 사이 간격이 자연스러운가
- 모바일에서 긴 질문이 들어와도 아이콘과 텍스트가 겹치지 않는가
```

면접에서 설명할 수 있는 문장:

> 디자인 시안이 없다면 가독성과 가시성을 우선 기준으로 삼습니다. 정보 위계가 자연스럽게 보이는지, 클릭 가능한 영역과 상태 변화가 명확한지, 모바일에서 터치 영역과 긴 문구가 깨지지 않는지를 중심으로 간격과 스타일을 정합니다.

## JavaScript 구현 정책

이번 아코디언은 FAQ UI이므로 여러 개의 답변이 동시에 열릴 수 있는 정책으로 구현했다.

```txt
A. 여러 개 동시에 열림 허용
- 클릭한 항목만 토글한다.
- 다른 항목은 그대로 둔다.
- 여러 답변을 비교하거나 이어서 볼 때 유리하다.

B. 하나만 열림
- 새 항목을 열면 기존 항목을 닫는다.
- 메뉴, 설정 패널, 좁은 화면 UI에 적합하다.
```

면접에서 설명할 수 있는 문장:

> FAQ는 사용자가 여러 답변을 비교하거나 이어서 볼 수 있기 때문에, 하나를 열 때 다른 답변을 자동으로 닫지 않았습니다. 동시 열림을 허용하는 정책에서는 클릭한 버튼과 연결된 패널만 토글하는 것이 사용자의 의도에 더 맞는다고 봤습니다.

## JavaScript 구현 흐름

현재 아코디언 토글 로직은 다음 순서로 동작한다.

```txt
1. DOMContentLoaded 시점에 초기화 함수를 실행한다.
2. .accordion 요소를 찾는다.
3. .accordion이 없으면 종료한다.
4. .accordion에 click 이벤트를 위임한다.
5. 클릭된 요소가 .accordion__button인지 확인한다.
6. 버튼의 aria-controls 값을 읽는다.
7. 현재 .accordion 내부에서 연결 패널을 찾는다.
8. 패널이 없으면 종료한다.
9. 현재 aria-expanded 값을 boolean으로 읽는다.
10. 현재 상태의 반대값을 다음 상태로 만든다.
11. 버튼의 aria-expanded를 다음 상태로 갱신한다.
12. 패널의 hidden을 다음 상태와 반대로 갱신한다.
```

핵심 코드는 다음과 같다.

```js
const isExpanded = button.getAttribute("aria-expanded") === "true";
const isNextExpanded = !isExpanded;

button.setAttribute("aria-expanded", String(isNextExpanded));
panel.hidden = !isNextExpanded;
```

상태 관계:

```txt
isNextExpanded = true
- aria-expanded="true"
- panel.hidden = false
- 패널 열림

isNextExpanded = false
- aria-expanded="false"
- panel.hidden = true
- 패널 닫힘
```

면접에서 설명할 수 있는 문장:

> 클릭 시 현재 `aria-expanded` 값을 읽고, 그 반대값을 다음 상태로 만들어 적용했습니다. 현재 상태와 다음 상태를 분리하면 `aria-expanded`와 `hidden`을 같은 기준으로 갱신하기 쉽습니다.

## 이벤트 위임

아코디언 항목마다 이벤트를 따로 붙이지 않고 상위 `.accordion`에 이벤트를 한 번만 연결했다.

```js
target.addEventListener("click", (event) => {
  const button = event.target.closest(".accordion__button");
  if (!button) return;
});
```

이벤트 위임을 사용한 이유:

```txt
1. 이벤트 리스너를 한 번만 등록한다.
2. 항목이 추가되거나 줄어들어도 대응하기 쉽다.
3. 클릭 처리 로직이 한 곳에 모인다.
4. 반복 UI에서 코드가 단순해진다.
```

면접에서 설명할 수 있는 문장:

> 아코디언 항목은 반복 구조라 나중에 개수가 늘거나 줄 수 있습니다. 각 버튼에 이벤트를 붙이는 대신 상위 `.accordion`에 이벤트를 위임하면 클릭 처리 로직을 한 곳에서 관리할 수 있고, 항목 변경에도 더 유연하게 대응할 수 있습니다.

## DOM 방어 코드

UI 스크립트에서는 DOM 요소나 속성이 항상 존재한다고 가정하지 않는 편이 안전하다.

현재 구현에서는 다음 경우를 방어했다.

```js
const target = document.querySelector(".accordion");
if (!target) return;

const button = event.target.closest(".accordion__button");
if (!button) return;

const controlPanel = button.getAttribute("aria-controls");
if (!controlPanel) return;

const panel = target.querySelector(`#${controlPanel}`);
if (!panel) return;
```

방어 코드가 필요한 이유:

```txt
- 아코디언이 없는 페이지에서 JS가 실행될 수 있다.
- 버튼이 아닌 영역을 클릭할 수 있다.
- aria-controls가 누락될 수 있다.
- aria-controls 값과 일치하는 패널 id가 없을 수 있다.
```

면접에서 설명할 수 있는 문장:

> DOM 요소나 연결 속성이 없을 수 있으므로, 속성을 변경하기 전에 존재 여부를 확인했습니다. 특히 `querySelector`가 요소를 찾지 못하면 `null`을 반환하기 때문에, 그 상태에서 `hidden`에 접근하면 런타임 에러가 발생할 수 있습니다.

## 탐색 범위 제한

패널을 찾을 때 문서 전체가 아니라 현재 `.accordion` 내부에서만 찾도록 했다.

```js
const panel = target.querySelector(`#${controlPanel}`);
```

이렇게 하면 같은 페이지에 아코디언이 여러 개 있을 때 다른 컴포넌트와 상태가 섞이는 문제를 줄일 수 있다.

면접에서 설명할 수 있는 문장:

> 같은 페이지에 아코디언이 여러 개 있을 수 있기 때문에, 문서 전체가 아니라 현재 `.accordion` 내부에서만 패널을 찾도록 했습니다.

## attribute와 boolean

`aria-expanded`는 HTML attribute로 표현되므로 값이 문자열 형태로 들어간다.

JavaScript에서는 boolean으로 상태를 계산하고, attribute에 반영할 때 문자열로 변환했다.

```js
button.setAttribute("aria-expanded", String(isNextExpanded));
```

반면 `hidden`은 DOM 프로퍼티로 true/false를 다룰 수 있다.

```js
panel.hidden = !isNextExpanded;
```

`isNextExpanded`는 열림 상태이고, `hidden`은 숨김 상태라 의미가 반대다.

```txt
열림
- isNextExpanded = true
- hidden = false

닫힘
- isNextExpanded = false
- hidden = true
```

면접에서 설명할 수 있는 문장:

> `aria-expanded`는 HTML attribute로 표현되기 때문에 boolean 값을 문자열로 변환해 넣었습니다. 반면 `hidden`은 DOM 프로퍼티로 true/false를 다룰 수 있고, 열림 상태와 숨김 상태는 의미가 반대라 `!isNextExpanded`를 사용했습니다.

## React 전환 관점

vanilla JavaScript에서는 클릭된 버튼과 연결 패널을 직접 찾아 속성을 변경한다.

React에서는 열린 항목 상태를 state로 관리하고, 그 state 값에 따라 `aria-expanded`와 `hidden`을 렌더링한다.

```jsx
<button aria-expanded={isOpen}>질문</button>
<div hidden={!isOpen}>답변</div>
```

면접에서 설명할 수 있는 문장:

> vanilla JS에서는 클릭된 버튼과 연결 패널을 직접 찾아 `aria-expanded`와 `hidden`을 변경했습니다. React에서는 열린 항목 id나 boolean 상태를 state로 관리하고, 그 상태값에 따라 `aria-expanded`와 `hidden`을 렌더링하는 방식으로 구현할 것 같습니다.

## 아코디언 전체 요약

```txt
HTML
- button
- aria-expanded
- aria-controls
- aria-labelledby
- hidden

SCSS
- 카드형 item
- + / - 표시
- [aria-expanded="true"] 상태 스타일
- focus-visible
- hover 조건 처리
- 모바일 터치 영역

JavaScript
- 이벤트 위임
- aria-controls로 패널 찾기
- aria-expanded 토글
- hidden 토글
- DOM 방어 코드
```

면접에서 설명할 수 있는 전체 문장:

> 아코디언은 질문 버튼과 답변 패널이 연결되는 구조로 만들었습니다. 버튼에는 `aria-expanded`와 `aria-controls`를 사용해 열림 상태와 제어 대상을 표현했고, 패널에는 `aria-labelledby`와 `hidden`을 사용했습니다. JavaScript에서는 이벤트 위임으로 클릭된 버튼을 찾고, `aria-controls`로 연결 패널을 찾아 `aria-expanded`와 `hidden` 상태를 함께 토글했습니다.

## 다음 과제 메모

다음 과제는 필터 UI가 적절하다.

필터 UI에서 다룰 핵심:

```txt
- checkbox / radio / select
- label 연결
- fieldset / legend
- 선택 조건 표시
- 결과 개수 표시
- 필터 초기화
- 빈 결과 상태
- JavaScript로 리스트 필터링
```
