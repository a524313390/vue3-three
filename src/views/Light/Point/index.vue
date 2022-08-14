
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';

import * as dat from 'dat.gui';
const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;
    const guiRef = ref<dat.GUI>();
    const scene = new THREE.Scene();
    const gui = new dat.GUI();
    guiRef.value = gui;
    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);
    scene.add(camera);
    const spher = new THREE.SphereGeometry(1, 100, 100);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.7, metalness: 0.1 });
    const mesh = new THREE.Mesh(spher, material);
    mesh.castShadow = true;
    scene.add(mesh);

    const plane = new THREE.PlaneGeometry(50, 50);

    const planeMaterail = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });
    const planMesh = new THREE.Mesh(plane, planeMaterail);
    planMesh.position.set(0, -1, 0)
    planMesh.rotation.x = Math.PI / 2;
    planMesh.receiveShadow = true;
    scene.add(planMesh)
    const axes = new THREE.AxesHelper(10);
    scene.add(axes);

    const ambien = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambien);
    const smallBall = new THREE.Mesh(new THREE.SphereBufferGeometry(0.1, 20, 20), new MeshBasicMaterial({ color: 0xff0000 }))
    smallBall.position.set(1, 1, 1);
    scene.add(smallBall);
    const pointLight = new THREE.PointLight(0xff0000, 0.5);
    pointLight.castShadow = true;

    //设置阴影贴图分辨率
    pointLight.shadow.mapSize.set(512, 512);

    smallBall.add(pointLight);


    const helper = new THREE.PointLightHelper(pointLight);
    scene.add(helper);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;
    renderer.setSize(domRef.value.clientWidth, domRef.value.clientHeight);
    domRef.value.appendChild(renderer.domElement);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    let clock = new THREE.Clock();
    const animate = () => {
        let time = clock.getElapsedTime();
        smallBall.position.x = Math.sin(time) * 3;
        smallBall.position.z = Math.cos(time) * 3;
        renderer.render(scene, camera)
        requestAnimationFrame(animate);
        control.update();
    }
    animate();


    onUnmounted(() => {
        guiRef.value?.destroy();

    })

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
import { MeshBasicMaterial } from 'three';
</script>