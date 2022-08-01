import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Layouts from '@/layouts/index.vue';
import NotFoun from '@/components/404/index.vue';

const routes: readonly RouteRecordRaw[] = [
    { path: '/', redirect: '/home/index' },
    { path: '/home', component: Layouts, redirect: '/home/index', meta: { title: 'THREE初始化' }, children: [{ path: '/home/index', component: import('@/views/Home/index.vue') }] },
    { path: '/gsap', component: Layouts, redirect: '/gsap/index', meta: { title: 'Gasp动画' }, children: [{ path: '/gsap/index', component: import('@/views/Gsap/index.vue') }] },
    { path: '/gui', component: Layouts, redirect: '/gui/index', meta: { title: '可视化图形库' }, children: [{ path: '/gui/index', component: import('@/views/Gui/index.vue') }] },
    {
        path: '/boxgeometory',
        component: Layouts,
        redirect: '/boxgeometory/index',
        meta: { title: '几何体' },
        children: [
            { path: '/boxgeometory/index', component: import('@/views/BoxGeometory/index.vue'), meta: { title: '立方缓冲几何体' } },
            { path: '/buffergeometry/index', component: import('@/views/BufferGeometry/index.vue'), meta: { title: '缓冲区几何体' } },
        ],
    },
    { path: '/404', component: NotFoun },
    { path: '/:pathMatch(.*)', redirect: '/404' },
 
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
