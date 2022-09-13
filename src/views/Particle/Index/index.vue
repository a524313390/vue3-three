
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import doorImg from '@/assets/images/textures/door/color.jpg';
import alpha from '@/assets/images/textures/door/alpha.jpg';
import height from '@/assets/images/textures/door/height.jpg';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as dat from 'dat.gui';

// console.log(camearObj, 'camearObj');

const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    const shper = new THREE.SphereGeometry(1, 10, 10);
    const material = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true });
    const mesh = new THREE.Mesh(shper, material)
    scene.add(mesh)
    const pointMaterial = new THREE.PointsMaterial({ size: 0.1 });
    const points = new THREE.Points(mesh.geometry, pointMaterial)
    scene.add(points)
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