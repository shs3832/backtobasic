# 접근성 기본기 1회독 회고

## 회고 목적

카드 리스트, 탭, 아코디언, 필터, 폼 검증, 모달 UI를 구현하며 접근성 관련 속성과 사용자 흐름을 한 번 훑었다.

완벽하게 외우는 것이 목적은 아니었다. 각 UI 패턴에서 어떤 상태와 관계를 HTML, CSS, JavaScript로 표현해야 하는지 보고, 실무에서 어떤 질문을 던져야 하는지 감을 잡는 것이 이번 회고의 핵심이다.

## 진행한 과제

```txt
1. 반응형 카드 리스트
2. 탭 UI
3. 아코디언 UI
4. 필터 UI
5. 폼 검증 UI
6. 모달 UI
```

## 전체 흐름에서 배운 것

HTML은 구조와 의미를 만든다.

CSS는 상태를 시각적으로 드러낸다.

JavaScript는 상태 변경과 포커스 흐름을 제어한다.

ARIA는 화면에 보이는 상태와 관계를 보조기술에도 전달한다.

이 네 가지가 따로 움직이는 것이 아니라, 하나의 UI 상태를 서로 다른 방식으로 표현한다는 점을 반복해서 확인했다.

## 과제별 핵심

### 카드 리스트

- 반복 콘텐츠는 `ul/li`로 구성한다.
- 카드 하나가 독립적인 콘텐츠라면 `article`을 사용할 수 있다.
- 링크와 버튼의 역할을 구분한다.
- 찜하기처럼 눌림 상태가 있는 버튼은 `aria-pressed`를 사용할 수 있다.
- 이미지 `alt`는 이미지가 전달하는 정보 기준으로 작성한다.

### 탭 UI

- 탭은 페이지 이동이 아니라 콘텐츠 전환 인터랙션이므로 `button`이 적절하다.
- `role="tablist"`, `role="tab"`, `role="tabpanel"`로 탭 구조를 전달한다.
- 선택 상태는 `aria-selected`로 표현한다.
- 탭과 패널은 `aria-controls`, `aria-labelledby`로 연결한다.
- 비활성 패널은 `hidden`으로 숨긴다.

### 아코디언 UI

- 질문은 `button`으로 작성한다.
- 열림 상태는 `aria-expanded`로 표현한다.
- 질문 버튼과 답변 패널은 `aria-controls`, `aria-labelledby`로 연결한다.
- 닫힌 패널은 `hidden`으로 관리한다.
- 아코디언 정책은 하나만 열림인지, 여러 개 동시 열림인지 먼저 정해야 한다.

### 필터 UI

- 필터는 폼 UI에 가깝다.
- 관련 input은 `fieldset`, `legend`로 그룹화한다.
- checkbox는 복수 선택, radio는 같은 `name` 안에서 단일 선택이다.
- 결과 목록은 `ul/li`와 `article`로 구성할 수 있다.
- 조건에 맞지 않는 결과는 `hidden`으로 제외할 수 있다.
- 결과 개수 텍스트는 현재 필터 상태와 동기화한다.

### 폼 검증 UI

- `label`은 input의 이름이고, `aria-describedby`는 도움말이나 에러 메시지를 연결한다.
- `required`는 의미 전달과 기본 검증 조건에 도움이 되지만, 화면에도 필수 여부를 보여주는 것이 좋다.
- `aria-invalid`는 초기 HTML이 아니라 검증 실패 이후에 적용한다.
- `novalidate`로 브라우저 기본 말풍선을 끄고 직접 검증 흐름을 제어할 수 있다.
- `validity.valid`로 브라우저가 가진 기본 검증 결과를 JavaScript에서 읽을 수 있다.
- 검증 실패 시 첫 번째 오류 필드로 포커스를 이동시키면 수정 흐름이 짧아진다.

### 모달 UI

