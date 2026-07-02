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

## 면접에서 설명할 수 있는 문장

> 에러 메시지는 사용자가 수정해야 할 입력 필드와 가까운 위치에 배치하고, `aria-describedby`로 input과 연결해 보조기술도 오류 내용을 함께 인식할 수 있도록 했습니다.

> `label`은 입력 필드의 이름을 제공하고, `aria-describedby`는 도움말이나 에러 메시지 같은 추가 설명을 연결할 때 사용했습니다.

> `required`는 HTML 검증과 의미 전달에 도움이 되지만, 사용자가 제출 전에 필수 여부를 알 수 있도록 label 근처에 “필수” 텍스트도 함께 제공했습니다.

> 관심 분야는 여러 checkbox 중 최소 하나를 선택해야 하는 그룹 조건이므로, 개별 checkbox가 아니라 fieldset 전체에 에러 메시지를 연결했습니다.

> `aria-invalid`는 초기 상태에 넣지 않고, submit 이후 검증 실패가 확인된 필드에 동적으로 적용하는 것이 정확하다고 봤습니다.

## 다음 단계 메모

다음 파트에서는 SCSS/CSS로 폼의 기본 시각 구조를 정리한다.

```txt
- form 전체 폭과 간격
- label / input / 도움말 / 에러 메시지 위계
- 필수 표시 스타일
- checkbox 그룹 정렬
- focus-visible
- 오류 상태 스타일
```
