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
              <div>會員註冊</div>
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
              <v-text-field
                v-model="passwordCheck"
                :rules="rules.passwordCheck"
                type="password"
                label="確認密碼"
              ></v-text-field>
              <p class="red--text" v-if="errorMessage">{{ errorMessage }}</p>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="signup">送出</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Signup',
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      passwordCheck: '',
      rules: {
        email: [
          v => !!v || '請輸入電子郵件',
          v => /.+@.+\..+/.test(v) || '電子郵件不符合格式',
        ],
        password: [
          v => !!v || '請輸入密碼',
          v => v.length >= 6 || '至少6位數',
        ],
        passwordCheck: [
          v => !!v || '請再輸入一次密碼',
          v => v === this.password || '兩次密碼不相同',
        ],
      },
    };
  },

  computed: {
    ...mapState('user', ['errorMessage']),
  },

  methods: {
    // [ 會員註冊 ]
    signup() {
      if (this.valid) {
        this.$store.dispatch('user/userSignUp', {
          email: this.email,
          password: this.password,
          path: '/',
        });
      }
    },
  },
};
</script>
