

const memberRouter = {

    path: '/member',
    component: () => import('../pages/member/IndexPage.vue'),
    redirect: '/member/login',
    children: [
        {path: 'login', component: () => import('../pages/member/LoginPage.vue')},
        {path: 'mypage', component: () => import('../pages/member/MyPage.vue')},
    ]

}


export default memberRouter