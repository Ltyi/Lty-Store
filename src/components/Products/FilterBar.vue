<template>
  <v-row>
    <v-col>
      <v-bottom-navigation
        v-model="productSort"
        class="primary rounded"
        dark
      >

        <v-btn
          text
          value="default"
        >
          <span>預設排序</span>
          <v-icon>fas fa-sort</v-icon>
        </v-btn>

        <v-btn
          text
          value="priceAsc"
        >
          <span>價格由低至高</span>
          <v-icon>fas fa-sort-amount-down-alt</v-icon>
        </v-btn>

        <v-btn
          text
          value="priceDesc"
        >
          <span>價格由高至低</span>
          <v-icon>fas fa-sort-amount-down</v-icon>
        </v-btn>

      </v-bottom-navigation>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'FilterBar',

  computed: {
    productSort: {
      get() {
        return this.$store.state.productSort;
      },
      set(val) {
        this.$store.commit('changeProductSort', val);
      },
    },
  },

};
</script>

<style lang="scss" scoped>
  .rounded {
    border-radius: 4px;
  }
</style>
