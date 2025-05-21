<template>
  <div :class="styles.imageWrapper">
    <img
      :src="src"
      :alt="alt"
      :class="{ [styles.loaded]: isLoaded }"
      @load="handleLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import styles from './ModalImage.module.scss'

const props = defineProps<{
  src: string
  alt: string
}>()

const isLoaded = ref(false)

const handleLoad = () => {
  isLoaded.value = true
}
</script>
