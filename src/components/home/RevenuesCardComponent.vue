<template>
  <q-card>
    <q-card-section class="text-h6">Gastos</q-card-section>

    <q-separator inset />

    <q-card-section>
      <ApexArea />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import ApexArea from 'src/components/charts/ApexArea.vue';

defineOptions({
  name: 'RevenuesCardComponent',
});
</script>
