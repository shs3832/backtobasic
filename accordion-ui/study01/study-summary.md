# Study 01 요점정리 - 아코디언 UI HTML/SCSS

## 이번 스터디 목표

FAQ 아코디언 UI의 HTML 구조와 카드형 SCSS 스타일을 작성했다.

이번 파트의 목적은 아코디언을 화려하게 꾸미는 것이 아니라, 질문 버튼과 답변 패널의 관계를 명확히 만들고 열림/닫힘 상태를 표현할 수 있는 구조를 잡는 것이다.

- 질문과 답변이 반복되는 FAQ 구조를 `ul/li`로 작성한다.
- 질문 영역은 `button`으로 작성한다.
- `aria-expanded`, `aria-controls`, `aria-labelledby`, `hidden`의 역할을 익힌다.
- 카드형 아코디언 스타일로 질문과 답변을 하나의 항목처럼 보이게 만든다.
- 키보드 포커스와 hover 상태를 기본 수준에서 고려한다.

## HTML 구조 핵심

아코디언은 질문 버튼이 답변 패널을 열고 닫는 구조다.

기본 연결은 다음과 같다.

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

## button을 사용한 이유

아코디언의 질문 영역은 단순한 제목이 아니라 사용자가 클릭해서 답변을 펼치거나 접는 인터랙션 요소다.

그래서 의미 없는 `div`보다 기본적으로 키보드 포커스와 Enter/Space 조작이 가능한 `button`이 적절하다.

면접에서 설명할 수 있는 문장:

> 질문 영역이 답변을 열고 닫는 트리거 역할을 하기 때문에, 의미와 키보드 접근성을 기본으로 가진 `button`을 사용했습니다.

## aria-expanded

`aria-expanded`는 버튼이 제어하는 영역이 현재 펼쳐져 있는지 알려주는 속성이다.

아코디언에서는 패널 자체보다 패널을 여닫는 컨트롤 요소인 버튼에 붙인다.

```txt
닫힌 상태
- button aria-expanded="false"
- panel hidden

열린 상태
- button aria-expanded="true"
- panel hidden 제거
```

면접에서 설명할 수 있는 문장:

> `aria-expanded`는 컨트롤 요소가 제어하는 영역이 펼쳐져 있는지 알려주는 속성이기 때문에, 답변 패널을 열고 닫는 버튼에 부여했습니다.

## aria-controls와 aria-labelledby

`aria-controls`는 버튼이 어떤 패널을 제어하는지 알려준다.

값은 실제 패널의 `id`와 일치해야 한다.

```html
<button aria-controls="accordion-panel-1">질문</button>
<div id="accordion-panel-1">답변</div>
```

`aria-labelledby`는 패널이 어떤 질문에 대한 답변인지 알려준다.

패널 입장에서는 질문 버튼의 텍스트가 자신의 이름이나 제목 역할을 한다.

```html
<button id="accordion-question-1">HTML 구조는 왜 중요한가요?</button>
<div aria-labelledby="accordion-question-1">...</div>
```

면접에서 설명할 수 있는 문장:

> 버튼의 `aria-controls` 값과 패널의 `id`를 맞춰 질문 버튼과 답변 영역을 연결했습니다. 패널은 `aria-labelledby`로 질문 버튼을 바라보게 해 어떤 질문에 대한 답변인지 명확히 했습니다.

## hidden

닫힌 답변 패널은 현재 사용자에게 노출되지 않는 콘텐츠다.

그래서 `hidden` 속성으로 비노출 상태를 HTML에 명시했다.

아코디언에서는 `aria-expanded`와 `hidden`이 함께 움직여야 한다.

```txt
aria-expanded="false" + hidden
- 닫힌 상태

aria-expanded="true" + hidden 제거
- 열린 상태
```

면접에서 설명할 수 있는 문장:

> 닫힌 답변 패널은 현재 사용자에게 노출되지 않는 콘텐츠이므로 `hidden` 속성으로 표시했습니다. 아코디언에서는 버튼의 `aria-expanded`와 패널의 `hidden` 상태를 함께 갱신해야 합니다.

## ul/li 구조

FAQ는 여러 개의 질문과 답변이 반복되는 목록형 콘텐츠다.

따라서 의미 없는 `div` 반복보다 `ul/li` 구조가 자연스럽다.

```txt
ul
- FAQ 목록

li
- 질문과 답변을 포함하는 하나의 FAQ 항목
```

면접에서 설명할 수 있는 문장:

> FAQ는 질문과 답변이 반복되는 목록형 콘텐츠이기 때문에 `ul/li`로 구성했습니다. 순서가 핵심인 절차형 콘텐츠는 아니므로 `ol`보다는 `ul`이 적절하다고 봤습니다.

## role="region"

`role="region"`은 패널을 하나의 의미 있는 영역으로 보조기술에 전달할 때 사용할 수 있다.

다만 모든 아코디언 패널에 무조건 붙이는 것은 과할 수 있다.

```txt
유용한 경우
- 패널 내용이 비교적 길거나 독립적인 정보 영역일 때
- 사용자가 영역 단위로 탐색할 가치가 있을 때
- 아코디언 항목 수가 많지 않을 때

과할 수 있는 경우
- FAQ 항목이 매우 많을 때
- 패널 내용이 짧을 때
- region이 너무 많아져 탐색이 번잡해질 때
```

면접에서 설명할 수 있는 문장:

> `role="region"`은 답변 패널을 하나의 의미 있는 영역으로 전달할 때 사용할 수 있지만, 항목이 많거나 내용이 짧으면 과할 수 있어 실무에서는 패널 내용과 개수에 따라 판단할 것 같습니다.

## SCSS 구조 핵심

