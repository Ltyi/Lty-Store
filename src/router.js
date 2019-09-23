import Vue from 'vue';
import Router from 'vue-router';

// [ firebase ]
import { auth } from '@/db';

// [ 頁面組件 ]
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/Signup.vue';
import Checkout from '@/views/Checkout.vue';
import Orders from '@/views/Orders.vue';
import ProductList from '@/views/ProductList.vue';
import ProductInfo from '@/views/ProductInfo.vue';
import NotFound from '@/views/NotFound.vue';
import ProductCards from '@/components/Products/ProductCards.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Lty Store',
      },
    },
    {
      path: '/productlist',
      name: 'ProductList',
      component: ProductList,
      children: [
        {
          path: ':category/:brand',
          component: ProductCards,
          meta: {
            title: '產品列表 | Lty Store',
          },
        },
      ],
    },
    {
      path: '/productinfo/:id/:title',
      name: 'ProductInfo',
      component: ProductInfo,
      meta: {
        title: '產品明細 | Lty Store',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '會員登入 | Lty Store',
        requiresGuest: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: {
        title: '會員註冊 | Lty Store',
        requiresGuest: true,
      },
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
      meta: {
        title: '訂單結帳 | Lty Store',
        requiresAuth: true,
      },
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {
        title: '訂單查詢 | Lty Store',
        requiresAuth: true,
      },
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      meta: {
        title: '查無此頁面 | Lty Store',
      },
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],

  // [ 切換路由後將視窗導引至頂部 ]
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// [ 路由導航設定]
router.beforeEach((to, from, next) => {
  // 設定頁面標題
  document.title = to.meta.title;
  // 檢查該路由是否需要登入
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.currentUser) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (auth.currentUser) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
