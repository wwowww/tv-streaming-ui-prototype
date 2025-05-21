import { ref, onMounted, onUnmounted } from 'vue'

export function useResponsiveGrid() {
  const cols = ref(1)

  const getCols = () => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1200) return 4
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

  return { cols }
}
