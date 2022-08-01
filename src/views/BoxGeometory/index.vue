
<template>
    <div class="box" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
const domRef = ref();
onMounted(() => {
    let dom = domRef.value;
    if (!dom) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, dom?.clientWidth / dom?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    const geometory = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const mesh = new THREE.Mesh(geometory, material);
    scene.add(mesh);

    const axseHelper = new THREE.AxesHelper(10);
    scene.add(axseHelper)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    renderer.render(scene, camera)
    dom.appendChild(renderer.domElement);

    gsap.to(mesh.position, { x: 5, duration: 1, yoyo: true, repeat: -1 })

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    const animate = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);
        control.update();
    }
    animate();


    // onresize 事件会在窗口被调整大小时发生
    window.onresize = function () {
        // 重置渲染器输出画布canvas尺寸
        if (!dom) return;
        renderer.setSize(dom?.clientWidth, dom?.clientHeight);
        // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
        camera.aspect = dom.clientWidth / dom.clientHeight;
        // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
        // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
        // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
        camera.updateProjectionMatrix();
    };
})
</script>

<style>
.box {
    width: 100%;
    height: 100%;
}
</style>