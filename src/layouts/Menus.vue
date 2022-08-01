
<template>
    <template v-for="item in menus">
        <el-sub-menu :index="item.path" unique-opened v-if="item.children && item.children.length > 1">

            <template #title>
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>{{ item?.meta?.title }}</span>
            </template>
            <Menus :menus="item.children" />
        </el-sub-menu>
        <el-menu-item :index="item.children[0].path" v-else-if="item.children && item.children.length == 1">
            <el-icon>
                <icon-menu />
            </el-icon>
            <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </el-menu-item>
        <el-menu-item :index="item.path" v-else>

            <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </el-menu-item>
    </template>

</template>
<script setup lang='ts'>
import { defineProps, toRefs, PropType, ref } from 'vue'


import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const props = defineProps({
    menus: {
        type: Array as PropType<any>,
        required: true
    }
});


const { menus } = toRefs(props)
</script>