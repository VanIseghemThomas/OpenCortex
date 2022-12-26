<template>
    <div class="block">
        <button class="block-btn" 
            :class="{ isEmpty: model.hash == 0 }"
            :style="{ background: blockColor }">
            <!-- <img src="rsquare.png" alt="block"> -->
            {{ modelData.model._attributes.name }}
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import store from '@/store';

export default defineComponent({
    props: {
        model: {
            type: Object,
            required: true
        },
    },

    data(){
        return {
            modelData: {} as any,
            blockColor: "rgb(0, 162, 255)",

            blockColorLut: {
                "Guitar Overdrive": "yellow",
                "Guitar Amplifier": "red",
                "Bass Amplifier": "red",
                "Bass Overdrive": "yellow",
                "Equalizer": "CornflowerBlue",
                "Compressor": "green",
                "Delay": "white",
                "Modulation": "purple",
                "Reverb": "white",
                "Wah": "white",
                "Splitter": "white",
                "Mixer": "white",
                "Cabsim Guitar": "CornflowerBlue",
                "FX Loop": "white",
                "Neural Capture": "gray",
                "Tuner": "white",
                "Utility": "white",
                "Pitch": "yellow",
                "Utility_Deprecated": "black",
                "Neural Capture Internal": "black",
                "Cabsim Bass": "CornflowerBlue",
                "Internal Routing": "black",
                "Lane output control": "black",
                "Filter": "white",
                "Tempo control": "black",
                "Morph": "white",
                "Loopers": "red",
                "InputGateControl": "black",
            } as any
        }
    },

    created(){
        this.modelData = this.getModelFromRepo(this.model.hash);
        this.setBlockColor();
    },

    methods: {
        getModelFromRepo(hash: number): any{
            
            const modelRepo = store.state.modelRepo as any;
            //const model = modelRepo.find((model) => model.hash == hash);
            let category;
            let model = {
                _attributes: {
                    id: hash.toString(),
                }
            };

            if(hash != 0){
                for (let i = 0; i < modelRepo.Category.length; i++){
                    const repoCategory = modelRepo.Category[i];
                    const categoryModels: any = repoCategory.Model;

                    
                    if(categoryModels == undefined) {
                        if(repoCategory._attributes.id == hash){
                            console.log("undefined", repoCategory, hash)
                            category = "Tuner";
                            model = repoCategory;
                            break;
                        }
                    }

                    else{

                        // Check if categoryModels is an object or an array
                        if(categoryModels._attributes != undefined){
                            if(categoryModels._attributes.id == hash){
                                category = repoCategory;
                                model = categoryModels;
                                break;
                            }
                        }

                        // Check if the categoryModels object contains an array
                        for (let j = 0; j < categoryModels.length; j++){
                            
                        
                            if(categoryModels[j]._attributes.id == hash){
                                category = repoCategory;
                                model = categoryModels[j]
                                break;
                            }
                        }
                    }
                }
            }
            
            return {
                model: model,
                category: category
            };
        },

        setBlockColor(){
            // Check the model category
            if(this.modelData.category){
                const category = this.modelData.category._attributes.name;
                this.blockColor = this.blockColorLut[category];
            }
            else{
                this.blockColor = "rgba(0,0,0,0)";
            }
        }
    }
});
</script>

<style scoped lang="scss">
.block{
    width: 4rem;
    height: 4rem;
    

    border-radius: 1rem;

    justify-content: center;
    align-items: center;

    border: none;
    padding: 0;
    z-index: 1;

    .block-btn{
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        border: none;
        background-color: rgba(0, 162, 255, 0);
        font-size: 1rem;

        &:hover{
            cursor: pointer;
            transform: scale(1.1);
            transition: transform 0.2s ease-in-out;
        }
        &.isEmpty:hover{
            background-color: rgba(0, 162, 255, 0.2) !important;
        }
    }

    img{
        display: flex;
        width: 100%;
        height: 100%;
    }
}
</style>