<template>
  <q-page class="q-pa-md">
    <!-- HEAD -->
    <CardBase class="card-base-primary">
      <div class="row items-center nowrap">
        <q-img
          src="https://cdn.quasar.dev/img/parallax1.jpg"
          alt="Imagem de fundo"
          height="100px"
          width="100px"
          class="perfil-img"
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
      class="bg-secondary text-white shadow-2 q-mt-md rounded-borders no-shadow text-white"
    >
      <q-tab name="earnings" icon="mail" label="Ganhos mês" />
      <q-tab name="revenues" icon="alarm" label="Gastos mês" />
      <q-tab name="wallets" icon="movie" label="Carteiras" />
    </q-tabs>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardBase from 'src/components/shared/CardBase.vue'

const tab = ref('earnings')
</script>

<style scoped>
.perfil-img {
  border-radius: 100px !important;
  border: 2px solid var(--color-fw-secondary-light);
}

.resume-table {
  width: 100%;
}
.resume-table th {
  text-align: left;
}
</style>
