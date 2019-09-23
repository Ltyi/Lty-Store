<template>
  <v-menu
    offset-y
    bottom
    nudge-bottom="5"
    :min-width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
  >
    <!-- 選單開關 -->
    <template v-slot:activator="{ on }">
      <v-btn
        small
        text
        icon
        color="white"
        v-on="on"
      >
        <v-icon size="20">
          mdi-account
        </v-icon>
      </v-btn>
    </template>

    <!-- 選單本體 -->
    <v-card
      class="px-6 py-3"
      :min-width="$vuetify.breakpoint.xsOnly ? '100%' : 300"
    >
      <v-card-title
        class="pb-4 pt-3 body-2 justify-center font-weight-bold"
      >
        <div>{{ title }}</div>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-actions
        class="flex-column"
        v-if="userEmail === null"
      >
        <v-btn
          color="green"
          class="white--text"
          block
          to="/login"
        >
          登入
        </v-btn>
        <v-btn
          color="orange"
          class="white--text ml-0 mt-2"
          block
          to="/signup"
        >
          註冊
        </v-btn>
      </v-card-actions>

      <v-card-actions
        class="flex-column"
        v-if="userEmail !== null"
      >
        <v-btn
          color="purple"
          class="white--text"
          block
          to="/orders"
        >
          訂單查詢
        </v-btn>
        <v-btn
          color="red lighten-1"
          class="white--text ml-0 mt-2"
          block
          @click="userLogOut"
        >
          登出
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TheUser',

  computed: {
    ...mapState('user', ['userEmail']),
    title() {
      return this.userEmail === null ? '尚未登入' : this.userEmail;
    },
  },

  methods: {
    ...mapActions('user', ['userLogOut']),
  },
};
</script>
