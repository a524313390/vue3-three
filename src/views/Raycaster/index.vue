
<template>
    <div class="box" style="width:100%;height:100%" ref="domRef"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, onUnmounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import pointImg from '@/assets/images/textures/particles/1.png'
import * as dat from 'dat.gui';
import { Mesh } from 'three';

const gui = ref<dat.GUI>()
const domRef = ref<HTMLDivElement>();
onMounted(() => {
    if (!domRef.value) return;

    const scene = new THREE.Scene();
    gui.value = new dat.GUI();
    const camera = new THREE.PerspectiveCamera(75, domRef.value?.clientWidth / domRef.value?.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);
    scene.add(camera);
    //创建1000个立方体
    const geometoyr = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ wireframe: true });
    const redMaterial = new THREE.MeshBasicMaterial({ color: "red" });
    const cubeList: THREE.Object3D<THREE.Event>[] = [];
    for (let i = -5; i <= 5; i++) {

        for (let j = -5; j <= 5; j++) {
            for (let z = -5; z <= 5; z++) {
                const cube = new Mesh(geometoyr, material);
                cube.position.set(i, j, z);
                cubeList.push(cube);
                scene.add(cube);
            }

        }
    }

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(domRef.value.clientWidth, domRef.value.clientHeight);
    domRef.value.appendChild(renderer.domElement);

    //创建投射光线对象
    const raycaster = new THREE.Raycaster();
    //监听鼠标的位置
    const mouse = new THREE.Vector2();
    const getOffsetLeft = function (obj: any) {
        let tmp = obj.offsetLeft;
        let val = obj.offsetParent;
        while (val != null) {
            tmp += val.offsetLeft;
            val = val.offsetParent;
        }
        return tmp;
    }


    const getOffsetTop = function (obj: any) {
        let tmp = obj.offsetTop;
        let val = obj.offsetParent;
        while (val != null) {
            tmp += val.offsetTop;
            val = val.offsetParent;
        }
        return tmp;
    }
    const onMounse = () => {
        renderer.domElement.addEventListener('mousemove', e => {

            const { clientX, clientY } = e;
            //如果threejs的元素全屏的，需要减去距离到左边和右边的距离，才是真实的位置
            const x = clientX - getOffsetLeft(domRef.value);
            const y = clientY - getOffsetTop(domRef.value);


            //在threejs中使用的是圆点坐标系，中心点是0,0,0,需要把鼠标位置换算成three位置
            // 当前鼠标位置/threejs元素的宽度和高度 得到0-1的比例值，threejs是-1到1的,需要换算
            // mouse.x = (clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.x = (x / renderer.domElement.clientWidth) * 2 - 1;
            //threejsy轴向下是正数
            // mouse.y = -((clientY / renderer.domElement.clientHeight) * 2 - 1);
            mouse.y = -((y / renderer.domElement.clientHeight) * 2 - 1);
            // console.log(mouse.x, mouse.y);
            raycaster.setFromCamera(mouse, camera);
            const result = raycaster.intersectObjects(cubeList);
            //设置所有的材质是白色的。
            cubeList.forEach((item: any) => {
                item.material = material;
            })
            if (result.length) {
                document.body.style.cursor = 'pointer'
                //只有选中的才是红色的
                result.forEach((item: any) => {
                    const clone = item.object.material.clone();
                    item.object.material = redMaterial;
                })

            } else {
                document.body.style.cursor = 'auto'
            }


        })
    }
    onMounse();
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

onUnmounted(() => {
    gui.value?.destroy();
})
</script>