<template>
  <h2 class="section-title">
    <slot>Trending Now</slot>
  </h2>
</template>

<script setup lang="ts">
</script>

<style scoped>
.section-title {
  font-size: 28px;
  font-weight: bold;
  margin: 16px 40px 0 0;
  color: #fff;
}
@media (min-width: 640px) {
  .section-title {
    margin: 16px 10px 0 0;
    font-size: 40px;
  }
}
</style>
