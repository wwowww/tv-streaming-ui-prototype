<template>
  <div class="content-grid">
    <div
      v-for="(item, index) in contentList"
      :key="index"
      class="content-card"
    >
      <img :src="item.thumbnail" :alt="item.title" />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { contentList } from '~/datas/contentList';
</script>

<style scoped>
.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 20px;
}

@media (min-width: 640px) {
  .content-grid {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 auto;
    max-width: 1200px;
  }
}

@media (min-width: 1024px) {
  .content-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.content-card {
  padding: 8px;
  color: white;
  text-align: center;
  background: #222;
  border-radius: 8px;
}

.content-card img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 4px;
}

</style>