<template>
  <v-container>
    <v-row>
      <!-- Stepper -->
      <v-col cols="12">
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step
              step="1"
              color="green"
              :complete="step > 1"
            >
              購物列表
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="2"
              color="green"
              :complete="step > 2"
            >
              訂單資料
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              step="3"
              color="green"
              :complete="step > 2"
            >
              完成訂單
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </v-col>
      <!-- end of stepper -->
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <!-- cart table -->
          <v-card-text v-if="checkoutStatus == 'review'">
            <checkout-list></checkout-list>
          </v-card-text>
          <!-- end of cart table -->

          <!-- 訂購人資料輸入 -->
          <v-card-text v-if="checkoutStatus == 'payment'">
            <checkout-payment ref="payment"></checkout-payment>
          </v-card-text>

          <v-card-text v-if="checkoutStatus == 'complete'">
            <checkout-result></checkout-result>
          </v-card-text>

          <!-- Stepper Actions -->
          <v-card-actions v-if="cart.length">
            <v-spacer></v-spacer>
            <v-btn
              width="88"
              text
              v-if="checkoutStatus == 'payment'"
              @click="setCheckoutStatus('review')"
            >
              上一步
            </v-btn>
            <v-btn
              width="88"
              color="green"
              class="white--text"
              v-if="checkoutStatus == 'review'"
              @click="setCheckoutStatus('payment')"
            >
              下一步
            </v-btn>
            <v-btn
              width="88"
              color="green"
              class="white--text"
              v-if="checkoutStatus == 'payment'"
              @click="submit()"
            >
              送出訂單
            </v-btn>
          </v-card-actions>
          <!-- end of stepper actions -->
        </v-card>
      </v-col>
    </v-row>

    <!-- 讀取畫面 -->
    <v-overlay :value="checkoutLoading" opacity="0.3">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary lighten-3"
        class="align-self-center"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
} from 'vuex';
import CheckoutList from '@/components/Checkout/CheckoutList.vue';
import CheckoutPayment from '@/components/Checkout/CheckoutPayment.vue';
import CheckoutResult from '@/components/Checkout/CheckoutResult.vue';

export default {
  name: 'Checkout',

  components: {
    CheckoutList,
    CheckoutPayment,
    CheckoutResult,
  },

  computed: {
    ...mapGetters('cart', ['cart']),
    ...mapState('cart', ['checkoutStatus', 'checkoutLoading']),

    step() {
      if (this.checkoutStatus === 'review') {
        return 1;
      }
      if (this.checkoutStatus === 'payment') {
        return 2;
      }
      return 3;
    },
  },

  methods: {
    ...mapMutations('cart', ['setCheckoutStatus']),

    submit() {
      this.$refs.payment.validate();
    },
  },

  created() {
    this.setCheckoutStatus('review');
  },
};
</script>

<style lang="scss" scoped>
  th > span {
    white-space: nowrap;
  }
</style>
