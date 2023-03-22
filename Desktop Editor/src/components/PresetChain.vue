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

    emits: ['show-params'],

    data(){
        return{
            chainObjects: [] as any
        }
    },
    mounted(){
        const models: any = this.chain.models;
        const controlPoint = {"type": "controlPoint", "value": 0, "loc": 0};
        const chainSplitControlPoints = this.chain.splitControlPoints;

        this.chainObjects.push(controlPoint);
        for(let i = 0; i < models.length; i++){
            this.chainObjects.push(models[i]);
            let cp = {"type": "controlPoint", "value": 0, "loc": i};
            cp.loc = i + 1;

            for(let j = 0; j < chainSplitControlPoints.length; j++){
                if(chainSplitControlPoints[j].split == i + 1){
                    cp.value = 1;
                }
                else if(chainSplitControlPoints[j].mix == i + 1){
                    cp.value = 2;
                }
            }

            this.chainObjects.push(cp);
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