<template>
  <v-text-field
    class="quantity-counter"
    :value="quantity"
    single-line
    label="數量"
  >
    <template v-slot:prepend>
      <v-icon @click="setQuantity('dec')">
        mdi-minus
      </v-icon>
    </template>

    <template v-slot:append-outer>
      <v-icon @click="setQuantity('inc')">
        mdi-plus
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'QuantityCounter',
  props: ['quantity', 'id', 'color'],

  methods: {
    ...mapMutations('cart', ['incrementItemQuantity', 'decrementItemQuantity']),

    setQuantity(action) {
      const product = {
        id: this.id,
        color: this.color,
      };
      if (action === 'inc') {
        this.incrementItemQuantity(product);
      } else if (action === 'dec' && this.quantity !== 1) {
        this.decrementItemQuantity(product);
      }
    },

  },
};
</script>

<style lang="scss">
  .quantity-counter .v-text-field__slot {
    input {
      text-align: center;
    }
  }
</style>
