<template>
  <div class="content-grid">
    <ContentCard
      v-for="(item, index) in contentList"
      :key="index"
      :item="item"
      :focused="index === currentIndex"
      :index="index"
      :cols="cols"
      @focus-change="handleFocusChange"
      @select="handleSelect"
    />
  </div>
</template>

<script setup lang="ts">
import ContentCard from '~/components/ContentCard.vue'
import { contentList } from '~/datas/contentList'
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
const cols = ref(1)

const getCols = () => {
  if (typeof window === 'undefined') return 1
  if (window.innerWidth >= 1024) return 3
  if (window.innerWidth >= 640) return 2
  return 1
}

const updateCols = () => {
  cols.value = getCols()
}

onMounted(() => {
  updateCols()
  window.addEventListener('resize', updateCols)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCols)
})

const handleFocusChange = (offset: number) => {
  const nextIndex = (currentIndex.value + offset + contentList.length) % contentList.length
  currentIndex.value = nextIndex
}

const handleSelect = (item: { title: string }) => {
  alert(`선택한 콘텐츠: ${item.title}`)
}
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  padding: 20px;
}

@media (min-width: 640px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
