// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import productRouter from "./product.js";
import memberRouter from "./member.js";

const routes = [
  {
    path: '',
    component: () => import('../pages/MainPage.vue')
  },
  productRouter,
  memberRouter
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
