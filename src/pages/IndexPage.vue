<template>
  <q-page class="q-pa-md">
    <CardBase>
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
  </q-page>
</template>

<script setup lang="ts">
import CardBase from 'src/components/shared/CardBase.vue'
</script>

<style scoped>
.perfil-img {
  border-radius: 100px !important;
  border: 2px solid var(--color-fw-secondary-light);
}
</style>
