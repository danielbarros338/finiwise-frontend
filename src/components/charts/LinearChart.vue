<template>
  <div>
    <div :id="`chart-${keyChart}`"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ApexCharts from 'apexcharts'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  tabTitle: {
    type: String,
    required: true,
  },
  heightGraph: {
    type: Number,
    required: false,
    default: 300,
  },
  widthGraph: {
    type: Number,
    required: false,
    default: 300,
  },
  keyChart: {
    type: String,
    required: true,
  },
})

const options = ref({
  title: {
    text: props.tabTitle,
    align: 'left',
  },
  chart: {
    type: 'line',
    height: '100%',
    width: '100%',
    toolbar: {
      show: false,
    },
  },
  series: [
    {
      name: props.tabTitle,
      data: props.data.y,
    },
  ],
  xaxis: {
    categories: props.data.x,
  },
})

onMounted(async () => {
  const chart = new ApexCharts(document.querySelector(`#chart-${props.keyChart}`), options.value)

  await chart.render()
})
</script>

<style scoped>
#chart {
  display: relative;
  height: auto;
}
</style>
