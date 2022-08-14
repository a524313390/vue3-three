
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import doorImg from '@/assets/images/textures/door/color.jpg';
import alpha from '@/assets/images/textures/door/alpha.jpg';
import envImg1 from '@/assets/images/textures/environmentMaps/1/px.jpg';
import envImg2 from '@/assets/images/textures/environmentMaps/1/nx.jpg';
import envImg3 from '@/assets/images/textures/environmentMaps/1/py.jpg';
import envImg4 from '@/assets/images/textures/environmentMaps/1/ny.jpg';
import envImg5 from '@/assets/images/textures/environmentMaps/1/pz.jpg';
import envImg6 from '@/assets/images/textures/environmentMaps/1/nz.jpg';

import * as dat from 'dat.gui';
const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    const cubeLoader = new THREE.CubeTextureLoader();
    const envMap = cubeLoader.load([envImg1, envImg2, envImg3, envImg4, envImg5, envImg6])
    //给场景添加背景
    scene.background = envMap;
    //给场景中所有的物体添加默认的环境贴图
    scene.environment = envMap;
    const spher = new THREE.SphereGeometry(1, 200, 200);
    //metalness  材质与金属的相似度
    //roughness材质的粗糙程度。0.0表示平滑的镜面反射
    const material = new THREE.MeshStandardMaterial({ metalness: 0.7, roughness: 0.1, });
    const mesh = new THREE.Mesh(spher, material);
    scene.add(mesh);
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    const pointLight = new THREE.DirectionalLight(0xffffff, 0.5);
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(domRef.value.clientWidth, domRef.value.clientHeight);
    domRef.value.appendChild(renderer.domElement);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    const animate = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);
        control.update();
    }
    animate();




    window.onresize = function () {
        // 重置渲染器输出画布canvas尺寸
        if (!domRef.value) return;
        renderer.setSize(domRef.value?.clientWidth, domRef.value?.clientHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = domRef.value.clientWidth / domRef.value.clientHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
    };
})
</script>