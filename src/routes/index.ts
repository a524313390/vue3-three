import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layouts from '@/layouts/index.vue';
import NotFoun from '@/components/404/index.vue';

const routes: readonly RouteRecordRaw[] = [
    { path: '/', redirect: '/home/index' },
    { path: '/home', component: Layouts, redirect: '/home/index', meta: { title: '初始化地图' }, children: [{ path: '/home/index', component: import('@/views/Home/index.vue') }] },
    { path: '/404', component: NotFoun },
    { path: '/:pathMatch(.*)', redirect: '/404' },
    // { path: '/:pathMatch(.*)', redirect: '/404' },
];
// const notFound = { path: '/:pathMatch(.*)', redirect: '/404' };
// const privateRouter = [
//     {
//         path: '/customcontrol',
//         component: Layouts,
//         redirect: '/customcontrol/zoom',
//         meta: { title: '自定义控件', icon: '' },
//         children: [{ path: '/customcontrol/zoom', component: import('@/views/CustomControl/Zoom/index.vue'), meta: { title: '自定义缩放控件' } }],
//     },
//     {
//         path: '/layercontrol',
//         component: Layouts,
//         redirect: '/layercontrol/index',
//         meta: { title: '图层控制', icon: '' },
//         children: [{ path: '/layercontrol/index', component: import('@/views/LayerControl/index.vue'), meta: { title: '图层控制' } }],
//     },
// ];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// let load = true;
// router.beforeEach((to, from, next) => {
//     if (load) {
//         privateRouter.forEach(item => {
//             router.addRoute(item.path, item);
//         });
//         router.addRoute('404', NotFoun);
//         load = false;
//         next({ path: to.path });
//     } else {
//         next();
//     }
// });
export default router;
