# Study 01. 반응형 카드 리스트 - Part 1 HTML 마크업

## 목표

반응형 카드 리스트 UI를 만들기 전에, CSS와 JavaScript 없이 HTML만으로 의미 있는 마크업 구조를 작성한다.

이번 파트의 핵심은 화면을 예쁘게 만드는 것이 아니라, 카드 리스트의 콘텐츠 구조를 시맨틱하게 잡고 접근성 기본 속성을 고려하는 것이다.

## 구현 범위

이번 파트에서는 `index.html`만 작성한다.

```txt
responsive-card-list/
└─ index.html

SCSS, CSS, JavaScript는 다음 파트에서 작성한다.

구현 요구사항
페이지의 핵심 콘텐츠는 main 안에 작성한다.
페이지 대표 제목은 h1으로 작성한다.
카드 리스트 영역은 section으로 묶는다.
section 제목은 h2로 작성하고 aria-labelledby로 연결한다.
섹션 설명 문구를 작성한다.
카드 목록은 ul/li 구조로 작성한다.
카드 하나는 li 안에서 article로 작성한다.
카드 제목은 h3으로 작성한다.
태그 목록은 ul/li 구조로 작성한다.
상세보기는 페이지 이동 목적이므로 a 태그를 사용한다.
찜하기는 상태 변경 목적이므로 button 태그를 사용한다.
카드에 포함할 요소
각 카드는 아래 요소를 포함한다.

카드 이미지
배지
카드 제목
카드 설명
태그 목록
상세보기 링크
찜하기 버튼
더미 데이터
카드 1
배지: Responsive
제목: 반응형 카드 레이아웃
설명: CSS Grid를 사용해 화면 너비에 따라 카드 열 수가 바뀌는 UI입니다.
태그: HTML, SCSS, Grid
이미지 alt: 반응형 카드 레이아웃 예시 화면
찜하기 aria-label: 반응형 카드 레이아웃 찜하기
카드 2
배지: Accessibility
제목: 접근성을 고려한 버튼 상태
설명: aria-pressed를 사용해 찜하기 버튼의 선택 상태를 보조기술에 전달합니다.
태그: A11y, Button, ARIA
이미지 alt: 접근성을 고려한 버튼 상태 예시 화면
찜하기 aria-label: 접근성을 고려한 버튼 상태 찜하기
카드 3
배지: JavaScript
제목: 이벤트 위임으로 처리하는 카드 액션
설명: 여러 카드의 버튼을 효율적으로 제어하기 위해 상위 요소에서 이벤트를 처리합니다.
태그: JavaScript, Event, UI
이미지 alt: 이벤트 위임 카드 액션 예시 화면
찜하기 aria-label: 이벤트 위임으로 처리하는 카드 액션 찜하기
접근성 체크 포인트
html의 lang 값은 ko로 작성한다.
section은 aria-labelledby로 제목과 연결한다.
이미지에는 카드 내용에 맞는 alt를 작성한다.
장식용 화살표는 aria-hidden="true"로 처리한다.
찜하기 버튼은 type="button"을 명시한다.
찜하기 버튼은 aria-pressed="false" 초기값을 가진다.
반복되는 찜하기 버튼은 카드 제목을 포함한 aria-label을 가진다.
권장 클래스 구조
<main>
  <h1>UI 컴포넌트 학습</h1>

  <section class="card-section" aria-labelledby="card-section-title">
    <h2 id="card-section-title" class="card-section__title">추천 UI 패턴</h2>
    <p class="card-section__desc">...</p>

    <ul class="card-list">
      <li class="card-list__item">
        <article class="card">
          <div class="card__image">
            <img src="..." alt="..." />
          </div>

          <span class="card__badge">...</span>
          <h3 class="card__title">...</h3>
          <p class="card__desc">...</p>

          <ul class="card__tags">
            <li class="card__tag">...</li>
          </ul>

          <div class="card__actions">
            <a href="#" class="card__link">
              상세보기 <span aria-hidden="true">-&gt;</span>
            </a>

            <button
              type="button"
              class="card__favorite"
              aria-pressed="false"
              aria-label="카드 제목 찜하기"
            >
              찜하기
            </button>
          </div>
        </article>
      </li>
    </ul>
  </section>
</main>
완료 기준
HTML 문법 오류 없이 작성되어 있다.
카드가 최소 3개 이상 반복된다.
main, section, ul, li, article, heading 태그가 역할에 맞게 사용되어 있다.
섹션 제목과 aria-labelledby가 정상 연결되어 있다.
카드별 이미지 alt와 찜하기 aria-label이 카드 내용에 맞게 작성되어 있다.
CSS 없이도 문서 구조를 읽었을 때 콘텐츠 흐름이 자연스럽다.
면접에서 설명할 수 있는 문장
카드 리스트는 반복 콘텐츠이기 때문에 ul/li로 구성했고, 카드 하나는 제목, 설명, 이미지, 링크를 가진 독립적인 콘텐츠 단위라 article을 사용했습니다.

페이지 대표 제목은 h1, 카드 리스트 섹션은 h2, 카드 제목은 h3으로 두어 문서 구조가 자연스럽게 이어지도록 했습니다.

찜하기는 페이지 이동이 아니라 상태 변경 인터랙션이므로 button을 사용했고, 토글 상태를 보조기술에 전달하기 위해 aria-pressed를 사용했습니다.
```
