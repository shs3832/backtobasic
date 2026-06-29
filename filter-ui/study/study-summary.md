# 필터 UI 요점정리

## 이번 스터디 목표

상품 리스트를 조건에 따라 필터링하는 UI를 HTML, SCSS, vanilla JavaScript로 나누어 구현한다.

이번 과제의 핵심은 필터 폼 구조를 의미 있게 잡고, 선택 조건에 따라 결과 목록을 갱신하는 흐름을 이해하는 것이다.

## 진행 예정 파트

```txt
Part 1. HTML 마크업
- form
- fieldset / legend
- checkbox / radio / select
- label 연결
- 결과 목록 구조

Part 2. SCSS/CSS 스타일링
- 필터 영역과 결과 영역 배치
- 체크박스/라디오/셀렉트 기본 스타일
- 결과 카드 스타일
- 반응형 대응
- focus-visible

Part 3. JavaScript 인터랙션
- 선택된 필터 값 읽기
- 조건에 맞는 결과만 표시
- 결과 개수 갱신
- 정렬 처리
- 초기화 버튼 처리
- 빈 결과 상태 처리

Part 4. 리뷰
- 폼 접근성 체크
- 실무에서 깨질 수 있는 부분
- React 전환 관점
- 면접 답변 정리
```

## Part 1에서 볼 핵심

필터 UI는 탭이나 아코디언처럼 패널을 열고 닫는 구조보다, 사용자가 조건을 선택하는 **폼 UI**에 가깝다.

따라서 ARIA 속성을 많이 추가하기보다 HTML 폼 요소의 기본 의미를 잘 사용하는 것이 중요하다.

```txt
form
- 필터 조건 전체를 감싸는 영역

fieldset
- 관련 있는 입력 요소 묶음

legend
- fieldset 그룹의 제목

label
- 입력 요소의 이름
- 클릭 영역 확대
- 보조기술에 입력 목적 전달

checkbox
- 여러 개 선택 가능

radio
- 같은 name 안에서 하나만 선택 가능

select
- 정렬처럼 정해진 옵션 중 하나를 선택
```

## 접근성 기본 체크

필터 UI에서 가장 먼저 확인할 것은 입력 요소와 이름의 연결이다.

```html
<input type="checkbox" id="category-html" name="category" value="html" />
<label for="category-html">HTML</label>
```

`label`의 `for` 값과 `input`의 `id`가 일치해야 한다.

radio는 같은 그룹 안에서 하나만 선택되어야 하므로 같은 `name` 값을 사용한다.

```html
<input type="radio" name="level" value="all" />
<input type="radio" name="level" value="basic" />
<input type="radio" name="level" value="advanced" />
```

## 면접에서 설명할 수 있는 문장

> 필터 UI는 사용자가 조건을 선택하는 폼이기 때문에 `form`을 사용하고, 관련 있는 조건은 `fieldset`과 `legend`로 묶었습니다.

> 카테고리는 복수 선택이 가능하므로 `checkbox`, 난이도는 하나만 선택하는 조건이므로 같은 `name`을 가진 `radio`로 구성했습니다.

> 모든 입력 요소는 `label`과 연결해 클릭 영역과 접근성을 확보하고, 결과 목록은 반복 콘텐츠라 `ul/li` 구조로 작성할 예정입니다.

## 다음 단계 메모

먼저 `index.html`에서 필터 폼과 결과 목록의 의미 구조를 작성한다.

코드를 작성한 뒤에는 다음 관점으로 검토한다.

```txt
- form이 필요한 구조인가
- fieldset / legend가 적절히 묶였는가
- checkbox와 radio 선택 기준이 맞는가
- input과 label이 빠짐없이 연결되었는가
- select에 label이 있는가
- 결과 목록이 ul/li로 표현되었는가
- CSS 없이도 필터와 결과 흐름이 읽히는가
```
