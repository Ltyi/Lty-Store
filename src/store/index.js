import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import user from './modules/user';
import cart from './modules/cart';
import { db } from '@/db';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    cart,
  },

  state: {
    // [ 產品相關 ]
    products: [],
    category: [],
    productSort: 'default',
    isLoading: false,
  },

  mutations: {
    // [ vuexfire ]
    ...vuexfireMutations,

    // [ 更換產品排序方式 ]
    changeProductSort(state, payload) {
      state.productSort = payload;
    },

    // [ 設定產品讀取狀態 ]
    setLoading(state, payload) {
      state.isLoading = payload;
    },
  },

  actions: {
    // [ 綁定firebase 產品分類至 category 這個陣列 ]
    bindCategoryRef: firestoreAction(({ bindFirestoreRef }) => {
      bindFirestoreRef('category', db.collection('category'));
    }),

    // [ 綁定firebase 產品列表至 products 這個陣列 ]
    bindProductsRef: firestoreAction(({ commit, bindFirestoreRef }) => {
      commit('setLoading', true);
      bindFirestoreRef(
        'products',
        db.collection('products')
          .where('enable', '==', true),
      ).then(() => {
        commit('setLoading', false);
      });
    }),
  },
});
