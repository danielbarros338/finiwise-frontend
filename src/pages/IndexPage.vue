<template>
  <q-page class="q-pa-md bg-fw-primary-light">
    <div class="row">
      <div class="col-xs-12">
        <EarningCardComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EarningCardComponent from '/src/components/home/EarningsCardComponent.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
