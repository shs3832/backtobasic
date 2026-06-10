# Study 02 요점정리 - 반응형 카드 리스트 SCSS/CSS

## 이번 스터디 목표

Part 1에서 작성한 HTML 마크업을 기준으로 카드 리스트의 기본 스타일과 반응형 레이아웃을 작성했다.

이번 파트의 목적은 화려한 디자인이 아니라, 유지보수하기 쉬운 SCSS 구조와 깨지지 않는 카드 레이아웃을 만드는 것이다.

- SCSS 파일 역할을 분리한다.
- CSS Grid로 카드 리스트를 반응형 배치한다.
- 카드 이미지 비율을 안정적으로 유지한다.
- 긴 제목과 설명이 들어와도 카드 레이아웃이 깨지지 않게 한다.
- hover, focus-visible, reduced motion 같은 상태/접근성 스타일의 기준을 이해한다.

## 파일 구조

```txt
study02/responsive-card-list/
├─ index.html
├─ scss/
│  ├─ style.scss
│  ├─ _reset.scss
│  ├─ _variables.scss
│  ├─ _mixins.scss
│  └─ _card.scss
└─ css/
   └─ style.min.css
```

## SCSS 파일 역할

### style.scss

전체 SCSS 진입점이다.

```scss
@use "_variables" as vars;
@use "_mixins" as mixins;
@use "_reset";
@use "_card" as card;
```

처음에는 `_card.scss`를 위에서 불러오면 reset보다 카드 스타일이 먼저 출력될 수 있다는 점을 확인했다.

그래서 reset을 `_reset.scss`로 분리하고, `style.scss`에서 reset을 card보다 먼저 불러오도록 정리했다.

### _variables.scss

색상, 간격, radius, 컨테이너 폭처럼 반복적으로 쓰이는 값을 변수로 관리한다.

```scss
$container-max-width: 1120px;
$container-padding: 20px;

$space-1: 4px;
$space-2: 8px;
$space-3: 12px;
$space-4: 16px;
$space-5: 20px;
$space-6: 24px;
$space-16: 64px;

$color-bg: #f8fafc;
$color-surface: #ffffff;
$color-border: #e5e7eb;
$color-title: #0f172a;
$color-muted: #64748b;
$color-primary: #2563eb;
$color-primary-light: #dbeafe;
```

변수의 장점은 UI 간격과 색상 기준을 일관되게 유지하고, 디자인 토큰과 연결하기 쉽다는 점이다.

다만 모든 값을 무조건 변수화하는 것이 항상 좋은 것은 아니다. 1회성 보정값까지 모두 변수화하면 예외 대응이 어렵고 관리 비용이 늘 수 있다.

### _mixins.scss

반복되는 스타일 패턴을 mixin으로 분리한다.

이번 파트에서는 말줄임 처리를 위한 `line-clamp` mixin을 작성했다.

```scss
@mixin line-clamp($lines) {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
}
```

### _reset.scss

브라우저 기본 스타일 중 레이아웃에 영향을 주는 부분만 최소한으로 정리했다.

```scss
* {
  margin: 0;
  padding: 0;
}

ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}

button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
```

button reset을 할 때는 `outline: none`을 습관적으로 제거하지 않도록 주의해야 한다. 기본 버튼 스타일을 제거했다면 별도의 `focus-visible` 스타일을 제공해야 한다.

### _card.scss

카드 리스트 과제의 주요 UI 스타일을 담당한다.

- `.card-section`: 섹션 제목과 설명
- `.card-list`: Grid 레이아웃
- `.card`: 카드 본체
- `.card__image`: 이미지 비율 영역
- `.card__title`, `.card__desc`: 텍스트 줄 수 제한
- `.card__tags`: 태그 목록
- `.card__actions`: 링크와 버튼 영역

처음에는 `.card-list`를 `style.scss`에 둘 수도 있다고 봤지만, 카드 리스트 UI 전체를 하나의 모듈로 본다면 `_card.scss`에 함께 두는 것도 자연스럽다고 판단했다.

## Grid 정리

Flex는 한 방향 배치에 강하고, Grid는 행과 열이 있는 2차원 배치에 강하다.

카드 리스트처럼 3열, 2열, 1열로 바뀌는 UI는 Grid가 설명하기 쉽다.

```scss
.card-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: vars.$space-6;
}
```

의미는 다음과 같다.

```txt
repeat(3, ...)
- 열을 3개 만든다

minmax(280px, 1fr)
- 각 열은 최소 280px을 유지한다
- 남는 공간은 1fr 비율로 나눠 가진다
```

