<template>
  <div class="modal" v-if="visible" @click.self="emit('close')">
    <div class="modal-content">
      <h3>{{ item.title }}</h3>
      <div class="image-wrapper" v-if="imageSrc">
        <img
          :src="imageSrc"
          :alt="item.title"
          :class="{ loaded: isLoaded }"
          @load="handleLoad"
        />
      </div>
      <p>{{ item.overview }}</p>
      <button @click="emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import type { Movie } from '~/types/Movie'

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

watch(
  () => props.visible,
  (visible) => {
    if (visible) isLoaded.value = false
  }
)

const handleLoad = () => {
  isLoaded.value = true
}

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

<style scoped>
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 1em;
  max-width: 600px;
  width: 90%;
}

.image-wrapper {
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(20px);
  opacity: 0.5;
  transition: filter 0.5s ease, opacity 0.5s ease;
}

.image-wrapper img.loaded {
  filter: blur(0);
  opacity: 1;
}
</style>
