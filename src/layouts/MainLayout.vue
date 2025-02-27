<template>
  <q-layout view="hHh lpR fFf" style="background-color: #1e1e1e">
    <!-- Cabeçalho da Dashboard -->
    <q-header elevated style="background-color: #ffa100">
      <q-toolbar>
        <q-toolbar-title>Dashboard</q-toolbar-title>

        <q-btn flat round icon="menu">
          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup>
                <q-item-section @click="sendTo('earnings')">
                  <div><q-icon class="q-mr-sm" name="attach_money" />Ganhos</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('revenues')">
                <q-item-section>
                  <div><q-icon class="q-mr-sm" name="money_off" />Gastos</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('cards')">
                <q-item-section>
                  <div><q-icon class="q-mr-sm" name="credit_card" />Cartões</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('wallets')">
                <q-item-section>
                  <div><q-icon class="q-mr-sm" name="account_balance_wallet" />Carteiras</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup>
                <q-item-section style="color: red">
                  <div><q-icon class="q-mr-sm" name="logout" />Sair</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Área principal do conteúdo -->
    <q-page-container>
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const $router = useRouter()

async function sendTo(page: string): Promise<void> {
  await $router.push(`/${page}`)
}
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
