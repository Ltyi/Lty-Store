<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <carousels-slider></carousels-slider>
      </v-col>

      <v-col cols="12">
        <main-products></main-products>
      </v-col>

      <v-col cols="12">
        <h2 class="font-weight-bold mb-6 text-center display-1">Featured Products</h2>
        <sales-ranking></sales-ranking>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CarouselsSlider from '@/components/Home/CarouselsSlider.vue';
import SalesRanking from '@/components/Home/SalesRanking.vue';
import MainProducts from '@/components/Home/MainProducts.vue';

export default {
  name: 'Home',

  components: {
    CarouselsSlider,
    SalesRanking,
    MainProducts,
  },
};
</script>
