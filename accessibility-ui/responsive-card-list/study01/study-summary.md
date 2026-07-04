# Study 01 요점정리 - 반응형 카드 리스트 HTML 마크업

## 이번 스터디 목표

반응형 카드 리스트를 만들기 전에 CSS와 JavaScript 없이 HTML 구조만 먼저 정리했다.

이번 파트의 목적은 예쁜 화면을 만드는 것이 아니라, 실무에서 설명 가능한 마크업 구조를 잡는 것이다.

- 반복 콘텐츠를 어떤 태그로 구성할지 판단한다.
- 섹션, 리스트, 카드의 역할을 분리한다.
- 접근성 속성의 용례를 이해한다.
- 나중에 SCSS와 React 컴포넌트로 옮기기 쉬운 구조를 만든다.

## 최종 구조 방향

```html
<main>
  <h1>UI 컴포넌트 학습</h1>

  <section class="card-section" aria-labelledby="card-section__title">
    <h2 id="card-section__title" class="card-section__title">카드 리스트 데이터</h2>
    <p class="card-section__desc">...</p>

    <ul class="card-list">
      <li class="card-list__item">
        <article class="card">
          ...
        </article>
      </li>
    </ul>
  </section>
</main>
```

## 태그별 역할 정리

### main

`main`은 페이지의 핵심 본문 콘텐츠를 감싸는 태그다.

공통 영역인 `header`, `nav`, `footer`를 제외하고, 이 페이지에서 가장 중요한 콘텐츠를 넣는다.

이번 예제에서는 카드 리스트 학습 콘텐츠가 페이지의 핵심이므로 `main` 안에 배치했다.

### section

`section`은 의미 있는 콘텐츠 영역을 묶을 때 사용한다.

이번 예제에서는 카드 리스트 전체가 하나의 독립된 영역이므로 `section`으로 묶었다.

`section`과 실제 목록인 `ul`은 역할이 다르기 때문에 클래스를 분리하는 것이 좋다.

```txt
card-section: 카드 리스트 영역 전체
card-list: 실제 카드 목록
```

### ul / li

카드 데이터는 반복되는 목록이므로 `ul/li` 구조가 적합하다.

순서가 중요한 랭킹이 아니라면 `ol`보다 `ul`이 자연스럽다.

### article

`article`은 독립적으로 읽을 수 있는 콘텐츠 단위에 사용한다.

카드 하나가 이미지, 배지, 제목, 설명, 태그, 링크를 가지고 있고, 카드 하나만 따로 떼어도 의미가 통한다면 `article`을 사용할 수 있다.

단순 태그 목록, 메뉴 항목, 버튼 옵션처럼 독립 콘텐츠가 아닌 경우에는 `article`을 쓰지 않아도 된다.

```txt
article은 필수가 아니라 콘텐츠 성격에 따라 선택한다.
이번 과제에서는 카드 하나가 독립 콘텐츠라서 article을 사용한다.
```

## heading 구조

이번 구조에서는 다음처럼 heading level을 정리했다.

```txt
h1: 페이지 대표 제목
h2: 카드 리스트 섹션 제목
h3: 카드 제목
```

HTML5에서 섹션별 `h1` 사용이 가능하다는 설명도 있지만, 실무와 접근성 관점에서는 페이지 대표 제목을 `h1` 하나로 두고 `h2`, `h3`로 계층을 이어가는 방식이 더 안정적이다.

로고는 보통 브랜드 링크이지 현재 페이지의 대표 제목은 아니므로, 반드시 `h1`일 필요는 없다.

## ARIA 정리

ARIA는 `Accessible Rich Internet Applications`의 약자다.

HTML만으로 의미, 이름, 상태 전달이 부족할 때 보조기술에 추가 정보를 제공하기 위해 사용한다.

중요한 원칙은 다음과 같다.

```txt
의미 있는 HTML을 먼저 사용한다.
부족한 정보만 ARIA로 보완한다.
ARIA를 남발하지 않는다.
```

### aria-labelledby

`aria-labelledby`는 현재 요소의 이름을 다른 요소의 텍스트로 연결할 때 사용한다.

값으로는 클래스가 아니라 `id`를 참조한다.

