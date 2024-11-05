// router/product.js
import { useTokenStore } from "../stores/tokenStore.js";

const productRouter = {
  path: '/product',
  component: () => import('../pages/product/IndexPage.vue'),
  children: [
    { path: '', redirect: '/product/list' },
    { path: 'list', component: () => import('../pages/product/ListPage.vue') },
    { path: 'register', component: () => import('../pages/product/RegisterPage.vue') },
    { path: 'view/:pno', component: () => import('../pages/product/ViewPage.vue') },
    { path: 'modify/:pno', component: () => import('../pages/product/ModifyPage.vue') },
  ],
  beforeEnter: (to, from, next) => {
    console.log("Checking login status with token");

    const tokenStore = useTokenStore();
    const isLoggedIn = tokenStore.savedMid();

    if (isLoggedIn) {
      next();
    } else {
      next('/member/login');
    }
  }
};

export default productRouter;
