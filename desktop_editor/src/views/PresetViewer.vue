

<template>
    <h1>Preset viewer</h1>
    <div class="content-container">
        <PresetGrid 
            v-if="preset" 
            :preset="preset"
        ></PresetGrid>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PresetGrid from '@/components/PresetGrid.vue';
import store from '@/store';

export default defineComponent({
    name: 'PresetBrowserView',
    components: {
        PresetGrid
    },

    data(){
        return {
            preset: null as any
        }
    },

    async mounted() {
        this.preset = store.state.currentPreset;
    },
    methods: {
    },
})

</script>

<style scoped>
.content-container {
    max-width: 1200px;
    margin: 0 auto;
}
</style>