<template>
  <q-page class="q-pa-md bg-fw-primary-light">
    <div class="row justify-between">
      <div class="col-xs-12 col-md-6 q-mb-sm">
        <BalanceCardComponent />
      </div>

      <div class="col-xs-12 col-md-6 q-mb-sm">
        <EarningCardComponent />
      </div>
    </div>

    <div class="row justify-between">
      <div class="col-xs-12 col-md-6 q-mb-sm">
        <RevenuesCardComponent />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EarningCardComponent from '/src/components/home/EarningsCardComponent.vue';
import BalanceCardComponent from '/src/components/home/BalanceCardComponent.vue';
import RevenuesCardComponent from 'src/components/home/RevenuesCardComponent.vue';

defineOptions({
  name: 'IndexPage',
});
</script>
