
<template>
    <div class="box" ref="domRef" style="width:100%;height:100%;"></div>
</template>

<script setup lang='ts'>
import * as THREE from 'three';
import { onMounted, ref } from 'vue';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import map3 from '@/assets/audio/野狼.mp3'
const domRef = ref();
onMounted(() => {
    let dom = domRef.value;
    if (!dom) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, dom.clientWidth / dom.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 800)
    scene.add(camera);


    const length = 128;
    const group = new THREE.Group();
    const material = new THREE.MeshPhongMaterial({
        // color: 'red',
        color: 0x0000ff
    })
    for (let index = 0; index < length / 2; index++) {
        const box = new THREE.BoxBufferGeometry(10, 100, 10);

        const mesh = new THREE.Mesh(box, material);
        mesh.position.set(20 * index - length / 2 * 10, 0, 0);

        group.add(mesh);
    }

    scene.add(group);


    const listener = new THREE.AudioListener() //监听者
    camera.add(listener);
    const audio = new THREE.Audio(listener); //非位置音频对象
    const audioLoader = new THREE.AudioLoader(); //音频加载器
    audioLoader.load(map3, AudioBuffer => {

        audio.setBuffer(AudioBuffer); // 音频缓冲区对象关联到音频对象audio
        audio.setLoop(true); //是否循环
        audio.setVolume(1); //音量
        audio.play(); //播放

    })


    const analyser = new THREE.AudioAnalyser(audio, 2 * length);




    console.log(audio, 'audio');



    //环境光
    const ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    //点光源
    const point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    const pointHelper = new THREE.PointLightHelper(point);
    scene.add(pointHelper);



    const axseHelper = new THREE.AxesHelper(100);
    scene.add(axseHelper)


    const size = 1000;
    const divisions = 50;

    const gridHelper = new THREE.GridHelper(size, divisions);
    scene.add(gridHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(dom.clientWidth, dom.clientHeight);
    renderer.render(scene, camera);
    dom.appendChild(renderer.domElement);


    const control = new OrbitControls(camera, renderer.domElement);
    control.enableDamping = true;



    const animate = () => {


        //获取平均频率
        // const data = analyser.getFrequencyData();
        if (analyser) {
            // 获得频率数据N个
            const arr = analyser.getFrequencyData();



            // 遍历组对象，每个网格子对象设置一个对应的频率数据
            group.children.forEach((elem: any, index) => {
                elem.scale.y = arr[index] / 80
                elem.material.color.r = arr[index] / 200;
            });
        }

        renderer.render(scene, camera);
        control.update();
        requestAnimationFrame(animate)


    }
    animate();

})
</script>

