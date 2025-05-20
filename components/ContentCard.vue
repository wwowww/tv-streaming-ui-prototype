<template>
  <div
    class="content-card"
    tabindex="0"
    :class="{ focused }"
    @keydown="onKeydown"
    @click="() => emit('select', item)"
  >
    <img :src="item.thumbnail" :alt="item.title" />
    <p>{{ item.title }}</p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: { title: string; thumbnail: string }
  focused: boolean
  index: number
  cols: number
}>()

const emit = defineEmits<{
  (e: 'focus-change', offset: number): void
  (e: 'select', item: { title: string; thumbnail: string }): void
}>()

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
  }
  emit('focus-change', offset)
}
</script>

<style scoped>
.content-card {
  padding: 8px;
  color: white;
  text-align: center;
  background: #222;
  border-radius: 8px;
  outline: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.content-card.focused {
  transform: scale(1.05);
  box-shadow: 0 0 0 3px #00c8ff;
}

.content-card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
