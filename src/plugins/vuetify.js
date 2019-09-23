import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const options = {
  theme: {
    themes: {
      light: {
        primary: '#3e4741',
      },
    },
    options: {
      customProperties: true,
    },
  },
};

export default new Vuetify(options);
