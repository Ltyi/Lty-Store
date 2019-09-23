<template>
  <v-footer
    app
    padless
    dark
    absolute
    class="mt-10"
  >
    <v-card
      flat
      tile
      width="100%"
      class="primary lighten-1 text-center"
    >
      <v-card-text>
        <v-btn
          icon
          class="mx-3 white--text"
          href="https://github.com/Ltyi/Lty-Store"
          target="_blank"
        >
          <v-icon size="24px">fab fa-github</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="primary">
        &copy;2019 — <strong>Lty</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'TheFooter',
};
</script>
