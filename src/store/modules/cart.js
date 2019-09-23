/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */

import { db } from '@/db';

const state = {
  // [ 購物車 ]
  clientCart: [],
  checkoutLoading: false,
  checkoutStatus: 'review',
  recipientName: '',
  recipientEmail: '',
  recipientPhone: '',
  recipientAddress: '',
  recipientInfoUpdate: false,
};

const getters = {
  // [ 購物車總金額 ]
  totalPrice(state, getters) {
    return getters.cart.reduce((total, cur) => total + cur.price, 0);
  },

  // [ 購物車比對確認後結果 ]
  cart(state, getters, rootState) {
    const cart = state.clientCart.map((item) => {
      const product = rootState.products.find(data => data.id === item.id);
      if (product !== undefined) {
        return {
          id: product.id,
          image: product.imageUrl,
          title: product.title,
          price: product.price * item.quantity,
          quantity: item.quantity,
          color: item.color,
        };
      }
      return false;
    });
    return cart.filter(item => item !== false);
  },
};

const mutations = {
  // [ 獲取 localStorage 中的購物車 ]
  getLocalStorage(state) {
    if (localStorage.getItem('clientCart')) {
      try {
        state.clientCart = JSON.parse(localStorage.getItem('clientCart'));
      } catch (e) {
        localStorage.removeItem('clientCart');
      }
    }
  },

  // [ 若購物車為空則PUSH進陣列 ]
  pushProductToCart(state, payload) {
    state.clientCart.push(payload);
    const parsed = JSON.stringify(state.clientCart);
    localStorage.setItem('clientCart', parsed);
  },

  // [ 購物車產品數量 +1 ]
  incrementItemQuantity(state, { id, color }) {
    const cartItem = state.clientCart.find(item => (
      item.id === id && item.color === color
    ));
    cartItem.quantity += 1;
    const parsed = JSON.stringify(state.clientCart);
    localStorage.setItem('clientCart', parsed);
  },

  // [ 購物車產品數量 -1 ]
  decrementItemQuantity(state, { id, color }) {
    const cartItem = state.clientCart.find(item => (
      item.id === id && item.color === color
    ));
    cartItem.quantity -= 1;
    const parsed = JSON.stringify(state.clientCart);
    localStorage.setItem('clientCart', parsed);
  },

  // [ 刪除購物車內特定產品 ]
  deleteProductFromCart(state, { id, color }) {
    let idx = '';
    state.clientCart.forEach((item, index) => {
      if (item.id === id && item.color === color) {
        idx = index;
      }
    });
    state.clientCart.splice(idx, 1);
    const parsed = JSON.stringify(state.clientCart);
    localStorage.setItem('clientCart', parsed);
  },

  // [ 購物車重置 ]
  resetCart(state) {
    state.clientCart = [];
    localStorage.removeItem('clientCart');
  },

  // [ 設定結帳狀態 ]
  setCheckoutStatus(state, payload) {
    state.checkoutStatus = payload;
  },

  // [ 設定結帳畫面讀取狀態 ]
  setCheckoutLoading(state, payload) {
    state.checkoutLoading = payload;
  },

  // [ 設定收件人資訊 (與cartPayment 雙向綁定) ]
  setRecipientName(state, payload) {
    state.recipientName = payload;
  },

  setRecipientEmail(state, payload) {
    state.recipientEmail = payload;
  },

  setRecipientPhone(state, payload) {
    state.recipientPhone = payload;
  },

  setRecipientAddress(state, payload) {
    state.recipientAddress = payload;
  },

  setRecipientInfoUpdate(state, payload) {
    state.recipientInfoUpdate = payload;
  },
};

const actions = {
  // [ 新增產品至客戶端購物車 ]
  addProductToCart({ state, commit }, product) {
    const cartItem = state.clientCart.find(
      item => item.id === product.id
      && item.color === product.color,
    );
    if (!cartItem) {
      commit('pushProductToCart', product);
    } else {
      commit('incrementItemQuantity', cartItem);
    }
  },

  // [ 獲取結帳收件人資訊 ]
  getRecipientDetail({ rootState, commit }) {
    commit('setCheckoutLoading', true);
    db.collection('users').doc(rootState.user.userUID).get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          commit('setRecipientName', data.name);
          commit('setRecipientEmail', data.email);
          commit('setRecipientPhone', data.phone);
          commit('setRecipientAddress', data.address);
          commit('setRecipientInfoUpdate', false);
          commit('setCheckoutLoading', false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // [ 結帳 ]
  checkout({ rootState, getters, commit }) {
    const userData = db.collection('users').doc(rootState.user.userUID);
    const orderData = db.collection('orders').doc();
    const today = new Date().getTime();
    // 要推送至訂單資料庫的內容
    const orderDetail = {
      products: getters.cart,
      totalPrice: getters.totalPrice,
      recipient: {
        name: state.recipientName,
        email: state.recipientEmail,
        phone: state.recipientPhone,
        address: state.recipientAddress,
      },
      createdAt: today,
      paymentStatus: '已付款',
      uid: rootState.user.userUID,
      orderId: orderData.id,
    };
    // 若用戶有勾選更新收件人資料的話，將資料更新到用戶資料庫
    if (state.recipientInfoUpdate) {
      userData.update({
        name: state.recipientName,
        email: state.recipientEmail,
        phone: state.recipientPhone,
        address: state.recipientAddress,
      });
    }
    // 將訂單推送至資料庫
    orderData.set(orderDetail).then(() => {
      commit('resetCart');
      commit('setCheckoutStatus', 'complete');
    }).catch((error) => {
      console.log(error);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
