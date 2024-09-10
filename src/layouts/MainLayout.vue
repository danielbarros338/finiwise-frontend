<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: var(--color-fw-primary)" elevated>
      <q-toolbar class="row justify-between">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-btn flat dense to="/">
          <q-img src="src/assets/images/finiwise-logo.png" width="50px" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <MenuLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { MenuLinkProps } from 'src/interfaces/menu-link';

import MenuLink from 'components/layout/MenuLink.vue';

defineOptions({
  name: 'MainLayout',
});

const linksList: MenuLinkProps[] = [
  {
    title: 'Principal',
    link: '/',
    icon: 'home',
  },
];
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
