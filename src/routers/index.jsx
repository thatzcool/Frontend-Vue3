import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import productRouter from "./product.jsx";
import memberRouter from "./member.jsx";


const routes = [
    {path:'', component: () => import('../pages/MainPage.vue')},
    productRouter,
    memberRouter
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router