```html
<section aria-labelledby="card-section__title">
  <h2 id="card-section__title">카드 리스트 데이터</h2>
</section>
```

이번 예제에서는 섹션과 섹션 제목을 연결하기 위해 사용했다.

### aria-label

`aria-label`은 화면에 보이지 않는 접근성 이름을 직접 제공할 때 사용한다.

이미 화면에 충분한 텍스트가 있다면 생략할 수 있다.

하지만 같은 텍스트의 버튼이 여러 번 반복되면 어떤 대상을 위한 버튼인지 구분하기 위해 사용할 수 있다.

```html
<button aria-label="반응형 카드 레이아웃 찜하기">찜하기</button>
```

이번 예제에서는 카드마다 `찜하기` 버튼이 반복되므로 카드 제목을 포함한 `aria-label`을 사용했다.

### aria-pressed

`aria-pressed`는 버튼이 눌림 상태를 유지하는 토글 버튼일 때 사용한다.

일반 버튼에는 필요하지 않다.

```html
<button type="button" aria-pressed="false">찜하기</button>
```

찜하기, 좋아요, 북마크, 굵게/기울임 버튼처럼 눌림 상태가 유지되는 버튼에 적합하다.

나중에 JavaScript를 구현할 때는 시각 상태와 `aria-pressed` 값이 함께 바뀌어야 한다.

### aria-hidden

`aria-hidden="true"`는 화면에는 보이지만 보조기술에서는 숨기고 싶을 때 사용한다.

장식용 아이콘, 화살표, 중복 정보에 사용할 수 있다.

```html
<a href="#">
  상세보기 <span aria-hidden="true">-&gt;</span>
</a>
```

중요한 텍스트나 클릭 가능한 요소에는 사용하면 안 된다.

## alt와 aria-hidden 차이

`alt=""`는 이미지 전용이다.

장식용 이미지라면 `alt` 속성은 두되 값을 비워서 보조기술이 건너뛰게 한다.

```html
<img src="decorative.png" alt="" />
```

`aria-hidden="true"`는 `span`, `svg`, `i`, `div` 등 다양한 요소에 사용할 수 있다.

```html
<span aria-hidden="true">-&gt;</span>
```

정리하면 다음과 같다.

```txt
이미지의 대체 여부는 alt로 판단한다.
이미지가 아닌 장식 요소는 aria-hidden으로 숨긴다.
```

## 링크와 버튼의 기준

클릭 가능한 요소라고 모두 같은 태그를 쓰지 않는다.

```txt
이동이 목적이면 a
동작이나 상태 변경이 목적이면 button
```

이번 예제에서는 다음 기준으로 나눴다.

- 상세보기: 상세 페이지나 상세 콘텐츠로 이동하므로 `a`
- 찜하기: 현재 카드의 선택 상태를 바꾸므로 `button`

`button`의 기본 타입은 `submit`이므로, 폼 제출 목적이 아니라면 `type="button"`을 명시하는 것이 안전하다.

## 태그 목록 구조

처음에는 태그를 `div > span`으로 작성할 수 있지만, 여러 개의 기술 키워드가 반복되는 구조라면 목록 의미가 있으므로 `ul/li`가 더 적합하다.

```html
<ul class="card__tags" aria-label="관련 기술">
  <li class="tag">HTML</li>
  <li class="tag">SCSS</li>
  <li class="tag">Grid</li>
</ul>
```

`aria-label="관련 기술"`은 필수는 아니지만, 화면에 별도 제목이 없는 목록의 의미를 보조기술에 전달하고 싶을 때 사용할 수 있다.

## 클래스명과 BEM

이번 과제에서는 BEM 느낌의 클래스명을 사용했다.

```txt
card-section
card-list
card-list__item
card
card__image
card__badge
card__tags
card__actions
card__favorite
```

BEM은 최신 프론트엔드에서 항상 쓰이는 방식은 아니지만, SCSS 기반 퍼블리싱, 운영 UI, 레거시 개선 환경에서는 여전히 유효하다.

장점은 다음과 같다.

- HTML만 봐도 구조가 보인다.
- CSS 선택자 충돌을 줄일 수 있다.
- SCSS nesting과 잘 맞는다.
- React 컴포넌트로 옮길 때 경계가 보인다.
- 면접에서 구조를 설명하기 쉽다.

