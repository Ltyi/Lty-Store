<template>
  <v-menu
    offset-y
    bottom
    nudge-bottom="5"
    :min-width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
  >
    <!-- 選單開關 -->
    <template v-slot:activator="{ on }">
      <v-badge
        color="green"
        right
        overlap
      >
        <template v-slot:badge>
          <span>{{ count }}</span>
        </template>
        <v-btn
          small
          icon
          color="white"
          v-on="on"
        >
          <v-icon size="20">
            mdi-cart
          </v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- 選單本體 -->
    <v-card
      class="px-6 py-3"
      :min-width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
    >
      <v-card-title
        class="pb-4 pt-3 body-2 justify-center font-weight-bold"
      >
        <div>購物車</div>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text class="pa-0">
        <v-list two-line dense>
          <v-list-item
            v-for="(item, index) in cart"
            :key="index"
          >
            <v-list-item-avatar>
              <v-img :src="item.image"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="d-flex">
                {{ item.color }}
                <span class="ml-auto">數量: {{ item.quantity }}</span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-text
        v-if="!cart.length"
        class="text-center"
      >
        購物車內無產品！
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          class="white--text"
          block
          v-if="cart.length"
          to="/checkout"
        >
          結帳去！
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'TheCart',
  computed: {
    ...mapGetters('cart', ['cart']),

    // [ 計算購物車內產品數量 ]
    count() {
      let count = 0;
      for (let i = 0; i < this.cart.length; i += 1) {
        count += this.cart[i].quantity;
      }
      return count;
    },

  },

  methods: {
    ...mapMutations('cart', ['getLocalStorage']),
  },

  created() {
    this.getLocalStorage();
  },
};
</script>
