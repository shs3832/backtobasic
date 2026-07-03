# 폼 검증 UI 요점정리

## 이번 스터디 목표

회원 정보 입력 폼을 HTML, SCSS, vanilla JavaScript로 나누어 구현한다.

이번 과제의 핵심은 폼을 예쁘게 만드는 것이 아니라, 사용자가 입력해야 할 값과 오류 상태를 명확히 이해할 수 있도록 접근성 있는 HTML 구조를 잡는 것이다.

## 진행 예정 파트

```txt
Part 1. HTML 마크업
- form
- label / input 연결
- required
- aria-describedby
- 도움말 / 에러 메시지 영역
- fieldset / legend

Part 2. SCSS/CSS 스타일링
- 기본 입력 스타일
- 필수 표시
- 도움말 / 에러 메시지 위계
- focus-visible
- 오류 상태 스타일

Part 3. JavaScript 검증
- submit 이벤트
- 값 검증
- aria-invalid 갱신
- 에러 메시지 표시
- 첫 번째 오류 필드로 focus 이동

Part 4. 리뷰
- 폼 접근성 체크
- 실무에서 깨질 수 있는 부분
- 면접 답변 정리
```

## Part 1에서 볼 핵심

폼 검증 UI에서는 에러 메시지를 input 근처에 배치하고, HTML 구조에서도 input과 설명의 관계를 명확히 연결해야 한다.

```txt
label
- input의 이름
- 이 입력칸이 무엇인지 알려줌

aria-describedby
- input에 대한 추가 설명
- 도움말, 조건 안내, 에러 메시지를 연결

required
- 브라우저와 보조기술에 필수 입력 의미를 전달
- 시각 사용자에게는 별도 필수 텍스트도 제공하는 것이 좋음

fieldset / legend
- 여러 input이 하나의 질문에 속할 때 그룹화
- checkbox 그룹의 맥락을 제공

aria-invalid
- 입력값이 유효하지 않다는 상태를 전달
- 초기 HTML에 넣기보다 검증 실패 시 동적으로 적용
```

## 오늘 정리한 판단

에러 메시지는 해당 input 근처에 두는 것이 좋다.

```txt
시각적 이유
- 어떤 입력 필드에서 에러가 발생했는지 바로 알 수 있음

접근성 이유
- aria-describedby로 input과 에러 메시지를 연결할 수 있음
```

`label`과 `aria-describedby`는 역할이 다르다.

```txt
label
= 입력 필드의 이름

aria-describedby
= 입력 필드에 대한 도움말이나 오류 설명
```

필수 입력은 `required`만으로 끝내지 않고 화면에도 표시한다.

```html
<label for="name">
  이름 <span class="form__required">필수</span>
</label>
```

비밀번호처럼 입력 조건과 에러 메시지가 모두 필요한 필드는 여러 설명을 함께 연결할 수 있다.

```html
<input
  id="password"
  type="password"
  aria-describedby="password-help user-password-error"
/>
```

관심 분야처럼 여러 checkbox 중 최소 1개를 선택해야 하는 조건은 그룹 단위 검증이다.

```html
<fieldset aria-describedby="interest-error">
  <legend>관심분야</legend>
  ...
  <p id="interest-error" class="form__error"></p>
</fieldset>
```

개별 checkbox에 `required`를 붙이면 모든 checkbox를 필수로 선택해야 하는 의미가 될 수 있으므로, 최소 1개 선택 조건은 JavaScript에서 그룹 단위로 검증하는 것이 자연스럽다.

에러 메시지 영역은 HTML 단계에서 미리 만들어둘 수 있다.

```txt
HTML
- 에러 메시지가 표시될 위치와 연결 구조를 정의

JavaScript
- 에러 메시지 내용과 aria-invalid 상태를 갱신
```

submit 버튼은 `type="submit"`으로 명시한다.

```txt
- form 제출 역할을 구조적으로 드러냄
- Enter 키 제출 흐름과 연결됨
- submit 이벤트에서 검증 로직을 처리하기 좋음
```

## 접근성 체크 포인트

