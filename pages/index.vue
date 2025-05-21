<template>
  <div class="content-grid">
    <SectionTitle>Trending Now</SectionTitle>
  </div>
  <ul class="content-grid">
    <li v-if="isLoading">Loading...</li>
    <li v-else-if="error">Error: {{ error.message }}</li>

    <ContentCard
      v-for="(item, index) in movies"
      :key="index"
      :item="item"
      :focused="index === currentIndex"
      :index="index"
      :cols="cols"
      @focus-change="handleFocusChange"
      @select="handleSelect"
    />

    <ContentModal
      v-if="selectedItem"
      :item="selectedItem"
      :visible="true"
      @close="selectedItem = null"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContentCard from '~/components/ContentCard/ContentCard.vue'
import ContentModal from '~/components/ContentModal/ContentModal.vue'
import { useMovies } from '~/composables/useMovies'
import { useResponsiveGrid } from '~/composables/useResponsiveGrid'

const { movies, isLoading, error } = useMovies()
const { cols } = useResponsiveGrid()
const currentIndex = ref(0)
const selectedItem = ref<null | { title: string; backdrop_path: string; overview: string }>(null)

const handleFocusChange = (offset: number) => {
  if (!movies.value) return
  const nextIndex = (currentIndex.value + offset + movies.value.length) % movies.value.length
  currentIndex.value = nextIndex
}

const handleSelect = (item: { title: string; backdrop_path: string; overview: string }) => {
  selectedItem.value = item
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #000;
}

ol, ul, li {
  list-style: none;
}
</style>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 30px;
  padding: 40px 30px;
  max-width: 1400px;
  margin: 0 auto;
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
@media (min-width: 1200px) {
  .content-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
