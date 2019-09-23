<template>
  <v-app>

    <the-header></the-header>

    <v-content>
      <router-view></router-view>
    </v-content>

    <the-footer></the-footer>

  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },
  // [ 取得全站產品分類 ]
  mounted() {
    this.$store.dispatch('bindCategoryRef');
    this.$store.dispatch('bindProductsRef');
  },
};
</script>
