import { boot } from 'quasar/wrappers'
import VueApexCharts from 'vue-apexcharts'

export default boot(({ app }) => {
  app.component('apex-chart', VueApexCharts)
})
