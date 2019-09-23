<template>
  <v-container class="fill-height">
    <v-row>
      <v-col>
        <v-form
          v-model="valid"
          ref="form"
        >
          <v-card
            max-width="344"
            class="mx-auto"
          >
            <v-card-title
              class="body-1 justify-center font-weight-bold"
            >
              <div>會員登入</div>
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model.lazy="email"
                :rules="rules.email"
                label="電子郵件"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :rules="rules.password"
                type="password"
                label="密碼"
              ></v-text-field>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text to="/signup">註冊</v-btn>
              <v-btn text @click="login">登入</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>

      <!-- 登入讀取畫面 -->
      <v-overlay :value="loginLoading" opacity="0.3">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary lighten-3"
          class="align-self-center"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      rules: {
        email: [
          v => !!v || '請輸入電子郵件',
          v => /.+@.+\..+/.test(v) || '電子郵件不符合格式',
        ],
        password: [
          v => !!v || '請輸入密碼',
          v => v.length >= 6 || '至少6位數',
        ],
      },
    };
  },

  computed: {
    ...mapState('user', ['loginLoading']),
  },

  methods: {
    // [ 會員登入 ]
    login() {
      if (this.valid) {
        const path = this.$route.query.redirect || '/';
        this.$store.dispatch('user/userLogIn', {
          email: this.email,
          password: this.password,
          path,
        });
      }
    },
  },
};
</script>
