<template>
  <v-app-bar
    app
    color="primary"
    height="64"
  >
    <!-- LOGO -->
    <router-link to="/">
      <v-img
        :src="require('@/assets/logo.jpg')"
        alt="LOGO"
        contain
        max-width="64"
        max-height="64"
      ></v-img>
    </router-link>

    <v-spacer></v-spacer>

    <!-- navigation -->
    <nav class="header-nav">

      <!-- desktop menu -->
      <ul class="header-nav__list hidden-xs-only">
        <v-menu
          dark
          offset-y
          min-width="100%"
          v-for="(item, idx) in category" :key="idx"
        >
          <template v-slot:activator="{ on }">
            <li
              class="header-nav__item"
            >
              <a v-on="on">{{ item.name }}</a>
            </li>
          </template>

          <div class="white">
            <v-container class="px-3 py-0">
              <v-row>
                <v-col class="text-right px-0">
                  <v-btn
                    text
                    exact
                    color="primary"
                    v-for="(brand,idx) in item.brand"
                    :key="idx"
                    :to="`/productlist/${item.name}/${brand}`"
                  >
                    {{ brand }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-menu>
      </ul>
      <!-- end of desktop menu -->

      <the-cart></the-cart>
      <the-user></the-user>

      <!-- mobile menu -->
      <v-menu
        v-model="mobile"
        min-width="100%"
        :nudge-bottom="55"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
            class="white--text hidden-sm-and-up">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list tile>
          <v-list-group
            v-for="(item,idx) in category"
            :key="idx"
            :prepend-icon="item.icon"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(brand,idx) in item.brand"
              :key="idx"
              :to="`/productlist/${item.name}/${brand}`"
              @click="mobile = false"
            >
              <v-list-item-content>
                <v-list-item-title v-text="brand"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-menu>
      <!-- end of mobile menu -->

    </nav>

  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import TheCart from '@/components/TheCart.vue';
import TheUser from '@/components/TheUser.vue';

export default {
  name: 'TheHeader',

  data() {
    return {
      mobile: false,
    };
  },

  computed: {
    ...mapState(['category']),
  },

  components: {
    TheCart,
    TheUser,
  },

};
</script>


<style lang="scss" scoped>
.header-nav {
  display: flex;
  align-items: center;
  height: 64px;
  color: var(--v-primary-base);
  margin-left: auto;
  &__list {
    height: 64px;
    list-style: none;
    display: flex;
    padding: 0;
  }
  &__item {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
    a {
      padding: 8px 0;
      margin: 0px 16px;
      text-decoration: none;
      color: #fff;
      letter-spacing: 1px;
      border-bottom: 1px solid var(--v-primary-base);
      transition: border-bottom .4s;
      &:hover,
      &:focus {
        border-bottom: 1px solid #fff;
      }
    }
  }
}

.v-list__group--active:before,
.v-list__group--active:after {
  background: none !important;
}
</style>
