<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="200px">
                <Aside />
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script setup  lang="ts">
import Aside from './Aside.vue'

</script>
<style  scoped  lang="less">
.common-layout {
    width: 100%;
    height: 100%;

    .el-container {
        width: 100%;
        height: 100%;
    }

    /deep/ .is-active {
        background-color: #1890FF !important;
        color: '#fff'
    }

    .el-main {
        position: relative;
    }
}
</style>