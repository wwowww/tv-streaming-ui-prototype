<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import type { Movie } from '~/types/Movie'
import styles from './ContentModal.module.scss'
import ModalImage from '~/components/ModalImage/ModalImage.vue'

const props = defineProps<{
  item: Movie
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoaded = ref(false)

const imageSrc = computed(() =>
  props.item?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${props.item.backdrop_path}`
    : ''
)

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div v-if="visible" :class="styles.modal" @click.self="emit('close')">
    <Transition name="fade-scale" appear>
      <div :class="styles.modalContent">
        <h3>{{ item.title }}</h3>
        <ModalImage v-if="imageSrc" :src="imageSrc" :alt="item.title" />
        <p>{{ item.overview }}</p>
        <button @click="emit('close')">닫기</button>
      </div>
    </Transition>
  </div>
</template>

<style>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
