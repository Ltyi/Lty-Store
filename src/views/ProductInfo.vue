<template>
  <v-container>
    <v-row>

      <!-- 麵包屑 -->
      <v-col cols="12" v-if="product">
        <v-breadcrumbs
          :items="breadcrumbs"
          class="grey lighten-2"
          style="border-radius: 4px"
        >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </v-col>

      <!-- 商品內容主體 -->
      <v-col cols="12" v-if="product">
        <v-container class="pa-0">
          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="elevation-6">
                <v-img :src="product.imageUrl"></v-img>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
              class="px-0"
            >
              <v-card
                flat
                color="#fafafa"
                class="fill-height"
              >
                <v-card-text class="py-0">
                  <v-chip
                    label
                    outlined
                    color="primary"
                    class="mr-2"
                  >
                    {{ product.brand }}
                  </v-chip>

                  <v-chip
                    label
                    color="primary"
                  >
                    {{ product.category }}
                  </v-chip>
                </v-card-text>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title class="headline">{{ product.title }}</v-list-item-title>
                    <v-list-item-subtitle>{{ product.subtitle }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-text>
                  <span class="headline red--text">NT$ {{ product.price }}</span>
                </v-card-text>

                <v-card-text>
                  <span>選擇顏色</span>
                  <v-chip-group
                    column
                    active-class="primary"
                    v-model="color"
                  >
                    <v-chip
                      label
                      v-for="color in product.colors"
                      :key="color"
                      :value="color"
                    >
                      {{ color }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>

                <v-card-actions class="px-4">
                  <v-btn
                    tile
                    block
                    color="primary"
                    @click="addProductToCart({id: product.id, color: color, quantity: 1})"
                  >
                    加入購物車
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="12" class="mt-8">
              <base-heading>商品介紹</base-heading>
              <p class="pt-4" v-text="product.description"></p>
            </v-col>

          </v-row>
        </v-container>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import BaseHeading from '@/components/BaseHeading.vue';

export default {
  name: 'ProductInfo',

  components: {
    BaseHeading,
  },

  data() {
    return {
      // [ 選擇顏色 ]
      color: '',
    };
  },

  computed: {
    ...mapState(['products']),

    breadcrumbs() {
      const { category, brand } = this.product;
      return [
        {
          text: '首頁',
          disabled: false,
          to: '/',
        },
        {
          text: `${category} - ${brand}`,
          disabled: false,
          to: `/productlist/${category}/${brand}`,
        },
        {
          text: this.product.title,
          disabled: true,
        },
      ];
    },

    product() {
      const { id } = this.$route.params;
      return this.products.find(item => item.id === id);
    },
  },

  methods: {
    ...mapActions('cart', ['addProductToCart']),
  },

  mounted() {
    document.title = this.$route.params.title;
  },

};
</script>

<style lang="scss" scoped>
  [v-cloak] {
    display: none;
  }
</style>
