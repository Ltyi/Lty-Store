<template>
  <v-container class="pa-0">
    <v-row>
      <v-col
        cols="12"
        sm="4"
      >
        <v-card class="rank">
          <v-img
            :src="require('@/assets/rank1.jpg')"
            max-width="100%"
            class="rank__img"
          >
          </v-img>
          <v-card-title class="rank__title">
            <router-link
              to="/productinfo/YWQVSdjGMh7nyLfczz05/iPhone%2011%20Pro%20Max"
              class="rank__link"
              :class="{ 'pa-2': xs}"
            >
              iPhone 11 Pro Max
            </router-link>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-card class="rank">
          <v-img
            :src="require('@/assets/rank2.jpg')"
            max-width="100%"
            class="rank__img"
          >
          </v-img>
          <v-card-title class="rank__title">
            <router-link
              to="/productinfo/SBO5WRZTtvSai9UVZVpY/Samsung%20Note%2010+"
              class="rank__link"
              :class="{ 'pa-2': xs}"
            >
              Samsung Note 10+
            </router-link>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="4"
      >
        <v-card class="rank">
          <v-img
            :src="require('@/assets/rank3.jpg')"
            max-width="100%"
            class="rank__img"
          >
          </v-img>
          <v-card-title class="rank__title">
            <router-link
              to="/productinfo/WFv6D5p8QQaLsEucfES4/ZenBook%20Pro%20Duo"
              class="rank__link"
              :class="{ 'pa-2': xs}"
            >
              Asus ZenBook Pro Duo
            </router-link>
          </v-card-title>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SalesRanking',
  computed: {
    xs() {
      return this.$vuetify.breakpoint.xsOnly;
    },
  },
};
</script>

<style lang="scss" scoped>

.rank {
  overflow: hidden;
}

.rank__img {
  transition: all .3s ease-out;
  transform: translateZ(0);
  transform: scale(1.02);
  &:hover {
    opacity: .8;
    transform: scale(1);
  }
}

.rank__title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0px;
  margin: 0;
  background-color: rgba(0,0,0,0.7);
  font-size: 16px;
}

.rank__link {
  width: 100%;
  padding: 8px;
  text-align: center;
  text-decoration: none;
  color: #fff;
  &:hover {
    color: var(--v-primary-lighten4);
    text-decoration: underline;
  }
}
</style>