- 모든 input은 label과 연결되어 있는가
- 필수 입력 여부가 시각적으로도 제공되는가
- 도움말과 에러 메시지가 aria-describedby로 연결되어 있는가
- checkbox 그룹은 fieldset과 legend로 묶여 있는가
- 그룹 단위 에러는 fieldset에 연결되어 있는가
- 초기 HTML에 aria-invalid를 미리 넣지 않았는가
- submit 실패 시 첫 번째 오류 필드로 focus를 이동시킬 계획이 있는가

## Part 2에서 볼 핵심

폼 검증 UI의 스타일은 화려함보다 **입력 흐름, 필수 표시, 도움말, 에러 상태가 명확히 구분되는 것**이 중요하다.

```txt
입력 필드
- 모바일 터치와 클릭 영역을 고려해 min-height: 44px 기준 사용
- label, input, help, error의 수직 흐름을 명확히 구성

필수 표시
- label 근처에 작고 명확하게 표시
- required 속성만으로 끝내지 않고 시각적으로도 안내

도움말
- 입력 전 알아야 하는 보조 정보
- 본문보다 약한 색상으로 표현

에러 메시지
- input 근처에 표시
- 빨간색을 사용하되 과하지 않게 텍스트/보더 중심으로 표현

포커스
- 키보드 사용자가 현재 위치를 알 수 있도록 focus-visible 제공
```

이번 스타일에서 기억할 접근성 패턴:

```scss
.form {
  input:focus-visible,
  select:focus-visible,
  button:focus-visible {
    outline: 3px solid $color-primary;
    outline-offset: 3px;
  }
}
```

`outline`은 키보드 포커스가 어디 있는지 보여주고, `outline-offset`은 포커스 링을 요소 바깥으로 띄워 더 잘 보이게 한다.

오류 상태는 나중에 JavaScript로 붙을 `aria-invalid="true"`를 기준으로 스타일링한다.

```scss
.form__input[aria-invalid="true"] {
  border-color: $color-error;
  background-color: $color-error-bg;
}
```

이렇게 하면 보조기술에 전달되는 오류 상태와 시각적 오류 스타일의 기준을 맞출 수 있다.

hover는 실제 hover가 가능한 환경에서만 적용한다.

```scss
@media (hover: hover) {
  .form__submit:hover {
    color: $color-primary;
  }
}
```

## Part 3에서 볼 핵심

폼 검증 JavaScript는 값을 검사하는 것 자체보다 **오류 상태를 사용자와 보조기술에 어떻게 전달할지**가 중요하다.

이번 구현은 브라우저 기본 검증 말풍선을 사용하지 않고, submit 시점에 직접 검증 흐름을 제어했다.

```html
<form class="form" novalidate>
```

`novalidate`는 브라우저 기본 검증 UI를 끄기 위해 사용했다. 대신 `required`, `type="email"` 같은 HTML 의미는 유지하고, JavaScript에서 직접 에러 메시지와 포커스 이동을 처리했다.

이메일 검증에는 브라우저의 Constraint Validation API를 활용했다.

```js
const isEmailValid = inputEmail.validity.valid;
```

`validity.valid`는 해당 input에 적용된 검증 조건을 통과했는지 알려준다. `type="email"`, `required`, `minlength`, `pattern` 같은 조건과 함께 사용할 수 있다.

검증 실패 시에는 에러 메시지를 채우고 `aria-invalid`를 동적으로 적용한다.

```js
inputEmailError.textContent = "이메일 형식으로 입력해주세요";
inputEmail.setAttribute("aria-invalid", "true");
```

`aria-invalid`는 필수 여부가 아니라 **현재 입력값이 검증에 실패했다는 상태**를 전달하는 속성이므로 초기 HTML에 넣지 않고 submit 이후 실패한 필드에만 적용하는 것이 적절하다.

매 submit마다 기존 에러 상태를 먼저 초기화한 뒤 현재 입력값 기준으로 다시 검증한다.

```js
inputNameError.textContent = "";
inputName.removeAttribute("aria-invalid");
```

이렇게 하지 않으면 사용자가 값을 수정했는데도 이전 에러 메시지나 잘못된 상태가 남아 있을 수 있다.

첫 번째 오류 필드는 변수로 기억한 뒤 마지막에 focus를 이동시킨다.

