<template>
    <div class="chain">
        <!-- The chain contains the input block, the line acros the screen, and the output block -->
        <button class="io-block">+</button>
        <div class="track">
            <div class="chain-objects" v-for="chainObject in chainObjects" :key="chainObject">
                <PresetBlock 
                    v-if="chainObject.hash !== undefined"
                   :model="chainObject"
                   @show-params="showParams">
                </PresetBlock>
                <div 
                    class="control-point" 
                    v-else-if="chainObject.type == 'controlPoint'" :class="{ isControlpoint: chainObject.value > 0}">
                    {{ chainObject.loc }}
                </div>
            </div>
        </div>
        

        <hr class="row-line">

        <button class="io-block">+</button>
       
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
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

    emits: ['show-params'],

    computed: {
        chainObjects() {
            const controlPoint = {"type": "controlPoint", "value": 0, "loc": 0};
            const models = this.chain.models;
            const chainSplitControlPoints = this.chain.splitControlPoints;

            let chainObjects = [controlPoint];

            models.forEach((model, i) => {
                chainObjects.push(model);
                let cp = {"type": "controlPoint", "value": 0, "loc": i + 1};

                const splitControlPoint = chainSplitControlPoints.find(cp => cp.split === i + 1 || cp.mix === i + 1);
                if (splitControlPoint) {
                    cp.value = splitControlPoint.split === i + 1 ? 1 : 2;
                }

                chainObjects.push(cp);
            });

            return chainObjects;
        }
    },

    methods:{
        showParams(model: any, modelData: any){
            this.$emit('show-params', model, modelData);
        }
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
    .row-line {
        position: absolute;
        width: calc(100% - 8rem);
        margin: 0;
        z-index: 0;
        border: 1px solid rgb(255, 255, 255);
    }
    .track {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        height: 4rem;
        z-index: 1;

        .isControlpoint{
            color: yellow;
        }
    }

    
}







</style>
