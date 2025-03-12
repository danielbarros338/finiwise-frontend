<template>
  <q-card class="no-shadow q-pa-sm">
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.card-base-primary {
  background-color: var(--color-fw-primary);
}

.card-base-primary-light {
  background-color: var(--color-fw-primary-light);
}

.card-base-secondary {
  background-color: var(--color-fw-secondary);
}

.card-base-secondary-light {
  background-color: var(--color-fw-secondary-light);
}
</style>
