<template>
  <CardBase>
    <span class="text-h6 text-white">{{ tab !== 'wallets' ? 'Últimos dias' : 'Resumo' }}</span>
    <DataComponent :tab="tab as string" class="bg-fw-blue-light" />
    <DataComponent :tab="tab as string" class="bg-fw-blue-light" />
    <DataComponent :tab="tab as string" class="bg-fw-blue-light" />
    <DataComponent :tab="tab as string" class="bg-fw-blue-light" />
  </CardBase>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import CardBase from 'src/components/shared/CardBase.vue'
import DataComponent from 'src/components/home/DataComponent.vue'

const props = defineProps({
  tab: String,
})

const tab = computed(() => props.tab)

// const earningsMock = [
//   { date: '01/01/2021', description: 'Salário', value: 1000 },
//   { date: '02/01/2021', description: 'Freela', value: 500 },
//   { date: '03/01/2021', description: 'Investimento', value: 200 },
// ]
</script>
