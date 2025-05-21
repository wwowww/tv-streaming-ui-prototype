<template>
  <span class="card-index">{{ number }}</span>
</template>

<script setup lang="ts">
defineProps<{
  number: number
}>()
</script>

<style scoped>
.card-index {
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 2px 6px;
  font-size: 6.25rem;
  line-height: 1;
  font-weight: 700;
  color: rgb(65, 65, 65);
  -webkit-text-stroke: 0.1rem rgb(255, 255, 255);
  text-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.5);
}
</style>