
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from './vertex.glsl';
import fragmentShader from './fragment.glsl';
import { useGui } from '@/hooks/gui';
import texImg from '@/assets/images/textures/ca.jpeg'
import dat from 'dat.gui';
const domRef = ref<HTMLDivElement>();
const gui = useGui();
onMounted(() => {
    if (!domRef.value) return;


    const scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();
    const img = loader.load(texImg);
    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    scene.add(camera);

    const params = {
        uSpeed: 10.0
    }
    gui.value?.add(params, 'uSpeed').name('改变频率').min(0).max(100)
    //原始着色器
    const shaderMaterial = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        // wireframe: true,
        side: THREE.DoubleSide,
        uniforms: {
            uTime: {
                value: 0
            },
            uTexture: {
                value: img
            },
            uSpeed: {
                value: params.uSpeed,
            }
        }

    });
    const plan = new THREE.PlaneBufferGeometry(1, 1, 64, 64)


    const cube = new THREE.Mesh(plan, shaderMaterial);
    scene.add(cube)
    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(domRef.value.clientWidth, domRef.value.clientHeight);
    domRef.value.appendChild(renderer.domElement);

    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;
    const clock = new THREE.Clock();
    const animate = () => {
        const t = clock.getElapsedTime();


        shaderMaterial.uniforms.uTime.value = t;
        shaderMaterial.uniforms.uSpeed.value = params.uSpeed;
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