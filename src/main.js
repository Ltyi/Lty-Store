import Vue from 'vue';

// [ Vuetify ]
import vuetify from '@/plugins/vuetify';
// [ firebase]
import { auth } from '@/db';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const unsubscribe = auth.onAuthStateChanged((user) => {
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    created() {
      if (user) {
        store.dispatch('user/autoSignIn', user);
      }
    },
  }).$mount('#app');
  unsubscribe();
});
