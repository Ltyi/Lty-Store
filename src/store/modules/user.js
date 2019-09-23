/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import { vuexfireMutations, firestoreAction } from 'vuexfire';
import moment from 'moment';
import router from '@/router';
import { db, auth } from '@/db';

const state = {
  // [ 用戶資訊 ]
  loginLoading: false,
  userUID: '',
  userEmail: null,
  // [ 訂單 ]
  orders: [],
  ordersLoading: false,
  // [ 錯誤訊息 ]
  signUpErrorMessage: '',
};

const getters = {
  // [ 將訂單資料排序並把timestamp格式化成日期顯示 ]
  getOrders(state) {
    return state.orders.map(item => ({
      products: item.products,
      orderId: item.orderId,
      paymentStatus: item.paymentStatus,
      recipient: item.recipient,
      totalPrice: `$ ${item.totalPrice}`,
      uid: item.uid,
      createdAt: moment(item.createdAt).format('YYYY-MM-DD'),
    }))
      .sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD')).reverse();
  },
};

const mutations = {
  // [ vuexfire ]
  ...vuexfireMutations,

  // [ 設定當前會員資訊 ]
  setUser(state, payload) {
    if (payload !== null) {
      state.userEmail = payload.email;
      state.userUID = payload.uid;
    } else {
      state.userEmail = null;
      state.userUID = '';
    }
  },

  setOrdersLoading(state, payload) {
    state.ordersLoading = payload;
  },

  // [ 登入/註冊讀取畫面 ]
  setLoginLoading(state, payload) {
    state.loginLoading = payload;
  },

  // [ 設定錯誤訊息 ]
  setErrorMessage(state, payload) {
    state.errorMessage = payload;
  },
};

const actions = {
  // [ 使用者登入狀態變更時執行 ]
  autoSignIn({ commit }, payload) {
    commit('setUser', payload);
  },

  // [ 會員註冊 ]
  userSignUp({ commit, dispatch }, payload) {
    commit('setLoginLoading', true);
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((data) => {
        // 註冊後同時在資料庫創建用戶資訊
        const ref = db.collection('users').doc(data.user.uid);
        const info = {
          email: data.user.email,
          uid: data.user.uid,
          name: '',
          address: '',
          phone: '',
          roles: 'user',
        };
        ref.set(info);
        // 登入會員
        dispatch('userLogIn', payload);
      })
      .catch((error) => {
        commit('setErrorMessage', error.message);
        console.log('code: ', error.code);
        console.log('message: ', error.message);
      });
  },

  // [ 會員登入 ]
  userLogIn({ commit }, payload) {
    commit('setLoginLoading', true);
    auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then((data) => {
        commit('setUser', data.user);
        commit('setLoginLoading', false);
        router.push(payload.path);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // [ 會員登出 ]
  userLogOut({ commit }) {
    auth.signOut().then(() => {
      commit('setUser', null);
      router.push('/login');
    }).catch((error) => {
      console.log(error);
    });
  },

  // [ 綁定firebase 訂單列表至orders 這個陣列]
  bindOrdersRef: firestoreAction(({ state, commit, bindFirestoreRef }) => {
    commit('setOrdersLoading', true);
    bindFirestoreRef(
      'orders',
      db.collection('orders').where('uid', '==', state.userUID),
    ).then(() => {
      commit('setOrdersLoading', false);
    });
  }),
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
