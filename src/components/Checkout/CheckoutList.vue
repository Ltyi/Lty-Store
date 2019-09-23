<template>
  <div>
    <!-- 標題 -->
    <v-subheader class="pa-0">購物車清單</v-subheader>

    <!-- 購物車清單 -->
    <v-data-table
      :headers="headers"
      :items="cart"
      item-key="idx"
      no-data-text="購物車內無產品"
      no-results-text="無相關產品"
      hide-default-footer
    >
      <!-- 購物車清單 - 圖片欄位 -->
      <template v-slot:item.image="{ item }">
        <v-avatar>
          <v-img :src="item.image" max-width="48"></v-img>
        </v-avatar>
      </template>

      <!-- 購物車清單 - 數量操作 -->
      <template v-slot:item.quantity="{ item }">
        <quantity-counter
          :quantity="item.quantity"
          :color="item.color"
          :id="item.id"
        ></quantity-counter>
      </template>

      <!-- 購物車清單 - 價格欄位 -->
      <template v-slot:item.price="{ item }">
        $ {{ item.price }}
      </template>

      <!-- 購物車清單 - 刪除產品 -->
      <template v-slot:item.action="{ item }">
        <v-btn
          color="red lighten-1"
          icon
          @click="deleteProductFromCart({id: item.id, color: item.color})"
        >
          <v-icon size="16">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <!-- 購物車清單 end -->

    <v-divider class="mb-5"></v-divider>

    <!-- 價格合計 -->
    <div class="d-flex">
      <v-spacer></v-spacer>
      <span class="body-1 primary--text">合計：$ {{ totalPrice }}</span>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import QuantityCounter from '@/components/Checkout/QuantityCounter.vue';

export default {
  name: 'CheckoutList',
  data() {
    return {
      // [ 清單表頭 ]
      headers: [
        {
          text: '圖片',
          value: 'image',
          align: 'center',
          sortable: false,
        },
        {
          text: '名稱',
          value: 'title',
          align: 'center',
          sortable: false,
        },
        {
          text: '顏色',
          value: 'color',
          align: 'center',
          sortable: false,
        },
        {
          text: '數量',
          value: 'quantity',
          align: 'center',
          width: '150px',
          sortable: false,
        },
        { text: '價格', value: 'price', align: 'center' },
        {
          text: '刪除',
          value: 'action',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },

  computed: {
    ...mapState('cart', ['clientCart']),
    ...mapGetters('cart', ['totalPrice', 'cart']),
  },

  methods: {
    ...mapMutations('cart', ['deleteProductFromCart']),
  },

  components: {
    QuantityCounter,
  },
};
</script>
