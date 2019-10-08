<template>
  <v-app>

    <!-- 全域讀取遮罩 -->
    <v-overlay :value="isLoading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary lighten-2"
        class="align-self-center"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <the-header></the-header>

    <v-content>
      <router-view></router-view>
    </v-content>

    <the-footer></the-footer>

  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',

  components: {
    TheHeader,
    TheFooter,
  },

  computed: {
    ...mapState(['isLoading']),
  },

  // [ 取得全站產品及分類 ]
  mounted() {
    this.$store.dispatch('bindCategoryRef');
    this.$store.dispatch('bindProductsRef');
  },
};
</script>
