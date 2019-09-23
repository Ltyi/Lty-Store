<template>
  <v-container>
    <filter-bar></filter-bar>
    <router-view></router-view>
  </v-container>
</template>

<script>
import FilterBar from '@/components/Products/FilterBar.vue';

export default {
  name: 'ProductList',
  components: {
    FilterBar,
  },
};
</script>
