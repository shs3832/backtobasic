# Study 01 요점정리 - 탭 UI HTML 마크업

## 이번 스터디 목표

탭 UI를 CSS와 JavaScript 없이 HTML 구조 중심으로 먼저 작성했다.

이번 파트의 목적은 탭을 예쁘게 만드는 것이 아니라, 탭 버튼과 패널이 어떤 관계를 가져야 하는지 이해하고 접근성 속성을 HTML 단계에서 정리하는 것이다.

- 탭은 페이지 이동이 아니라 페이지 안의 콘텐츠 전환이라는 점을 이해한다.
- 탭 버튼과 패널을 1:1로 연결한다.
- `role`, `aria-selected`, `aria-controls`, `aria-labelledby`, `hidden`의 역할을 익힌다.
- 나중에 CSS와 JavaScript를 붙이기 쉬운 구조로 만든다.
- 면접에서 탭 구조를 짧게 설명할 수 있게 정리한다.

## 현재 구현 구조

현재 탭 UI는 다음 흐름으로 구성했다.

```txt
main
├─ h1
└─ section.tab-section
   ├─ h2
   ├─ p
   └─ div.tabs
      ├─ div.tabs__list[role="tablist"]
      │  ├─ button[role="tab"]
      │  ├─ button[role="tab"]
      │  └─ button[role="tab"]
      └─ div.tabs__panels
         ├─ div.tabs__panel[role="tabpanel"]
         ├─ div.tabs__panel[role="tabpanel"][hidden]
         └─ div.tabs__panel[role="tabpanel"][hidden]
```

핵심은 버튼과 패널이 서로 연결되어 있다는 점이다.

```html
<button id="tab-html" role="tab" aria-controls="panel-html" aria-selected="true">
  HTML
</button>

<div id="panel-html" role="tabpanel" aria-labelledby="tab-html">
  ...
</div>
```

## 탭에서 button을 사용한 이유

탭은 다른 페이지로 이동하는 링크가 아니라, 현재 페이지 안에서 콘텐츠 패널을 바꾸는 인터랙션이다.

그래서 URL 이동 목적의 `a`보다 동작을 실행하는 `button`이 의미상 더 적절하다.

```txt
a
- 페이지 이동
- 외부 링크 이동
- 같은 문서 안의 특정 위치 이동

button
- 현재 화면 안의 상태 변경
- 열기 / 닫기
- 탭 전환
- 토글
```

면접에서 설명할 수 있는 문장:

> 탭은 페이지 이동이 아니라 현재 화면 안에서 콘텐츠 패널을 전환하는 인터랙션이므로, `a`보다 `button`을 사용하는 것이 의미상 더 적절하다고 판단했습니다.

## role을 사용한 이유

`button`만 사용해도 클릭 동작은 만들 수 있다.

하지만 보조기술 입장에서는 단순히 버튼 여러 개가 있는 구조로만 인식될 수 있다.

그래서 탭 UI라는 패턴을 명확히 전달하기 위해 다음 role을 사용한다.

```txt
role="tablist"
- 탭 버튼들의 묶음

role="tab"
- 탭으로 동작하는 버튼

role="tabpanel"
- 선택된 탭에 연결된 콘텐츠 영역
```

면접에서 설명할 수 있는 문장:

> HTML 요소만으로도 클릭 동작은 만들 수 있지만, 보조기술이 이 UI를 탭 인터페이스로 이해할 수 있도록 `tablist`, `tab`, `tabpanel` 역할을 부여했습니다.

## aria-selected

`aria-selected`는 현재 선택된 탭을 보조기술에 전달하는 속성이다.

화면에서는 `.is-active` 같은 클래스로 선택 상태를 표현할 수 있지만, 클래스는 CSS나 개발자가 상태를 구분하기 위한 값이지 보조기술에 의미를 전달하는 값은 아니다.

```txt
.is-active
- 개발자와 CSS를 위한 상태 클래스
- 선택된 탭의 스타일을 바꾸는 데 사용

aria-selected
- 보조기술에 전달되는 선택 상태
- 현재 어떤 탭이 선택되었는지 알려줌
```

면접에서 설명할 수 있는 문장:

> `.is-active`는 스타일을 위한 클래스이고 보조기술에는 의미가 전달되지 않기 때문에, 탭 버튼에는 `aria-selected`를 사용해 현재 어떤 탭이 선택되어 있는지 전달했습니다.

## aria-controls와 aria-labelledby

탭 UI에서는 버튼과 패널이 1:1로 연결되어야 한다.

이때 `aria-controls`와 `aria-labelledby`를 서로 반대 방향의 연결처럼 이해하면 쉽다.

```txt
aria-controls
- 탭 버튼에 작성
- 이 버튼이 어떤 패널을 제어하는지 알려줌

aria-labelledby
- 탭 패널에 작성
- 이 패널의 이름을 어떤 탭 버튼에서 가져올지 알려줌
```

예시:

```html
<button id="tab-css" aria-controls="panel-css">CSS</button>

<div id="panel-css" aria-labelledby="tab-css" role="tabpanel">
  ...
</div>
```

면접에서 설명할 수 있는 문장:

> `aria-controls`는 탭 버튼이 어떤 패널을 제어하는지 연결하기 위한 속성이고, `aria-labelledby`는 패널이 어떤 탭에 의해 설명되는 콘텐츠인지 알려주기 위한 속성입니다.

## hidden을 사용한 이유

비활성 패널은 현재 사용자에게 노출되지 않는 콘텐츠다.

그래서 선택되지 않은 패널에는 `hidden` 속성을 사용해 현재 숨겨진 상태임을 HTML 단계에서 명시했다.

`display: none`도 시각적으로 숨길 수 있고 대부분 보조기술에서도 읽히지 않는다. 다만 `hidden`은 상태 의미가 HTML에 직접 드러나므로, 탭의 선택 상태와 패널 노출 상태를 구조적으로 관리하기 좋다.

```txt
hidden
- HTML 속성
- 현재 비활성 콘텐츠라는 의미가 명확함
- JavaScript에서 true / false 상태로 다루기 쉬움

display: none
- CSS 표현 방식
- 스타일 레이어에서 숨김 처리
- 상태 의미가 마크업에 직접 드러나지는 않음
```

면접에서 설명할 수 있는 문장:

> 비활성 패널은 현재 사용자에게 노출되지 않는 콘텐츠이므로 `hidden` 속성으로 명시했습니다. `display: none`도 숨김 처리는 가능하지만, `hidden`은 HTML 단계에서 숨김 상태를 표현하므로 탭 상태를 관리하기 좋습니다.

## JavaScript를 붙이기 쉬운 구조

현재 구조는 나중에 JavaScript를 붙이기 쉽다.

이유는 탭 버튼과 패널의 연결 정보가 HTML 안에 이미 있기 때문이다.

```txt
1. 클릭된 tab 버튼을 찾는다.
2. 버튼의 aria-controls 값을 읽는다.
3. 같은 id를 가진 panel을 찾는다.
4. 모든 tab의 aria-selected를 false로 바꾼다.
5. 클릭한 tab만 aria-selected를 true로 바꾼다.
6. 모든 panel을 hidden 처리한다.
7. 연결된 panel만 hidden을 해제한다.
```

예상 JavaScript 흐름:

```js
const panelId = clickedTab.getAttribute("aria-controls");
const targetPanel = document.getElementById(panelId);
```

`role`로 요소를 찾는 것도 가능하지만, 실무에서는 의미 전달용 `role`과 스타일/스크립트 선택용 `class`를 함께 두는 편이 관리하기 쉽다.

```txt
role
- 의미와 접근성 전달

class
- 스타일 적용
- JavaScript 선택자
```

## 오늘 정리한 핵심 공식

탭 UI는 다음 공식으로 기억하면 된다.

```txt
탭 버튼
- role="tab"
- id
- aria-selected
- aria-controls="패널 id"

탭 패널
- role="tabpanel"
- id
- aria-labelledby="탭 id"
- hidden
```

체크 순서:

```txt
1. 탭 버튼인가? role="tab"
2. 버튼 id가 있는가?
3. 버튼이 열 패널 id를 aria-controls로 가리키는가?
4. 패널 id가 있는가?
5. 패널이 버튼 id를 aria-labelledby로 가리키는가?
6. 안 보이는 패널은 hidden인가?
```

## 실무 감각 메모

탭 UI를 처음부터 완벽하게 작성하는 사람은 많지 않다.

실무에서는 보통 다음 순서로 보완한다.

```txt
1. 먼저 보이는 구조를 만든다.
2. 버튼과 패널을 나눈다.
3. 버튼과 패널의 id 연결을 잡는다.
4. 선택 상태를 정리한다.
5. 접근성 속성을 보완한다.
6. JavaScript와 키보드 동작을 붙인다.
7. 마지막에 네이밍과 구조를 다듬는다.
```

이번 학습에서는 한 번에 외우기보다, 버튼과 패널이 1:1로 연결된다는 구조를 반복해서 눈에 익히는 것이 중요하다.

## 면접에서 설명할 수 있는 문장

> 탭 UI는 버튼과 패널이 1:1로 연결되는 구조라서, 버튼에는 `aria-controls`, 패널에는 `aria-labelledby`를 사용했습니다. 선택된 탭은 `aria-selected`로 표시하고, 비활성 패널은 `hidden`으로 관리해 시각적 상태와 접근성 상태가 함께 맞도록 구성했습니다.

조금 더 짧게 말하면:

> 탭은 페이지 이동이 아니라 콘텐츠 전환 인터랙션이기 때문에 `button`으로 만들었고, 선택 상태와 패널 연결 관계를 `aria-selected`, `aria-controls`, `aria-labelledby`, `hidden`으로 관리했습니다.

## 다음 파트로 넘어가기 전 메모

- CSS 파트에서는 선택된 탭과 비활성 탭의 시각적 차이를 만든다.
- 키보드 포커스가 명확히 보이도록 `:focus-visible` 스타일을 작성한다.
- 모바일에서도 탭 버튼이 줄바꿈되거나 가로 스크롤될 때 어색하지 않게 처리한다.
- JavaScript 파트에서는 클릭 시 `aria-selected`와 `hidden`을 함께 갱신한다.
- 가능하면 방향키 이동까지 다루되, 처음에는 클릭 전환부터 안정적으로 구현한다.