```js
if (firstInvalidField) {
  firstInvalidField.focus();
  return;
}
```

키보드 사용자나 스크린리더 사용자는 오류 위치를 다시 찾아가야 하는 부담이 크기 때문에, 첫 번째 오류 필드로 이동시키면 수정 흐름이 짧아진다.

checkbox 그룹은 개별 checkbox가 아니라 그룹 전체의 조건을 검증했다.

```js
const hasInterest = Array.from(interestInputs).some((input) => {
  return input.checked;
});
```

관심 분야는 “각 checkbox가 잘못됨”이 아니라 “그룹에서 하나 이상 선택해야 하는 조건을 만족하지 못함”이므로, `fieldset` 아래의 그룹 에러 메시지로 안내했다.

## JavaScript에서 정리한 판단

필수 DOM 요소가 없을 경우를 대비해 이벤트 연결 전에 방어 코드를 둔다.

```js
const hasDOM =
  inputName &&
  inputNameError &&
  inputEmail &&
  inputEmailError &&
  inputPassword &&
  inputPasswordError &&
  interestInputs.length > 0 &&
  interestError;
```

`&&`는 모든 조건이 필요할 때 사용하고, `||`는 하나라도 해당되면 처리해야 할 때 사용한다.

```js
if (a && b && c) {
  // a, b, c가 모두 있을 때
}

if (!a || !b || !c) {
  // a, b, c 중 하나라도 없을 때
}
```

이번 코드에서는 함수로 감싸지 않은 구조였기 때문에 `return`을 아무 위치에서나 사용할 수 없었다. `return`은 함수 내부에서만 사용할 수 있으므로, 현재 구조에서는 “필요한 DOM이 모두 있을 때만 이벤트를 연결한다”는 방식으로 정리했다.

## 면접에서 설명할 수 있는 문장

> 에러 메시지는 사용자가 수정해야 할 입력 필드와 가까운 위치에 배치하고, `aria-describedby`로 input과 연결해 보조기술도 오류 내용을 함께 인식할 수 있도록 했습니다.

> `label`은 입력 필드의 이름을 제공하고, `aria-describedby`는 도움말이나 에러 메시지 같은 추가 설명을 연결할 때 사용했습니다.

> `required`는 HTML 검증과 의미 전달에 도움이 되지만, 사용자가 제출 전에 필수 여부를 알 수 있도록 label 근처에 “필수” 텍스트도 함께 제공했습니다.

> 관심 분야는 여러 checkbox 중 최소 하나를 선택해야 하는 그룹 조건이므로, 개별 checkbox가 아니라 fieldset 전체에 에러 메시지를 연결했습니다.

> `aria-invalid`는 초기 상태에 넣지 않고, submit 이후 검증 실패가 확인된 필드에 동적으로 적용하는 것이 정확하다고 봤습니다.

> 키보드 사용자가 현재 입력 위치를 놓치지 않도록 `focus-visible`에 `outline`과 `outline-offset`을 적용했습니다.

> 오류 상태 스타일은 별도 클래스가 아니라 `aria-invalid="true"` 상태를 기준으로 잡아, 접근성 상태와 시각적 표현이 같은 기준을 보도록 했습니다.

> `novalidate`로 브라우저 기본 검증 말풍선은 끄되, `required`, `type="email"`, `validity.valid` 같은 HTML 검증 정보는 JavaScript에서 활용했습니다.

> 폼 제출 시 기존 에러 상태를 초기화하고 현재 입력값 기준으로 다시 검증해, 이미 해결된 오류가 화면이나 보조기술에 남지 않도록 했습니다.

> 검증 실패 시 첫 번째 오류 필드로 focus를 이동시켜 키보드 사용자와 스크린리더 사용자가 수정해야 할 위치를 빠르게 찾을 수 있도록 했습니다.

## 다음 단계 메모

폼 검증 UI는 여기서 마무리하고, 다음 스터디는 접근성 기본기 마지막 과제로 모달 UI를 진행한다.

모달 UI에서는 지금까지 배운 `aria-labelledby`, `aria-describedby`, 상태 제어, 포커스 이동, 키보드 조작을 종합해서 다룬다.
