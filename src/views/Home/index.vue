
<template>
    <div class="box" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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


    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    const animate = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(animate);
        control.update();
    }
    animate();
})
</script>

<style>
.box {
    width: 100%;
    height: 100%;
}
</style>