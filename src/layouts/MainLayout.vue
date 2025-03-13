<template>
  <q-layout view="hHh lpR fFf" class="modern-layout">
    <!-- Cabeçalho da Dashboard -->
    <q-header elevated class="modern-header">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="toolbar-title" @click="sendTo('/')">Finiwise</q-toolbar-title>

        <q-btn flat round icon="menu" class="menu-btn">
          <q-menu class="modern-menu">
            <q-list class="modern-menu-list">
              <q-item clickable v-close-popup @click="sendTo('earnings')">
                <q-item-section>
                  <div class="menu-item"><q-icon class="q-mr-sm" name="attach_money" />Ganhos</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('revenues')">
                <q-item-section>
                  <div class="menu-item"><q-icon class="q-mr-sm" name="money_off" />Gastos</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('cards')">
                <q-item-section>
                  <div class="menu-item"><q-icon class="q-mr-sm" name="credit_card" />Cartões</div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('wallets')">
                <q-item-section>
                  <div class="menu-item">
                    <q-icon class="q-mr-sm" name="account_balance_wallet" />Carteiras
                  </div>
                </q-item-section>
              </q-item>
              <q-separator />

              <q-item clickable v-close-popup @click="sendTo('auth/login')">
                <q-item-section class="logout">
                  <div class="menu-item"><q-icon class="q-mr-sm" name="logout" />Sair</div>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Área principal do conteúdo -->
    <q-page-container class="page-container">
      <q-page>
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
/* Layout principal com fundo claro e moderno */
.modern-layout {
  background: var(--color-fw-grey-light);
}

/* Cabeçalho com gradiente moderno e cor branca para os textos */
.modern-header {
  background: linear-gradient(90deg, var(--color-fw-secondary), var(--color-fw-primary));
  color: #fff;
}

/* Toolbar com espaçamento interno adequado */
.toolbar {
  padding: 0 16px;
}

/* Título com fonte mais destacada e moderna */
.toolbar-title {
  font-weight: 600;
  font-size: 1.5rem;
}

/* Botão do menu com ícone na cor branca */
.menu-btn {
  color: #fff;
}

/* Menu pop-up com bordas arredondadas e sombra sutil */
.modern-menu {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Lista do menu com tamanho mínimo e tipografia moderna */
.modern-menu-list {
  min-width: 220px;
  font-size: 1rem;
}

/* Itens do menu com alinhamento, padding e efeito hover */
.menu-item {
  display: flex;
  align-items: center;
  padding: 10px;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Estilo específico para o item de logout, evidenciando com cor de alerta */
.logout {
  color: #e53935;
}

/* Área principal com fundo claro para contraste com o cabeçalho */
.page-container {
  background: var(--color-fw-grey-light);
}
</style>
