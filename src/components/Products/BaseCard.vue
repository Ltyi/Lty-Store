<template>
  <v-card
    class="fill-height d-flex flex-column"
  >
    <v-img
      :src="item.imageUrl"
      max-width="100%"
      height="250px"
    >
    </v-img>

    <v-chip
      label
      dark
      small
      class="align-self-start ma-4 mb-0"
    >
      {{ item.brand }}
    </v-chip>

    <v-card-title class="subtitle-1 pt-1 pb-0">
      {{ item.title }}
    </v-card-title>

    <v-card-text class="pb-0">
      <div class="subtitle-2">{{ item.subtitle }}</div>
      <div class="text-right pb-2 subtitle-1 red--text text--lighten-1">${{ item.price }}</div>

      <v-fade-transition>
        <v-overlay
          v-if="addOverlay"
          absolute
          color="primary"
          opacity="0.8"
          class="pa-3"
        >
          <v-select
            v-model="color"
            :items="item.colors"
            class="pt-0"
            label="請選擇顏色"
            color="white"
            :rules="rules.color"
            hide-details
            single-line
          ></v-select>

          <v-btn
            class="mt-3"
            color="green"
            width="100%"
            @click="addToCart(item.id)"
          >
            加入購物車
          </v-btn>
          <v-btn
            text
            class="mt-3"
            width="100%"
            @click="addOverlay = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-overlay>
      </v-fade-transition>
    </v-card-text>

    <v-spacer></v-spacer>

    <v-card-actions class="pa-0">
      <v-btn
        tile
        text
        outlined
        large
        width="50%"
        color="primary"
        :to="`/productinfo/${item.id}/${item.title}`"
      >
        查看詳情
      </v-btn>
      <v-btn
        tile
        text
        outlined
        large
        width="50%"
        color="primary"
        class="ml-0"
        @click="addOverlay = true"
      >
        <v-icon size="16">mdi-cart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',
  props: ['item'],
  data() {
    return {
      cart: [],
      addOverlay: false,
      color: '',
      rules: {
        color: [
          val => !!val || '請選擇顏色或款式',
        ],
      },
    };
  },

  methods: {
    addToCart(id) {
      if (this.color === '') {
        return;
      }

      const product = {
        id,
        color: this.color,
        quantity: 1,
      };

      this.$store.dispatch('cart/addProductToCart', product);
      this.addOverlay = false;
    },
  },
};
</script>
