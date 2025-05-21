<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue'
import type { Movie } from '~/types/Movie'
import styles from './ContentCard.module.scss'

const props = defineProps<{
  item: Movie
  focused: boolean
  index: number
  cols: number
}>()

const emit = defineEmits<{
  (e: 'focus-change', offset: number): void
  (e: 'select', item: Movie): void
}>()

const cardRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (props.focused && cardRef.value) {
    nextTick(() => {
      cardRef.value?.focus()
    })
  }
})

watch(
  () => props.focused,
  (newVal) => {
    if (newVal && cardRef.value) {
      nextTick(() => {
        cardRef.value?.focus()
      })
    }
  }
)

const onKeydown = (e: KeyboardEvent) => {
  let offset = 0
  switch (e.key) {
    case 'ArrowRight':
      offset = 1
      break
    case 'ArrowLeft':
      offset = -1
      break
    case 'ArrowDown':
      offset = props.cols
      break
    case 'ArrowUp':
      offset = -props.cols
      break
    case 'Enter':
      emit('select', props.item)
      return
    default:
      return
  }
  e.preventDefault()
  emit('focus-change', offset)
}
</script>

<template>
  <li
    ref="cardRef"
    :class="[styles.contentCard, props.focused ? styles.focused : '']"
    tabindex="0"
    @keydown="onKeydown"
    @click="() => emit('select', item)"
  >
    <img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`" :alt="item.title" />
    <h2>{{ item.title }}</h2>
  </li>
</template>
