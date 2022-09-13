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
    {
        path: '/material',
        component: Layouts,
        redirect: '/material/index',
        meta: { title: '材质' },
        children: [
            { path: '/material/index', component: import('@/views/Material/BasiceMaterial/index.vue'), meta: { title: '基础材质' } },
            { path: '/material/standardnaterial', component: import('@/views/Material/StandardMaterial/index.vue'), meta: { title: '标准网格材质' } },
            { path: '/material/envmterial', component: import('@/views/Material/EnvMaterial/index.vue'), meta: { title: '环境贴图' } },
        ],
    },
    {
        path: '/light',
        component: Layouts,
        redirect: '/light/index',
        meta: { title: '灯光' },
        children: [
            { path: '/light/index', component: import('@/views/Light/Home/index.vue'), meta: { title: '平行光' } },
            { path: '/light/spotLight', component: import('@/views/Light/SpotLight/index.vue'), meta: { title: '聚光点' } },
            { path: '/light/point', component: import('@/views/Light/Point/index.vue'), meta: { title: '点光源' } },
        ],
    },
    {
        path: '/particle',
        component: Layouts,
        redirect: '/particle/index',
        meta: { title: '粒子' },
        children: [
            { path: '/particle/index', component: import('@/views/Particle/Index/index.vue'), meta: { title: '点材质' } },
            { path: '/particle/attribute', component: import('@/views/Particle/Attribute/index.vue'), meta: { title: '点材质属性' } },
            { path: '/particle/random', component: import('@/views/Particle/Rand/index.vue'), meta: { title: '随机生成粒子点' } },
        ],
    },
    {
        path: '/raycaster',
        component: Layouts,
        redirect: '/raycaster/index',
        meta: { title: '光线投射与鼠标拾取' },
        children: [{ path: '/raycaster/index', component: import('@/views/Raycaster/index.vue'), meta: { title: '光线投射与鼠标拾取' } }],
    },
    {
        path: '/shader',
        component: Layouts,
        redirect: '/shader/index',
        meta: { title: '着色器' },
        children: [
            { path: '/shader/index', component: import('@/views/Shader/ShaderMaterial/index.vue'), meta: { title: 'shaderMaterial' } },
            { path: '/shader/rawShaderMaterial', component: import('@/views/Shader/RawShaderMaterial/index.vue'), meta: { title: 'rawShaderMaterial' } },
            { path: '/shader/rawShaderMaterial2', component: import('@/views/Shader/RawShaderMaterial2/index.vue'), meta: { title: '着色器材质' } },
            { path: '/shader/rawShaderMaterial3', component: import('@/views/Shader/RawShaderMaterial3/index.vue'), meta: { title: '利用uv实现图形' } },
            { path: '/shader/rawShaderMaterial4', component: import('@/views/Shader/RawShaderMaterial4/index.vue'), meta: { title: '利用uv实现图形2' } },
        ],
    },
    {
        path: '/audio',
        component: Layouts,
        redirect: '/audio/index',
        meta: { title: '音频' },
        children: [{ path: '/audio/index', component: import('@/views/Audio/Home/index.vue'), meta: { title: '音频' } }],
    },
    { path: '/404', component: NotFoun },
    { path: '/:pathMatch(.*)', redirect: '/404' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
