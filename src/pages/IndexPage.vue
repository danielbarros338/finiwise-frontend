<template>
  <q-page class="q-pa-md">
    <!-- HEAD -->
    <CardBase class="bg-fw-blue-light">
      <div class="row items-center nowrap">
        <q-img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          alt="Imagem de fundo"
          height="100px"
          width="100px"
          class="perfil-img shadow-3"
          contain
        />

        <div class="col-8">
          <div class="text-h5 q-ml-sm">Seja bem vindo USUÁRIO</div>
        </div>
      </div>
    </CardBase>

    <!-- RESUME -->
    <q-tabs
      v-model="tab"
      inline-label
      dense
      class="bg-fw-primary text-white q-mt-md no-shadow rounded-borders"
    >
      <q-tab name="earnings" icon="attach_money" label="Últimos ganhos" />
      <q-tab name="revenues" icon="money_off" label="Últimos gastos" />
      <q-tab name="wallets" icon="wallet" label="Saldo das carteiras" />
    </q-tabs>

    <ResumeComponent :dataArr="data" :tab="tab" class="bg-fw-primary q-mt-md" />

    <GraphComponent :tab="tab" :dataArr="data" class="bg-fw-blue-light q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardBase from 'src/components/shared/CardBase.vue'
import ResumeComponent from 'src/components/home/ResumeComponent.vue'
import GraphComponent from 'src/components/home/GraphComponent.vue'

const tab = ref('earnings')

const data = ref({
  earnings: [
    {
      earningId: 1,
      walletId: 1,
      userId: 1,
      typeId: 1,
      value: 9321.23,
      name: 'Salário',
      date: '2025-03-13 00:00:00',
    },
    {
      earningId: 2,
      walletId: 1,
      userId: 1,
      typeId: 2,
      value: 31.23,
      name: 'Juros',
      date: '2025-03-16 00:00:00',
    },
    {
      earningId: 3,
      walletId: 1,
      userId: 1,
      typeId: 3,
      value: 321.23,
      name: 'Extra',
      date: '2025-03-20 00:00:00',
    },
    {
      earningId: 4,
      walletId: 2,
      userId: 1,
      typeId: 1,
      value: 3321.23,
      name: 'Salário',
      date: '2025-03-13 00:00:00',
    },
    {
      earningId: 5,
      walletId: 2,
      userId: 1,
      typeId: 2,
      value: 321.23,
      name: 'Juros',
      date: '2025-03-16 00:00:00',
    },
    {
      earningId: 6,
      walletId: 3,
      userId: 1,
      typeId: 3,
      value: 3821.23,
      name: 'Extra',
      date: '2025-03-20 00:00:00',
    },
  ],
  revenues: [
    {
      revenueId: 1,
      walletId: 1,
      userId: 1,
      typeId: 1,
      value: 948.5,
      name: 'Parcela Carro',
      description: 'teste1',
      observation: '',
      dueDate: '2025-03-20 00:00:00',
      date: '2025-03-13 00:00:00',
    },
    {
      revenueId: 2,
      walletId: 1,
      userId: 1,
      typeId: 2,
      value: 7.0,
      name: 'Salgado',
      description: 'teste2',
      observation: '',
      dueDate: '2025-03-15 00:00:00',
      date: '2025-03-15 00:00:00',
    },
    {
      revenueId: 3,
      walletId: 1,
      userId: 1,
      typeId: 3,
      value: 6.47,
      name: 'Lampada',
      description: 'teste3',
      observation: '',
      dueDate: '2025-03-15 00:00:00',
      date: '2025-03-15 00:00:00',
    },
    {
      revenueId: 4,
      walletId: 2,
      userId: 1,
      typeId: 4,
      value: 6.0,
      name: 'Padaria',
      description: 'teste4',
      observation: '',
      dueDate: '2025-03-16 00:00:00',
      date: '2025-03-16 00:00:00',
    },
    {
      revenueId: 5,
      walletId: 2,
      userId: 1,
      typeId: 2,
      value: 7.0,
      name: 'Salgado',
      description: 'teste5',
      observation: '',
      dueDate: '2025-03-20 00:00:00',
      date: '2025-03-20 00:00:00',
    },
    {
      revenueId: 6,
      walletId: 3,
      userId: 1,
      typeId: 1,
      value: 149.5,
      name: 'Seguro',
      description: 'teste6',
      observation: '',
      dueDate: '2025-03-14 00:00:00',
      date: '2025-03-14 00:00:00',
    },
  ],
  wallets: [
    { name: 'Carteira 1', value: 10000.0 },
    { name: 'Carteira 2', value: 500.0 },
    { name: 'Carteira 3', value: 0 },
  ],
})
</script>

<style scoped>
.perfil-img {
  border-radius: 100px !important;
}

.resume-table {
  width: 100%;
}
.resume-table th {
  text-align: left;
}
</style>
