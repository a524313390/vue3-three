
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import pointImg from '@/assets/images/textures/particles/1.png'
import * as dat from 'dat.gui';
import { useGui } from '@/hooks/gui';

const gui = useGui();
const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;

    const scene = new THREE.Scene();
    gui.value = new dat.GUI();
    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);
    scene.add(camera);

    const loader = new THREE.TextureLoader();
    const shper = new THREE.SphereGeometry(3, 30, 30);
    const material = new THREE.MeshBasicMaterial({ transparent: true });
    const mesh = new THREE.Mesh(shper, material)
    // scene.add(mesh)

    const textureloader = loader.load(pointImg)
    //depthWrite  设置材质如果重合是否叠加
    //blending  设置叠加模式
    const pointMaterial = new THREE.PointsMaterial({ size: 0.1, map: textureloader, transparent: true, alphaMap: textureloader, color: 0xfff000, depthWrite: false, blending: THREE.AdditiveBlending });

    const points = new THREE.Points(mesh.geometry, pointMaterial);


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