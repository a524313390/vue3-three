import { onMounted, onUnmounted, ref } from 'vue';
import dat from 'dat.gui';

export const useGui = () => {
    const gui = ref<dat.GUI>();
    onMounted(() => {
        gui.value = new dat.GUI();
    });
    onUnmounted(() => {
        gui.value?.destroy();
    });
    return gui;
};