카드형 아코디언은 질문 버튼과 답변 패널이 하나의 FAQ 항목처럼 보여야 한다.

그래서 외곽 스타일은 `accordion__item`에 두고, 버튼과 패널은 각자의 내부 역할만 담당하게 했다.

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

면접에서 설명할 수 있는 문장:

> 질문과 답변이 하나의 항목으로 인식되도록 외곽 스타일은 `accordion__item`에 주고, 버튼과 패널은 각각 내부 역할에 맞는 간격과 상태 스타일만 담당하게 했습니다.

## 질문 텍스트와 아이콘 배치

질문 텍스트는 왼쪽, `+/-` 아이콘은 오른쪽에 배치하기 위해 버튼을 flex 컨테이너로 만들었다.

```scss
.accordion__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

아이콘은 CSS의 `::after`로 처리했다.

```scss
.accordion__button::after {
  content: "+";
}

.accordion__button[aria-expanded="true"]::after {
  content: "-";
}
```

`+/-`는 실제 콘텐츠라기보다 시각적 상태 표시이므로 HTML에 별도 태그를 추가하지 않았다. 실제 접근성 상태는 `aria-expanded`가 담당한다.

면접에서 설명할 수 있는 문장:

> `+/-` 아이콘은 시각적인 상태 표시이고 실제 접근성 상태는 `aria-expanded`가 담당하므로, HTML에 불필요한 장식 요소를 추가하지 않고 `::after`로 처리했습니다.

## 상태 스타일

열린 상태 스타일은 별도 `.is-open` 클래스가 아니라 `aria-expanded="true"` 기준으로 작성했다.

```scss
.accordion__button[aria-expanded="true"] {
  color: vars.$color-primary;
  border-bottom: 1px solid vars.$color-border;
}
```

이렇게 하면 접근성 상태와 시각적 상태를 같은 기준으로 관리할 수 있다.

면접에서 설명할 수 있는 문장:

> 이번 구현에서는 `aria-expanded`가 이미 열림 상태를 나타내고 있으므로, 별도의 `.is-open` 클래스를 추가하지 않고 해당 속성을 스타일 기준으로 사용했습니다.

## focus-visible과 hover

키보드 사용자는 현재 포커스가 어디에 있는지 시각적으로 확인해야 한다.

그래서 아코디언 버튼에 `:focus-visible`을 작성했다.

```scss
.accordion__button:focus-visible {
  outline: 2px solid vars.$color-primary;
  outline-offset: 2px;
}
```

hover는 포인터를 올려둘 수 있는 환경에서만 의미가 있으므로 `@media (hover: hover)` 안에 작성했다.

또 열린 항목은 이미 상태 스타일이 있으므로, hover는 닫힌 버튼에만 적용했다.

```scss
@media (hover: hover) {
  .accordion__button:not([aria-expanded="true"]):hover {
    background-color: vars.$color-primary-light;
  }
}
```

면접에서 설명할 수 있는 문장:

> hover는 마우스 사용자를 위한 피드백이고, `:focus-visible`은 키보드 사용자가 현재 어떤 아코디언 버튼에 포커스가 있는지 확인할 수 있게 하는 피드백입니다.

## 모바일 대응

모바일에서는 손가락으로 버튼을 조작하기 때문에 터치 영역이 충분해야 한다.

그래서 버튼에 `min-height`와 적절한 padding을 적용했다.

긴 질문이 들어와 줄바꿈되더라도 아이콘과 텍스트가 겹치지 않도록 아이콘은 줄어들지 않게 처리했다.

```scss
.accordion__button::after {
  flex: 0 0 auto;
  flex-shrink: 0;
}
```

면접에서 설명할 수 있는 문장:

> 모바일에서는 손가락으로 버튼을 조작하기 때문에 터치 영역이 충분해야 합니다. 그래서 `min-height`와 padding을 조정해 누르기 쉬운 영역을 확보했고, 긴 질문이 줄바꿈되더라도 아이콘이 줄어들지 않도록 했습니다.

## 피그마가 없을 때 스타일 기준

디자인 시안이 없다면 장식보다 가독성과 가시성을 우선으로 잡는다.

점검 기준:

```txt
1. 정보 위계
- 제목, 설명, 리스트가 자연스럽게 구분되는가

2. 클릭 영역
- 버튼이 충분히 넓고 누를 수 있어 보이는가

3. 상태 구분
- 열린 항목과 닫힌 항목이 구분되는가

4. 간격
- 섹션, 리스트, 항목 사이가 너무 붙거나 멀지 않은가

5. 모바일
- 긴 질문이 들어와도 아이콘과 텍스트가 겹치지 않는가
```

면접에서 설명할 수 있는 문장:

> 디자인 시안이 없다면 가독성과 가시성을 우선 기준으로 삼습니다. 정보 위계가 자연스럽게 보이는지, 클릭 가능한 영역과 상태 변화가 명확한지, 모바일에서 터치 영역과 긴 문구가 깨지지 않는지를 중심으로 간격과 스타일을 정합니다.

## 다음 파트 메모

다음은 vanilla JavaScript로 아코디언 열림/닫힘을 구현한다.

먼저 정책을 정해야 한다.

```txt
A. 여러 개 동시에 열리는 아코디언
B. 하나를 열면 나머지는 닫히는 아코디언
```

FAQ UI에서는 보통 여러 개가 동시에 열리는 방식이 자연스럽고, 메뉴나 필터 그룹은 하나만 열리는 방식이 더 적합할 수 있다.

다음 JS 파트에서 다룰 핵심:

```txt
- .accordion 찾기
- 클릭 이벤트 위임
- 클릭한 .accordion__button 찾기
- aria-controls로 연결 패널 찾기
- 현재 aria-expanded 값 확인
- aria-expanded와 hidden 함께 갱신
```
