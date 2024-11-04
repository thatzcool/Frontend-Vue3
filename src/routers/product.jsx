import {useTokenStore} from "../stores/tokenStore.jsx";


const productRouter = {
    path: '/product',
    component: () => import('../pages/product/IndexPage.vue'),
    children: [
        {path: '', redirect: '/product/list'},
        {path: 'list', component: () => import('../pages/product/ListPage.vue'),},
        {path: 'register', component: () => import('../pages/product/RegisterPage.vue'),},
        {path: 'view/:pno', component: () => import('../pages/product/ViewPage.vue'),},
        {path: 'modify/:pno', component: () => import('../pages/product/ModifyPage.vue'),},

    ],
    beforeEnter: (to, from, next) => {
        console.log("check login with cookie")

        const {savedMid} = useTokenStore()

        if(savedMid()){
            return next()
        }else {

            return next('/member/login')
        }
    }
}


export default productRouter