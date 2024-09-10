<template>
  <q-page class="row justify-center bg-fw-primary q-pa-lg">
    <div class="row items-center">
      <q-img src="/src/assets/images/finiwise-logo.png" width="200px" />
    </div>

    <div class="col-12">
      <q-form>
        <q-input
          v-model="email"
          filled
          class="q-mb-sm"
          label="Email"
          type="email"
          color="white"
          label-color="white"
          bg-color="grey-5"
        />
        <q-input
          v-model="password"
          filled
          class="q-mb-md"
          label="Senha"
          type="password"
          color="white"
          label-color="white"
          bg-color="grey-5"
        />

        <q-btn color="fw-secondary" class="full-width"> Entrar </q-btn>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>
