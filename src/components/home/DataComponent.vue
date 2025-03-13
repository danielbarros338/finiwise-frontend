<template>
  <div class="transaction-card q-pa-sm">
    <!-- Ícone -->
    <div :style="`background-color: var(${iconConfig.color});`" class="icon-container">
      <q-icon class="text-white" :name="iconConfig.icon" />
    </div>

    <!-- Informações da Transação -->
    <div class="transaction-info">
      <p class="text-h6 transaction-name q-mb-none">nome</p>
      <p class="transaction-sub q-mb-none">categoria</p>
    </div>

    <!-- Valor e Data -->
    <div class="transaction-details">
      <p class="transaction-amount q-mb-none">R$ xx,xx</p>
      <p class="transaction-sub q-mb-none">data</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  tab: String,
})

const iconConfig = computed(() => {
  switch (props.tab) {
    case 'revenues':
      return {
        icon: 'money_off',
        color: '--color-fw-danger',
      }
    case 'earnings':
      return {
        icon: 'money',
        color: '--color-fw-success',
      }
    case 'wallets':
      return {
        icon: 'account_balance_wallet',
        color: '--color-fw-primary',
      }
  }

  return {
    icon: '',
    color: '',
  }
})
</script>

<style scoped>
/* Estilos gerais */
.transaction-card {
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

/* Ícone */
.icon-container {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
  color: white;
}

/* Informações da Transação */
.transaction-info {
  flex: 1;
  margin-left: 10px;
}

.transaction-name {
  font-size: 16px;
  font-weight: bold;
}

.transaction-sub {
  font-size: 12px;
  color: var(--color-fw-text-secondary);
}

.transaction-amount {
  font-size: 16px;
  font-weight: bold;
  color: var(--color-fw-danger);
}
</style>
