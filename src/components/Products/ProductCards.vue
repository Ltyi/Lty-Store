<template>
  <v-row>
    <v-overlay :value="productLoading" opacity="0.3">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary lighten-3"
        class="align-self-center"
        indeterminate
      ></v-progress-circular>
    </v-overlay>

    <v-overlay :value="productEmpty && !productLoading" opacity="0" z-index="0">
      <h2 class="title primary--text">查無商品</h2>
    </v-overlay>

    <v-col
      cols="12"
      sm="6"
      md="4"
      v-for="item in productsFilter"
      :key="item.id"
    >
      <base-card :item="item"></base-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex';
import BaseCard from '@/components/Products/BaseCard.vue';

export default {
  name: 'ProductCards',

  components: {
    BaseCard,
  },

  computed: {
    ...mapState(['products', 'productSort', 'productLoading']),

    // [ 無產品資訊時顯示 ]
    productEmpty() {
      if (!this.productsFilter.length) {
        return true;
      }
      return false;
    },

    // [ 產品依條件過濾排序 ]
    productsFilter() {
      const { category, brand } = this.$route.params;

      const filter = this.products.filter(
        item => item.brand === brand
        && item.category === category,
      );

      let result = [];

      if (this.productSort === 'default') {
        result = filter.sort((a, b) => a.sort - b.sort);
      }
      if (this.productSort === 'priceAsc') {
        result = filter.sort((a, b) => a.price - b.price);
      }
      if (this.productSort === 'priceDesc') {
        result = filter.sort((a, b) => a.price - b.price).reverse();
      }

      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.subtitle-1 {
  width: 100%;
  letter-spacing: 1px !important;
}

.v-btn {
  min-width: 70px !important;
}
</style>
