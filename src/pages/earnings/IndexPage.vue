<template>
  <q-page class="q-pa-md">
    <CardBase class="row items-center bg-fw-blue-light">
      <q-icon name="trending_up" color="green" size="50px" />

      <div class="q-ml-sm">
        <span class="text-h6">1000,00</span>
        <div class="text-h5">Ganhos do mês</div>
      </div>
    </CardBase>

    <q-btn class="btn q-mt-md bg-fw-button-primary text-white" dense>Adicionar ganho</q-btn>

    <CardBase class="bg-fw-blue-light q-mt-md"> SELECIONAR CARTEIRA </CardBase>

    <CardBase class="bg-fw-primary q-mt-md">
      <span class="text-h6 text-white">Ganhos do mês MÊS</span>
      <DataComponent class="bg-fw-blue-light" />
    </CardBase>

    <CardBase class="bg-fw-blue-light q-mt-md"> Relatórios Gráficos </CardBase>

    <CardBase class="bg-fw-blue-light q-mt-md"> Relatórios LLM </CardBase>
  </q-page>
</template>

<script setup lang="ts">
import CardBase from 'src/components/shared/CardBase.vue'
import DataComponent from 'src/components/shared/DataComponent.vue'
</script>

<style scoped>
.btn {
  width: 100%;
}
</style>