- 모달은 `role="dialog"`와 `aria-modal="true"`로 역할과 상태를 전달한다.
- 제목과 설명은 `aria-labelledby`, `aria-describedby`로 연결한다.
- 닫기 버튼의 아이콘은 장식으로 보고 `aria-hidden="true"` 처리할 수 있다.
- 닫힌 모달은 `hidden`으로 사용자 흐름에서 제외한다.
- 모달이 열리면 포커스를 모달 내부로 이동시킨다.
- 모달이 닫히면 포커스를 원래 열기 버튼으로 복귀시킨다.
- ESC 닫기와 focus trap은 모달 접근성 완성도를 높이는 중요한 처리다.

## 반복해서 나온 패턴

### 상태와 ARIA 연결

```txt
toggle button -> aria-pressed
tab -> aria-selected
accordion -> aria-expanded
input error -> aria-invalid
description/help/error -> aria-describedby
control target -> aria-controls
dialog title -> aria-labelledby
modal -> aria-modal
```

### hidden 상태 제어

`hidden`은 단순히 화면에서 보이지 않게 하는 것뿐 아니라, 닫힌 패널이나 모달을 사용자 흐름과 보조기술 흐름에서 제외하는 기준으로 사용할 수 있다.

탭 패널, 아코디언 패널, 필터 결과, 모달에서 반복해서 사용했다.

### 포커스 흐름

접근성 구현에서는 화면에 보이는 상태만 바꾸는 것으로 끝나지 않는다.

사용자의 키보드 포커스가 어디에 있어야 하는지도 함께 고려해야 한다.

```txt
폼 검증 실패 -> 첫 번째 오류 필드로 이동
모달 열림 -> 모달 내부 조작 요소로 이동
모달 닫힘 -> 모달을 열었던 버튼으로 복귀
모달 열린 상태 -> focus trap으로 내부 순환
```

### 상태 기반 스타일링

```scss
[aria-selected="true"] {}
[aria-expanded="true"] {}
[aria-invalid="true"] {}
button:focus-visible {}
@media (hover: hover) {}
[hidden] {
  display: none;
}
```

클래스만으로 상태를 표현하는 것이 아니라, 접근성 상태와 시각적 상태를 같은 기준으로 맞추는 방식을 연습했다.

## 아직 부족하다고 느낀 부분

ARIA 속성과 UI 역할의 연결은 아직 더 반복이 필요하다.

`filter`, `some`, `every`, `map`, `sort` 같은 배열 조작은 필터 UI에서 중요하게 쓰였지만 아직 손에 완전히 익지는 않았다.

CSS Grid도 Flex에 비해 익숙하지 않아, 운영 UI 레이아웃이나 카드/대시보드 과제에서 다시 연습할 필요가 있다.

면접식 답변은 GPT처럼 유창할 필요는 없지만, 큰 맥락을 짧게 말하는 연습은 계속 필요하다.

## 실무에서 바로 가져갈 패턴

이벤트 위임은 반복 UI에서 바로 활용하기 좋다.

```js
container.addEventListener("click", (event) => {
  const button = event.target.closest(".target-button");
  if (!button) return;
});
```

상태 스타일링은 접근성 상태와 시각적 표현을 연결하는 방식으로 가져갈 수 있다.

```scss
.form__input[aria-invalid="true"] {
  border-color: $color-error;
}
```

반복 UI는 이벤트 위임으로 처리하고, 선택/열림/오류 같은 상태는 ARIA 속성과 CSS 상태 선택자를 연결해서 관리하는 패턴이 이번 스터디에서 가장 실무적으로 남았다.

## 앞으로의 방향

접근성 기본기 1회독은 모달 UI까지로 마무리한다.

다음 단계는 운영 UI 개발 패턴으로 넘어간다.

```txt
- 테이블 UI
- 페이지네이션
- 드롭다운 / 메뉴
- 토스트 / 알림
- 검색 / 필터 조합
- 관리자 목록 화면
```

이후에는 vanilla HTML/CSS/JavaScript로 구현한 패턴을 React 컴포넌트와 state 기반 렌더링 관점으로 다시 해석한다.
