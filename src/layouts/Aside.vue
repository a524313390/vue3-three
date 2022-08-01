
<template>
    <el-menu active-text-color="#fff" background-color="#001529" class="el-menu-vertical-demo" router text-color="#fff"
        :default-active="defaultOpen" :default-openeds="[defaultOpen]">

        <Menus :menus="menus" />
    </el-menu>
</template>

<script setup lang='ts'>
import { useRoute, useRouter, } from 'vue-router'
import Menus from './Menus.vue';

import { generateMenus } from '@/utils';
import { ref } from 'vue';

const router = useRouter();
const menus = generateMenus(router.getRoutes());

const route = useRoute();


const defaultOpen = ref(route.path);

</script>


<style scoped  lang="less">
.el-aside {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>