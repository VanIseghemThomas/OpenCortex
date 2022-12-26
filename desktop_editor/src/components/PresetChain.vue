<template>
    <div class="chain">
        <!-- The chain contains the input block, the line acros the screen, and the output block -->
        <button class="io-block">+</button>
        <div class="track">
            <PresetBlock v-for="model in chain.models" :key="model" :model="model">
            </PresetBlock>
        </div>
        <button class="io-block">+</button>

        <hr class="line">
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PresetBlock from '@/components/PresetBlock.vue';

export default defineComponent({
    components: {
        PresetBlock
    },
    props: {
        chain: {
            type: Object,
            required: true
        }
    },
    mounted(){
        console.log(this.chain.models);
    }
})    
</script>

<style scoped lang="scss">
.chain {
    /* Space the content evenly horizontal */
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 2rem;

    .io-block {
        width: 3rem;
        height: 4rem;
        background-color: rgb(41, 41, 41);
        color: rgb(255, 255, 255);
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        border: none;
        z-index: 1;
    }
    .io-block:hover {
        background-color: rgb(255, 255, 255);
        color: rgb(41, 41, 41);
        cursor: pointer;
    }
    .line {
        position: absolute;
        border: 1px solid rgb(255, 255, 255);
        width: calc(100% - 8rem);
        margin: 0;
        z-index: 0;
    }
    .track {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    
        width: 100%;
        height: 4rem;
        margin: 0 2rem;
    }
}







</style>