현재 코드는 desktop-first 방식이다.

```scss
.card-list {
  grid-template-columns: repeat(3, minmax(280px, 1fr));

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(280px, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

정리:

```txt
max-width 방식
- 데스크톱 스타일을 기본으로 작성
- 화면이 작아질수록 덮어쓴다
- desktop-first

min-width 방식
- 모바일 스타일을 기본으로 작성
- 화면이 커질수록 확장한다
- mobile-first
```

요즘 반응형 기본기는 mobile-first가 더 정석에 가깝지만, 이번 코드에서는 현재 작성 흐름을 유지하기 위해 `max-width` 방식을 그대로 사용했다.

## 컨테이너 역할

처음에는 `main`과 `.card-list`가 모두 `max-width`, `margin`, `padding`을 가질 수 있었다.

하지만 둘 다 컨테이너 역할을 하면 제목/설명과 카드 리스트의 좌우 기준이 어긋날 수 있고, 여백이 중복될 수 있다.

그래서 `main`이 페이지 콘텐츠 폭과 여백을 담당하고, `.card-list`는 Grid 배치만 담당하는 방향이 더 명확하다.

```scss
main {
  max-width: vars.$container-max-width;
  margin: 0 auto;
  padding: vars.$space-16 vars.$container-padding;
}

.card-list {
  display: grid;
  gap: vars.$space-6;
}
```

역할 정리:

```txt
main
- 페이지 콘텐츠 최대 너비
- 중앙 정렬
- 좌우/상하 여백

card-list
- 카드 목록의 Grid 배치
- 열 수와 간격
```

## 이미지 영역

처음에는 `img`에 직접 `aspect-ratio`를 줄 수도 있지만, 이번 구조에서는 wrapper인 `.card__image`에 비율을 주는 방식이 더 안정적이라고 판단했다.

```scss
.card__image {
  aspect-ratio: 16 / 9;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
}
```

정리:

```txt
aspect-ratio
- 이미지 영역의 비율을 유지한다

display: block
- img의 inline baseline 여백을 제거한다

object-fit: cover
- 이미지 비율을 유지하면서 영역을 꽉 채운다
- 일부 이미지가 잘릴 수 있다

overflow: hidden
- 영역 밖으로 넘치는 이미지를 숨긴다
```

wrapper에 비율을 주면 이미지 로딩 전에도 영역이 안정적이고, 나중에 이미지 위에 오버레이나 배지를 얹기도 쉽다.

## line-clamp

카드 제목과 설명에는 2줄 제한을 적용했다.

```scss
.card__title {
  @include mixins.line-clamp(2);
}

.card__desc {
  @include mixins.line-clamp(2);
}
```

카드 리스트는 여러 항목을 빠르게 훑어보는 UI다. 제목이나 설명이 너무 길면 카드 높이가 과하게 늘어나고, 카드 간 균형이 깨져 보일 수 있다.

단점도 있다. 중요한 정보가 뒤쪽에 있으면 말줄임 때문에 보이지 않을 수 있다.

그래서 카드 설명은 요약 문구로 작성하고, 전체 내용은 상세보기에서 확인할 수 있도록 구성하는 것이 좋다.

## hover와 focus-visible

카드 전체가 아니라 실제 조작 가능한 요소인 링크와 버튼에만 hover/focus 스타일을 적용하는 방향으로 잡았다.

```txt
상세보기 링크
- 페이지 이동

찜하기 버튼
- 상태 변경
```

카드 전체에 hover를 주면 사용자가 카드 전체를 클릭 가능한 영역으로 오해할 수 있다.

### hover

hover 스타일은 `@media (hover: hover)` 안에 작성했다.

```scss
@media (hover: hover) {
  .card__link:hover {
    color: vars.$color-title;
  }

  .card__favorite:hover {
    color: vars.$color-primary;
    background-color: vars.$color-primary-light;
    border-color: vars.$color-primary;
  }
}
```

`@media (hover: hover)`는 hover 입력을 지원하는 환경에서만 hover 스타일을 적용한다.

터치 기기에서는 hover 상태가 애매하게 남거나 선택 상태처럼 보일 수 있으므로, 모바일/터치 환경을 고려한 처리다.

### focus-visible

키보드 사용자가 `Tab`으로 이동할 때 현재 어느 요소에 포커스가 갔는지 확인할 수 있도록 `focus-visible`을 적용했다.

```scss
.card__link:focus-visible,
.card__favorite:focus-visible {
  outline: 3px solid vars.$color-primary;
  outline-offset: 3px;
}
```

`hover`와 `focus-visible`은 구분해야 한다.

```txt
hover
- 마우스를 올렸을 때

