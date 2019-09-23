<template>
  <v-container>
    <v-row>

      <!-- 訂單紀錄表格 -->
      <v-col>
        <v-card>
          <v-card-title class="py-8 justify-center">訂單紀錄</v-card-title>
          <v-card-text>
            <v-data-table
              no-data-text="無訂單紀錄可供檢視"
              :loading="ordersLoading"
              loading-text="訂單資料讀取中"
              hide-default-footer
              :headers="headers"
              :items="getOrders"
            >
              <!-- 訂單狀態 -->
              <template v-slot:item.paymentStatus="{ item }">
                <v-chip label dark :color="getColor(item.paymentStatus)">
                  {{ item.paymentStatus }}
                </v-chip>
              </template>

              <!-- 刪除產品 -->
              <template v-slot:item.orderDetail="{ item }">
                <v-btn
                  icon
                  color="grey darken-3"
                  @click="showDetail(item)"
                >
                  <v-icon size="18">mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- 訂單詳細資訊 -->
      <v-dialog
        v-model="dialog"
        :max-width="$vuetify.breakpoint.xsOnly ? '100%' : '700px'"
        class="ma-0"
      >
        <v-card>
          <v-card-title>
            <span>訂單詳細資訊</span>
            <v-spacer></v-spacer>
            <v-icon @click="closeDetail()">mdi-close</v-icon>
          </v-card-title>

          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">商品</th>
                  <th class="text-left">數量</th>
                  <th class="text-left">金額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in detail.products" :key="index">
                  <td>{{ `${item.title} / ${item.color}` }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ `$ ${item.price}` }}</td>
                </tr>
              </tbody>
            </v-simple-table>

            <v-divider class="mb-5"></v-divider>

            <div class="d-flex py-2">
              <v-spacer></v-spacer>
              <span class="body-1 primary--text">合計：{{ detail.totalPrice }}</span>
            </div>

            <div>
              <p>收件人： {{ detail.recipient.name }} / 電子信箱： {{ detail.recipient.email }}</p>
              <p>聯絡電話： {{ detail.recipient.phone }} / 收件地址： {{ detail.recipient.address }}</p>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  name: 'Orders',
  data() {
    return {
      // [ 訂單詳細資訊視窗 ]
      dialog: false,
      detail: {},
      defaultDetail: {
        products: [],
        recipient: {
          name: '',
          phone: '',
          address: '',
          email: '',
        },
        totalPrice: '',
      },
      // [ 清單表頭 ]
      headers: [
        {
          text: '訂單ID',
          value: 'orderId',
          align: 'center',
          sortable: false,
        },
        {
          text: '訂單日期',
          value: 'createdAt',
          align: 'center',
          sortable: false,
        },
        {
          text: '訂單狀態',
          value: 'paymentStatus',
          align: 'center',
          sortable: false,
        },
        {
          text: '訂單總額',
          value: 'totalPrice',
          align: 'center',
          sortable: false,
        },
        {
          text: '詳細資訊',
          value: 'orderDetail',
          align: 'center',
          sortable: false,
        },
      ],
    };
  },

  computed: {
    ...mapGetters('user', ['getOrders']),
    ...mapState('user', ['ordersLoading']),
  },

  methods: {
    ...mapActions('user', ['bindOrdersRef']),

    // [ 打開訂單詳細資訊 ]
    showDetail(item) {
      this.detail = Object.assign({}, item);
      this.dialog = true;
    },

    // [ 關閉訂單詳細資訊 ]
    closeDetail() {
      this.dialog = false;
      setTimeout(() => {
        this.detail = Object.assign({}, this.defaultDetail);
      }, 300);
    },

    // [ 獲取產品狀態顏色 ]
    getColor(status) {
      switch (status) {
        case '未付款':
          return 'red';
        case '已付款':
          return 'green';
        case '已出貨':
          return 'blue';
        default:
          return 'grey';
      }
    },
  },

  created() {
    this.detail = Object.assign({}, this.defaultDetail);
    this.bindOrdersRef();
  },
};
</script>
