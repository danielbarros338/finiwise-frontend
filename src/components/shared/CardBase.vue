<template>
  <q-card class="card-base no-shadow q-pa-sm">
    <slot></slot>
  </q-card>
</template>

<script setup lang="ts"></script>

<style scoped>
.card-base {
  background-color: var(--color-fw-primary);
}
</style>