단점도 있다.

- 깊게 들어갈수록 클래스명이 길어진다.
- 모든 DOM 깊이를 클래스명에 반영하면 HTML이 무거워진다.

그래서 BEM은 엄격한 규칙이라기보다 역할을 명확히 하기 위한 기준으로 쓰는 것이 좋다.

```txt
DOM 깊이 = 클래스명 깊이로 만들 필요는 없다.
스타일과 유지보수에 필요한 단위까지만 네이밍한다.
재사용 가능한 하위 구조는 별도 블록으로 분리할 수 있다.
```

## 실무에서 문구는 누가 정하는가

보통 노출 문구와 콘텐츠 의미는 기획이나 디자인 산출물을 기준으로 한다.

예를 들면 다음은 기획/디자인에서 주는 경우가 많다.

- 카드 제목
- 카드 설명
- 배지 문구
- 버튼 노출 텍스트
- 이미지에 들어가는 주요 카피
- 링크 문구

반면 구현 단계에서 UI 개발자가 보완하는 경우가 많다.

- `alt` 텍스트
- `aria-label`
- `aria-labelledby` 연결
- `aria-pressed` 상태 속성
- `aria-hidden` 처리
- `button type`
- heading level

단, `alt`나 `aria-label`처럼 콘텐츠 의미와 접근성이 만나는 부분은 임의로 바꾸기보다 화면 문맥을 기준으로 작성하고, 애매하면 기획/디자인과 확인하는 것이 좋다.

## Part 1 최종 체크리스트

- `html lang="ko"`로 작성했는가?
- 페이지 핵심 콘텐츠가 `main` 안에 있는가?
- 페이지 대표 제목이 `h1`으로 작성되었는가?
- 카드 리스트 영역이 `section`으로 묶였는가?
- `section`과 `h2`가 `aria-labelledby`로 연결되었는가?
- 카드 목록이 `ul/li` 구조인가?
- 카드 하나가 `li > article` 구조인가?
- 카드 제목이 `h3`으로 작성되었는가?
- 태그 목록이 `ul/li` 구조인가?
- 상세보기는 `a`를 사용했는가?
- 찜하기는 `button type="button"`을 사용했는가?
- 찜하기 버튼에 `aria-pressed="false"` 초기값이 있는가?
- 반복되는 찜하기 버튼에 카드 제목을 포함한 `aria-label`이 있는가?
- 장식용 화살표에 `aria-hidden="true"`를 적용했는가?
- 카드별 이미지 `alt`가 카드 내용에 맞게 다르게 작성되었는가?

## 면접에서 설명할 수 있는 문장

카드 리스트는 반복 콘텐츠이기 때문에 `ul/li`로 구성했고, 카드 하나는 이미지, 제목, 설명, 링크를 가진 독립적인 콘텐츠 단위라 `article`을 사용했습니다.

페이지 대표 제목은 `h1`, 카드 리스트 섹션은 `h2`, 카드 제목은 `h3`으로 두어 문서 구조가 자연스럽게 이어지도록 했습니다.

상세보기는 이동이 목적이므로 `a`를 사용했고, 찜하기는 현재 카드의 상태를 변경하는 인터랙션이므로 `button`을 사용했습니다.

찜하기 버튼은 토글 상태를 가지기 때문에 `aria-pressed`를 사용했고, 같은 버튼명이 반복되므로 카드 제목을 포함한 `aria-label`로 대상을 구분했습니다.

ARIA는 HTML 의미를 대체하기 위한 것이 아니라, 기본 HTML만으로 부족한 이름이나 상태 정보를 보완하기 위해 사용했습니다.

## 다음 파트로 넘어가기 전 메모

Part 2에서는 CSS/SCSS를 작성한다.

다음 파트에서 집중할 내용은 다음과 같다.

- 최소 reset 작성
- SCSS 변수 분리
- `card-section`, `card-list`, `card` 스타일 분리
- CSS Grid로 3열, 2열, 1열 반응형 구성
- `aspect-ratio: 16 / 9` 이미지 영역 처리
- 긴 제목과 설명이 들어와도 레이아웃이 깨지지 않도록 처리
- `focus-visible`, `hover`, `prefers-reduced-motion` 대응
