<template>
    <div class="preset-title">
        <div class="preset-location">
            <div class="preset-bank">1</div>
            <div class="preset-letter">A</div>
        </div>
        <div class="preset-name" >{{ preset.name }}</div>
    </div>
    
    <div v-if="preset" class="grid">
        <chain :chain="preset.chains[0]" @show-params="showParams"></chain>
        <chain :chain="preset.chains[1]" @show-params="showParams"></chain>
        <chain :chain="preset.chains[2]" @show-params="showParams"></chain>
        <chain :chain="preset.chains[3]" @show-params="showParams"></chain>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chain from '@/components/PresetChain.vue';

export default defineComponent({
    name: 'PresetGrid',
    components: {
        Chain
    },

    emits: ['show-params'],

    props: {
        preset: {
            type: Object,
            required: true
        }
    },

    methods: {
        showParams(model: any, modelData: any){
            this.$emit('show-params', model, modelData);
        }
    },
})
</script>

<style>
.grid {
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    width: 100%;
    height: 400px;
    
    /* Space the content evenly vertical */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    margin-bottom: 2rem;

}

.preset-name {
    text-align: start;
}

.preset-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    padding-bottom: 1rem;
}

.preset-location {
    display: flex;
    flex-direction: row;
    margin-right: 1rem;
}
    
</style>