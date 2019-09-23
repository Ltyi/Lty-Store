<template>
  <v-form
    v-model="valid"
    ref="form"
  >
    <v-container>
      <!-- 標題 -->
      <v-subheader class="pa-0">收件人資料</v-subheader>

      <v-row>
        <!-- 姓名 -->
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            single-line
            v-model="recipientName"
            :rules="rules.name"
            label="收件人姓名"
          ></v-text-field>
        </v-col>

        <!-- EMAIL -->
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            single-line
            v-model="recipientEmail"
            :rules="rules.email"
            label="E-Mail"
          ></v-text-field>
        </v-col>

        <!-- 電話 -->
        <v-col
          cols="12"
          sm="4"
        >
          <v-text-field
            single-line
            v-model="recipientPhone"
            :rules="rules.phone"
            label="收件人電話"
          ></v-text-field>
        </v-col>

        <!-- 地址 -->
        <v-col
          cols="12"
          sm="8"
        >
          <v-text-field
            single-line
            v-model="recipientAddress"
            :rules="rules.address"
            label="收件人地址"
          ></v-text-field>
        </v-col>

        <!-- 是否更新個人資料 -->
        <v-col>
          <v-checkbox
            v-model="recipientInfoUpdate"
            color="green"
            label="將此次訂購資料儲存以利下次購物使用"
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartPayment',

  data() {
    return {
      valid: false,
      rules: {
        email: [
          v => !!v || '請輸入電子郵件',
          v => /.+@.+\..+/.test(v) || '電子郵件不符合格式',
        ],
        name: [
          v => !!v || '請輸入收件人',
          v => v.length <= 20 || '不得超過20個字',
        ],
        phone: [
          v => !Number.isNaN(Number(v)) || '請輸入數字',
          v => !!v || '請輸入收件人電話',
        ],
        address: [
          v => !!v || '請輸入收件地址',
        ],
      },
    };
  },

  methods: {
    ...mapActions('cart', ['checkout']),

    validate() {
      if (this.$refs.form.validate()) {
        this.checkout();
      }
    },
  },

  computed: {
    recipientName: {
      get() {
        return this.$store.state.cart.recipientName;
      },
      set(value) {
        this.$store.commit('cart/setRecipientName', value);
      },
    },

    recipientEmail: {
      get() {
        return this.$store.state.cart.recipientEmail;
      },
      set(value) {
        this.$store.commit('cart/setRecipientEmail', value);
      },
    },

    recipientPhone: {
      get() {
        return this.$store.state.cart.recipientPhone;
      },
      set(value) {
        this.$store.commit('cart/setRecipientPhone', value);
      },
    },

    recipientAddress: {
      get() {
        return this.$store.state.cart.recipientAddress;
      },
      set(value) {
        this.$store.commit('cart/setRecipientAddress', value);
      },
    },

    recipientInfoUpdate: {
      get() {
        return this.$store.state.cart.recipientInfoUpdate;
      },
      set(value) {
        this.$store.commit('cart/setRecipientInfoUpdate', value);
      },
    },
  },

  created() {
    // [ 獲取當前用戶的前一次購物資訊 ]
    this.$store.dispatch('cart/getRecipientDetail');
  },
};
</script>
