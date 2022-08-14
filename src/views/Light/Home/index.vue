
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


import * as dat from 'dat.gui';
const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;
    const guiRef = ref<dat.GUI>();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    scene.add(camera);
    const spher = new THREE.SphereGeometry(1, 100, 100);
    const material = new THREE.MeshStandardMaterial({ metalness: 0.7, metalness: 0.1 });
    const mesh = new THREE.Mesh(spher, material);
    mesh.castShadow = true;
    scene.add(mesh);

    const plane = new THREE.PlaneGeometry(10, 10);

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

    const direct = new THREE.DirectionalLight(0xffffff, 0.5);
    direct.castShadow = true;
    //设置阴影的模糊度
    direct.shadow.radius = 20;
    //设置阴影贴图分辨率
    direct.shadow.mapSize.set(4096, 4096);
    direct.position.set(10, 10, 10);
    //设计平行相机可以照射的范围
    direct.shadow.camera.near = 0;//距离光源的位置
    direct.shadow.camera.far = 500;//光源可照射多远
    direct.shadow.camera.top = -3;//顶部
    direct.shadow.camera.bottom = 3;//低部
    direct.shadow.camera.left = 3;//顶部
    direct.shadow.camera.right = -10;//顶部
    scene.add(direct)

    const gui = new dat.GUI();
    guiRef.value = gui;
    gui.add(direct.shadow.camera, 'near').min(0).max(20).step(1).name('近端near').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();
        console.log(direct.shadow.camera, 'direct.shadow.camera');

    })
    gui.add(direct.shadow.camera, 'far').min(0).max(500).step(10).name('远端far').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();
        console.log(direct.shadow.camera, 'direct.shadow.camera');

    })
    gui.add(direct.shadow.camera, 'top').min(-100).max(200).step(1).name('顶部top').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();
        console.log(direct.shadow.camera, 'direct.shadow.camera');

    })
    gui.add(direct.shadow.camera, 'bottom').min(-100).max(200).step(1).name('底部bottom').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();
        console.log(direct.shadow.camera, 'direct.shadow.camera');

    })
    gui.add(direct.shadow.camera, 'left').min(-100).max(200).step(1).name('左边left').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();
        console.log(direct.shadow.camera, 'direct.shadow.camera');

    })
    gui.add(direct.shadow.camera, 'right').min(-100).max(200).step(1).name('右边right').onChange(() => {
        direct.shadow.camera.updateProjectionMatrix();


    })
    const helper = new THREE.DirectionalLightHelper(direct, 5);
    scene.add(helper);
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
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
</script>