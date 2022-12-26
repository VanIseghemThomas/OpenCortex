

<template>
    <h1>Preset viewer</h1>
    <div class="content-container">
        <PresetGrid
            v-if="preset"
            :preset="preset"
            @show-params="showParams"
        ></PresetGrid>

        <div v-if="selectedModel">
            <div v-for="(param, index) in selectedModel.params" :key="param">
                <p>{{ selectedModelStructure.model.Parameter[index]._attributes.name }}</p>
                <input type="range" min="0" max="100" :value="param.paramValues[0].floatValue * 100" >
            </div>
        </div>
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
            preset: null as any,
            selectedModel: null as any,
            selectedModelStructure: null as any
        }
    },

    async mounted() {
        this.preset = store.state.currentPreset;
    },
    methods: {
        showParams(model: any, modelData: any){
            console.log(model, modelData);
            this.selectedModel = model;
            this.selectedModelStructure = modelData;
        }
    },
})

</script>

<style scoped lang="scss">
.content-container {
    max-width: 1200px;
    margin: 0 auto;

    .preset-grid{
        margin-bottom: 3rem;
    }
}
</style>