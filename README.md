# TV Streaming UI Prototype

> 방향키로 이동이 가능하고 선택 시 해당 게시물의 상세 내용을 확인 가능 <br>
> Demo: [https://tv-streaming-ui-prototype.vercel.app/](https://tv-streaming-ui-prototype.vercel.app/)

## 💬 파일 실행 방법

1. https://www.themoviedb.org/ 에서 로그인 후, setting -> api에서 api key 발급
2. `.env`  파일 생성 후,
3. your_tmdb_api_key에 입력해주고

```markdown
VITE_TMDB_API_KEY=your_tmdb_api_key
```

4. 아래 명령어로 프로젝트를 실행해 줍니다.

```markdown
pnpm install
pnpm dev
```

## 📁 폴더 구조

```markdown
src/
├── components/
│   ├── ContentCard/
│   │   ├── ContentCard.vue
│   │   └── ContentCard.module.scss
│   ├── ContentModal/
│   │   ├── ContentModal.vue
│   │   └── ContentModal.module.scss
│   ├── ModalImage/
│   │   ├── ModalImage.vue
│   │   └── ModalImage.module.scss
│   └── CardIndex/
│       └── CardIndex.vue
├── composables/
│   ├── useMovies.ts
│   └── useResponsiveGrid.ts
├── types/
│   └── Movie.ts
└── pages/
    └── Home.vue (또는 App.vue)
```

## 🧠 주요 기능 구성

### 1. 포커스 이동 로직 (키보드 기반)

- 방향키로 콘텐츠 포커스 이동 (좌/우/상/하)
- 현재 포커스된 요소 강조 (border, scaling)
- Vue ref 배열 + `keydown` 이벤트 처리

### 2. 콘텐츠 목록

- 더미 콘텐츠 데이터를 배열로 구성 (썸네일 + 제목)
- 그리드로 렌더링

### 3. 상세 정보 보기

- 포커스된 콘텐츠에서 `Enter` 눌렀을 때 모달 창으로 상세 내용 표시

## ✅ 주요 기능 자세히 보기!

### 1. ContentCard.vue

> 콘텐츠 카드 컴포넌트. **방향키로 포커스 이동**, **Enter로 모달 열기**, **포스터 이미지 표시**, **인덱스 번호 표시** 등 주요 기능 담당

#### 1) 방향키로 포커스 이동 (`Arrow` 키 처리)

```tsx
const onKeydown = (e: KeyboardEvent) => {
  let offset = 0
  switch (e.key) {
    case 'ArrowRight': offset = 1; break;
    case 'ArrowLeft': offset = -1; break;
    case 'ArrowDown': offset = props.cols; break;
    case 'ArrowUp': offset = -props.cols; break;
    case 'Enter':
      emit('select', props.item)
      return
  }
  e.preventDefault()
  emit('focus-change', offset)
}
```

- `offset` 값을 상위 컴포넌트에 전달해서 포커스 이동
- `cols` 값을 기반으로 위/아래 방향키 계산

#### 2) 카드 자동 포커스

```tsx
onMounted(() => {
  if (props.focused && cardRef.value) {
    nextTick(() => {
      cardRef.value?.focus()
    })
  }
})
```

- `focused`가 `true`일 때 `ref` 요소에 `.focus()` 호출 → 키보드 내비게이션 UX 향상

#### 3) Enter 누르면 상세 모달 열기

```tsx
case 'Enter':
  emit('select', props.item)
  return
```

- `select` 이벤트 발생 → 상위에서 `selectedItem` 설정 → 모달 열림

### 2. ContentModal.vue

> 상세 정보 모달. 영화 제목, 설명, 백드롭 이미지 표시
ESC 키 또는 배경 클릭 시 닫힘
> 

#### 1) ESC 키로 모달 닫기, 배경 클릭 시 닫기

```tsx
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
```

- 사용자가 `ESC` 누르면 모달 닫힘
- `mounted/unmounted` 훅으로 이벤트 등록/해제

```tsx
<div v-if="visible" :class="styles.modal" @click.self="emit('close')">
```

- 모달 내부가 아닌 배경을 클릭한 경우에만 닫힘

<br>

## 회고

- Vue의 기본 문법과 방향키, 모달을 활용한 콘텐츠 카드 UI를 구현해보려고 프로젝트를 시작했다.
- Vue가 오랜만이고 익숙치 않아 찾아보면서 하느라 생각보다 시간이 오래 걸렸다.
    - `v-for`, `v-if`, `@click` 등 Vue 전용 디렉티브를 사용해 JSX와는 다른 렌더링 방식을 배움
    - `ref`, `reactive`를 통한 상태 선언과 자동 반응형 업데이트가 인상적이었음
- 프로토타입이기 때문에 굳이 Nuxtjs를 사용할 필요 없었다. 추후에 상세 페이지를 연결 등 확장하게 될 경우 Nuxtjs를 쓰는 것이 좋을 것 같다.
- 코드 자체가 style까지 있다보니 코드가 길어져서 유지보수 측면에서 module.scss를 사용했는데, tailwind나 다른 것을 사용하면 더 좋을 것 같다는 생각이 들었다.
    - module.scss 사용해보니 태그나 해당 기능을 삭제하면 거기에 해당하는 scss도 찾아서 삭제해야하고,
    - 중복되지 않도록 하기위해 댑스가 늘어나고, 클래스명도 고민해야했음
    
<br><br>
---

## 🔍 더 알아보기

> React가 더 익숙한 나를 위한 정리

### Vue

| **특징** | **설명** |
| --- | --- |
| **반응형 상태 관리** | 컴포넌트의 데이터가 바뀌면 DOM이 자동으로 갱신됨 |
| **템플릿 문법** | HTML 안에 `{{ 변수 }}` 또는 `v-if`, `v-for` 등을 써서 제어 가능 |
| **단방향 데이터 흐름** | 상위 → 하위로 props 전달, 이벤트로 하위 → 상위 소통 |
| **컴포넌트 구조** | `.vue` 파일 하나에 template, script, style이 같이 있음 |

### Vue 파일 구조

```tsx
<template>
  <!-- HTML처럼 생긴 템플릿 -->
</template>

<script setup lang="ts">
  // JavaScript/TypeScript + Vue 전용 문법
</script>

<style scoped>
  /* 컴포넌트 전용 스타일 */
</style>
```

#### template

- 실제로 렌더링되는 화면 구조를 HTML처럼 작성
- 예: `<div>{{ title }}</div>` ← 변수 출력
- `v-for`, `v-if` 등 Vue 전용 디렉티브 사용

#### script setup

- 컴포넌트의 로직, 상태, props 등을 선언
- `setup` 문법을 쓰면 코드가 더 간결해짐 (Composition API)
- `defineProps()`로 부모에게 props 받기
- `ref`, `reactive` 등으로 반응형 변수 선언 가능

#### style

- 일반 CSS. `scoped`를 붙이면 이 컴포넌트에만 스타일이 적용됨

### Vue와 React 비교

| **개념** | **Vue (`Composition API`)** | **React (Hooks 기준)** |
| --- | --- | --- |
| **props 전달** | `defineProps()` | 함수 파라미터로 `props` |
| **상태 관리** | `ref()`, `reactive()` | `useState()` |
| **전역 상태** | Pinia | Redux, Context API 등 |
| **이벤트 바인딩** | `@click="fn"` | `onClick={fn}` |
| **조건부 렌더링** | `v-if="조건"` | `{조건 && <JSX />}` |
| **리스트 렌더링** | `v-for="item in list"` | `list.map(...)` |
| **스타일** | `<style scoped>` | CSS Modules, styled-components 등 |

### 1. defineProps()

```tsx
const props = defineProps<{ item: Content }>();
```

- 부모 컴포넌트(App.vue)에서 자식(ContentCard.vue)으로 데이터를 전달할 때 사용
- React로 치면 `props: { item }` 받는 느낌

### 2. 리스트 렌더링

```tsx
<ContentCard v-for="item in sampleData" :key="item.id" :item="item" />
```

- `v-for`로 배열을 반복 렌더링
- `:key`는 React와 마찬가지로 각 항목을 고유하게 구분
- `:item="item"`은 `item`이라는 props를 자식 컴포넌트로 넘김

### 3.  상태 관리: Pinia

```tsx
import { useModalStore } from '@/stores/modalStore';
const modalStore = useModalStore();
```

- Vue 공식 상태 관리 라이브러리 (Vuex보다 가볍고 직관적)
- 전역에서 모달 열림 상태와 내용을 관리
- `modalStore.isModalOpen`, `modalStore.modalItem` 같은 식으로 접근 가능
