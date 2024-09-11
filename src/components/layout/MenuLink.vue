<template>
  <q-item clickable>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-btn flat dense :to="link" class="justify-start"
        >{{ title }} {{ caption }}</q-btn
      >
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
