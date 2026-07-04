# Form Validation UI Study - Part 1 HTML 마크업

## 목표

회원 정보 입력 폼을 CSS와 JavaScript 없이 HTML만으로 작성한다.

이번 파트의 핵심은 화면을 예쁘게 만드는 것이 아니라, 사용자가 입력해야 할 값과 오류가 표시될 위치를 이해할 수 있도록 `form`, `label`, `required`, `aria-describedby`, `fieldset`, `legend`를 올바르게 구성하는 것이다.

## 구현 범위

이번 파트에서는 `index.html`만 작성한다.

```txt
form-validation-ui/study/
└─ index.html
```

SCSS, CSS, JavaScript는 다음 파트에서 작성한다.

## 화면 구성

```txt
폼 학습

폼 UI
실무 UI 구현에서 자주 사용하는 폼 UI를 학습합니다.

[회원 정보 입력]

이름 필수
[이름을 입력해주세요]
에러 메시지 영역

이메일 필수
[이메일을 입력해주세요]
에러 메시지 영역

비밀번호 필수
[비밀번호 입력]
8자 이상 입력해주세요.
에러 메시지 영역

[관심분야]
□ HTML
□ CSS
□ JavaScript
에러 메시지 영역

[가입하기]
```

## 구현 요구사항

- 페이지의 핵심 콘텐츠는 `main` 안에 작성한다.
- 페이지 대표 제목은 `h1`으로 작성한다.
- 폼 영역은 `section`으로 묶고 `aria-labelledby`로 제목과 연결한다.
- 입력 영역은 `form`으로 작성한다.
- 이름, 이메일, 비밀번호는 각각 `label`과 `input`을 연결한다.
- 각 input은 제출 데이터 식별을 위해 `name`을 가진다.
- 필수 입력 필드는 `required`를 사용한다.
- 필수 여부는 화면에도 텍스트로 제공한다.
- 비밀번호 조건 안내 문구는 input과 `aria-describedby`로 연결한다.
- 에러 메시지가 들어갈 영역은 input 근처에 미리 작성한다.
- 에러 메시지 영역은 `aria-describedby`로 input과 연결한다.
- 관심 분야 checkbox 그룹은 `fieldset`과 `legend`로 묶는다.
- 관심 분야 그룹 에러 메시지는 `fieldset`의 `aria-describedby`로 연결한다.
- 제출 버튼은 `type="submit"`으로 작성한다.
- `aria-invalid`는 초기 HTML에 작성하지 않는다.

## 필드 요구사항

### 이름

```txt
type: text
필수 여부: 필수
에러 메시지: 이름을 입력해주세요.
```

### 이메일

```txt
type: email
필수 여부: 필수
에러 메시지: 이메일을 입력해주세요. / 이메일 형식으로 입력해주세요.
```

### 비밀번호

```txt
type: password
필수 여부: 필수
도움말: 8자 이상 입력해주세요.
에러 메시지: 비밀번호를 입력해주세요. / 비밀번호는 8자 이상이어야 합니다.
```

### 관심 분야

```txt
type: checkbox
옵션: HTML, CSS, JavaScript
검증 조건: 최소 1개 선택
에러 메시지: 관심 분야를 1개 이상 선택해주세요.
```

## 접근성 체크 포인트

- `html`의 `lang` 값은 `ko`로 작성한다.
- `label`의 `for`와 `input`의 `id`가 일치한다.
- `label`은 input의 이름을 제공한다.
- `aria-describedby`는 도움말이나 에러 메시지 같은 추가 설명을 연결한다.
- 여러 설명이 필요한 경우 `aria-describedby`에 여러 id를 공백으로 연결할 수 있다.
- `required`만으로 필수 여부를 끝내지 않고, 화면에도 필수 텍스트를 제공한다.
- checkbox 그룹처럼 여러 input이 하나의 질문에 속할 때는 `fieldset`과 `legend`를 사용한다.
- 그룹 단위 오류는 특정 checkbox 하나가 아니라 `fieldset`에 연결한다.
- `aria-invalid`는 초기 상태가 아니라 검증 실패 이후 JavaScript로 적용한다.

## 완료 기준

- HTML 문법 오류 없이 작성되어 있다.
- `main`, `section`, `form`, `fieldset`, `legend`, `label`, `input`, `button`이 역할에 맞게 사용되어 있다.
- 모든 input은 label과 연결되어 있다.
- 필수 필드는 `required`와 시각적 필수 표시를 함께 가진다.
- 도움말과 에러 메시지 영역이 `aria-describedby`로 연결되어 있다.
- 관심 분야 checkbox 그룹은 `fieldset`과 `legend`로 묶여 있다.
- 초기 HTML에는 `aria-invalid`가 들어가지 않는다.

## 면접에서 설명할 수 있는 문장

> 폼 검증 UI에서는 사용자가 입력해야 할 값과 오류 위치를 이해할 수 있도록 label과 input을 명확히 연결했습니다.

> 비밀번호 조건처럼 입력 전에 알아야 하는 도움말과 검증 실패 후 표시될 에러 메시지는 `aria-describedby`로 input에 연결했습니다.

> 관심 분야는 여러 checkbox 중 최소 하나를 선택해야 하는 그룹 조건이므로, 개별 checkbox가 아니라 fieldset 전체에 에러 설명을 연결했습니다.

> `aria-invalid`는 초기 상태에 넣지 않고, submit 이후 실제 검증에 실패한 필드에 동적으로 적용하는 것이 적절하다고 봤습니다.
