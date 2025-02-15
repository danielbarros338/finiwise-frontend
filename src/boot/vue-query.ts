import { boot } from 'quasar/wrappers'
import { QueryClient } from '@tanstack/vue-query'
import { VueQueryPlugin } from '@tanstack/vue-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default boot(({ app }) => {
  app.use(VueQueryPlugin, { queryClient })
})
