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

    <ResumeComponent :tab="tab" class="bg-fw-primary q-mt-md" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardBase from 'src/components/shared/CardBase.vue'
import ResumeComponent from 'src/components/home/ResumeComponent.vue'

const tab = ref('earnings')
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
