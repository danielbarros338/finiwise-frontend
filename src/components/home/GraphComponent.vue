<template>
  <CardBase title="Gráfico">
    <!-- TODO: aqui vou adicionar a exibição por tipos existentes-->
    <div class="row">
      <LinearChart
        class="col-6 earnings"
        :tab-title="tabTitle"
        :data="data"
        :heightGraph="200"
        keyChart="1"
      />

      <LinearChart
        class="col-6 earnings"
        :tab-title="tabTitle"
        :data="data"
        :heightGraph="200"
        keyChart="2"
      />
    </div>
  </CardBase>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import LinearChart from '../charts/LinearChart.vue'
import CardBase from '../shared/CardBase.vue'

const props = defineProps({
  tab: {
    type: String,
    required: true,
  },
  dataArr: {
    type: Object,
    required: true,
    default: () => ({}),
  },
})

const tab = computed(() => props.tab)
const tabTitle = computed(() => {
  switch (tab.value) {
    case 'earnings':
      return 'Ganhos'
    case 'expenses':
      return 'Despesas'
    case 'wallets':
      return 'Carteiras'
    default:
      return 'Ganhos'
  }
})

const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
// TODO: criar lógica para tratar os dados semanalmente, atualmente só estou exibindo os valores
const values = props.dataArr.earnings.map((earning: Record<string, number>) => earning.value)
const data = { x: weekdays, y: values }
</script>

<style scoped></style>