focus-visible
- 주로 키보드 탐색으로 포커스가 갔을 때
```

## prefers-reduced-motion

`prefers-reduced-motion: reduce`는 사용자가 OS나 브라우저에서 움직임 줄이기 설정을 켰을 때 animation이나 transition을 줄이기 위한 미디어쿼리다.

현재 코드에는 transition이나 animation을 사용하지 않기 때문에 실제 대응 코드는 활성화하지 않았다.

다만 아직 익숙하지 않은 속성이므로 학습 메모로 주석을 남겼다.

```scss
// transition/animation을 추가하는 경우 prefers-reduced-motion: reduce 대응을 함께 검토한다.
```

정리:

```txt
transition/animation 없음
- prefers-reduced-motion 생략 가능

transition/animation 있음
- prefers-reduced-motion 대응 권장
```

## border와 shadow

이번 카드 UI는 운영 UI와 기본기 과제에 가깝기 때문에 `box-shadow`보다 `border` 중심으로 카드 경계를 표현하는 방향이 적절하다고 봤다.

```scss
.card {
  background-color: vars.$color-surface;
  border-radius: vars.$radius-card;
  padding: vars.$container-padding;
  border: 1px solid vars.$color-border;
}
```

border 중심 카드의 장점:

- 정보형 UI에서 과하게 장식적이지 않다.
- 카드 경계가 명확하다.
- 상태 스타일과 충돌이 적다.
- 운영 UI와 레거시 개선 톤에 잘 맞는다.
- 반복 카드에서 화면이 덜 복잡하다.

shadow가 나쁜 것은 아니다. 마케팅 페이지나 프로모션 카드처럼 시각적 강조가 필요한 경우에는 사용할 수 있다.

## Part 2 최종 체크리스트

- SCSS 파일이 역할별로 분리되어 있는가?
- reset이 component 스타일보다 먼저 출력되는가?
- 색상, 간격, radius가 변수로 관리되는가?
- 카드 리스트가 CSS Grid로 배치되는가?
- 데스크톱 3열, 태블릿 2열, 모바일 1열로 전환되는가?
- `main`과 `.card-list`의 컨테이너 역할이 중복되지 않는가?
- 이미지 영역이 `aspect-ratio: 16 / 9`를 유지하는가?
- `img`에 `display: block`, `object-fit: cover`가 적용되어 있는가?
- 제목과 설명이 2줄로 제한되는가?
- hover 스타일이 `@media (hover: hover)` 안에 있는가?
- 링크와 버튼에 `focus-visible` 스타일이 있는가?
- transition/animation을 쓰는 경우 `prefers-reduced-motion` 대응을 검토했는가?

## 면접에서 설명할 수 있는 문장

카드 리스트는 행과 열이 있는 반복 레이아웃이므로 Flex보다 CSS Grid가 더 적합하다고 판단했습니다.

컨테이너 폭과 페이지 여백은 `main`에서 관리하고, `.card-list`는 Grid 열 구조와 간격만 담당하도록 역할을 분리했습니다.

카드 이미지는 wrapper에 `aspect-ratio: 16 / 9`를 적용해 이미지 로딩 전후에도 영역 비율이 유지되도록 했고, 이미지는 `object-fit: cover`로 영역을 꽉 채우도록 했습니다.

제목과 설명은 2줄 말줄임을 적용해 카드 높이가 과도하게 늘어나지 않도록 했습니다. 다만 중요한 정보가 잘릴 수 있으므로 카드 설명은 요약 문구로 작성하고 전체 내용은 상세보기에서 확인하도록 구성했습니다.

카드 전체가 클릭 가능한 구조가 아니므로 카드 전체 hover는 주지 않고, 실제 조작 가능한 상세보기 링크와 찜하기 버튼에만 hover와 focus-visible 스타일을 적용했습니다.

## 다음 파트로 넘어가기 전 메모

Part 3에서는 vanilla JavaScript로 찜하기 토글 기능을 구현한다.

다음 파트에서 집중할 내용은 다음과 같다.

- DOM 요소가 없을 때 에러가 나지 않는 방어 코드
- 이벤트 위임 방식
- `aria-pressed` 값 토글
- 선택 상태에 따른 `aria-label` 문구 변경
- 여러 카드가 있어도 하나의 이벤트 핸들러로 처리하는 구조
