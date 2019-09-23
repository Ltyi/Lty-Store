<template>
  <v-card>
    <v-carousel
      :cycle="false"
      hide-delimiters
      :height="$vuetify.breakpoint.mdAndUp ? 500 : 300"
    >
      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import cover1 from '@/assets/cover1.jpg';
import cover2 from '@/assets/cover2.jpg';
import cover3 from '@/assets/cover3.jpg';

export default {
  name: 'CarouselsSlider',
  data() {
    return {
      images: [
        {
          src: cover2,
        },
        {
          src: cover1,
        },
        {
          src: cover3,
        },
      ],
    };
  },
};
</script>
