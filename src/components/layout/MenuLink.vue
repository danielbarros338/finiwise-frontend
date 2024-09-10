<template>
  <q-item clickable tag="a" target="_blank" :href="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { MenuLinkProps } from 'src/interfaces/menu-link.ts';

defineOptions({
  name: 'MenuLink',
});

withDefaults(defineProps<MenuLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
});
</script>
