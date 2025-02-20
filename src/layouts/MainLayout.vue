<template>
  <q-layout view="hHh lpR fFf">
    <!-- Cabeçalho da Dashboard -->
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Dashboard </q-toolbar-title>
        <!-- Botão de menu no canto superior direito -->
        <q-btn flat round icon="menu" @click="toggleDrawer" class="q-ml-auto" />
      </q-toolbar>
    </q-header>

    <!-- Menu lateral que abre a partir da direita -->
    <q-drawer v-model="drawerOpen" side="right" bordered overlay>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="credit_card" />
          </q-item-section>
          <q-item-section>Cartões</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="attach_money" />
          </q-item-section>
          <q-item-section>Ganhos</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="money_off" />
          </q-item-section>
          <q-item-section>Gastos</q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_balance_wallet" />
          </q-item-section>
          <q-item-section>Carteiras</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Área principal do conteúdo -->
    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawerOpen = ref(false)

const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}
</script>

<style scoped>
/* Você pode adicionar estilos adicionais aqui se necessário */
</style>
