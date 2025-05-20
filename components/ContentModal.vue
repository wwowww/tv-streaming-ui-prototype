<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <h2>{{ item.title }}</h2>
      <img :src="item.thumbnail" alt="" />
      <button @click="emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: { title: string; thumbnail: string }, visible: boolean }>()
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
  
  img {
    width: 100%;
    height: 200px;
  }
}
.modal-content {
  background: white;
  padding: 1em;
}
</style>
