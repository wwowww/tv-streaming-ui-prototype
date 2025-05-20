import { ref, onMounted } from 'vue'
import type { Movie } from '~/types/Movie'

const API_KEY = import.meta.env.VITE_API_KEY;


export const useMovies = () => {
  const movies = ref<Movie[]>([])

  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const fetchMovies = async () => {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-EN&page=1`
      )
      if (!res.ok) throw new Error('데이터 불러오기 실패')
      const data = await res.json()
      movies.value = data.results
    } catch (err) {
      error.value = err as Error
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchMovies()
  })

  return { movies, isLoading, error, fetchMovies }
}
