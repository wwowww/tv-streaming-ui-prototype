<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <h3>{{ item.title }}</h3>
      <img :src="`https://image.tmdb.org/t/p/original${item.backdrop_path}`" :alt="item.title" />
      <p>{{ item.overview }}</p>
      <button @click="emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/types/Movie'

defineProps<{
  item: Movie
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
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

  img {
    width: 100%;
    height: 200px;
  }
}
</style>
