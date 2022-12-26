<template>
    <h1>Quad Cortex preset browser</h1>
    <!-- Add a list that contains all prestets -->
    <ul>
        <li v-for="sl in presets.Setlist" :key="sl">
            <h2>{{ PathToFile(sl._attributes.path)  }}</h2>
            <p v-for="p in sl.Preset" :key="p">
                <button 
                    v-if="p._attributes.path != ''" 
                    :data-path="p._attributes.path" 
                    @click="OpenPreset(p, sl.Preset)">
                    {{ PathToFile(p._attributes.path, true) }}
                </button>
            </p>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import xmljs from 'xml-js';
import protobuf from 'protobufjs';
import store from '@/store';

export default defineComponent({
    name: 'PresetBrowserView',
    components: {
    },
    data(){
        return {
            presets: {} as any,
            modelRepo: {} as any
        }
    },
    async mounted() {
        // First check if the environment is development or production
        // If the environment is development, load the example xml file
        // If the environment is production, load the xml file from the Quad Cortex
        let presetXMLPath = '';
        let modelRepoXMLPath = '';

        if(process.env.NODE_ENV === 'development'){
            presetXMLPath = 'setlist_example.xml';
            modelRepoXMLPath = 'ModelRepo[1.4.1].xml';
        } else {
            // The setlist file is an XML but doesn't contain the extension for some reason
            presetXMLPath = '/media/p4/Presets/setlists';
            modelRepoXMLPath = '/opt/neuraldsp/ModelRepo.xml';
        }

        console.log("Loading presets from: " + presetXMLPath);
        this.loadXML(presetXMLPath).then((json) => {
            this.presets = json.Setlists;
            console.log(this.presets);
        });

        console.log("Loading model repo from: " + modelRepoXMLPath);
        this.loadXML(modelRepoXMLPath).then((json) => {
            this.modelRepo = json.Models;
            store.dispatch('setModelRepo', this.modelRepo);
            console.log(this.modelRepo);
        });
    },
    methods: {
        async loadXML(presetXMLPath: string) {
            // Load the xml file from the presetXMLPath
            // Convert the xml to json
            let response = await axios.get(presetXMLPath);
            const xml = response.data;
            const json = xmljs.xml2json(xml, {compact: true, spaces: 4});
            
            // The json is a string, so we need to parse it
            const parsedJson = JSON.parse(json);

            return parsedJson;
        },

        objectToXML(object: any) {
            // Convert the object to xml
            // Return the xml
            const xml2 = xmljs.js2xml(object, {compact: true, spaces: 4});
            console.log(xml2);
        },

        PathToFile(path: string, removeExtension: boolean = false) {
            // Convert the path to a file
            // Return the file
            let file = path.split('/').pop();

            if (removeExtension) {
                return file!.split('.').shift();
            }
            return file;
        },

        async OpenPreset(preset: Object, setlist: Array<any>){
            const presetPath = (preset as any)._attributes.path;
            const presetLocation = this.GetPresetLocation(preset, setlist);
            // Go to the preset viewer and pass the presets as a prop
            // const decodedPreset = await this.DecodePreset(presetPath, presetLocation);
            this.DecodePreset("Vienna.pb", presetLocation).then((decodedPreset) => {
                console.log("decoded", decodedPreset)
                console.log("preset path: ", presetPath)
                store.dispatch('setSelectedPreset', decodedPreset);
                this.$router.push({
                    name: 'Preset viewer',
                });
            });
            //, params: { preset: decodedPreset } 

        },

        async DecodePreset(presetPath: string, presetLocation: any): Promise<any>{
            return new Promise((resolve, reject) => {
                protobuf.load('protos/Preset.proto', async (err, root) => {
                if (err) return reject(err);

                // Obtain a message type
                const Preset = root?.lookupType("BinaryPreset");
                
                // Get the .pb file Antartica.pb from the public folder and decode it
                // Do this without using the fs module
                const response = await fetch(presetPath);
                const arrayBuffer = await response.arrayBuffer();

                // Decode an Uint8Array (browser) or Buffer (node) to a message
                const message = Preset?.decode(new Uint8Array(arrayBuffer));

                let presetObject = message as any;

                presetObject.name = this.PathToFile(presetPath as any, true);
                presetObject.location = presetLocation;

                resolve(presetObject);
                });
            });
        },


        GetPresetLocation(preset: any, setlist: Array<any>){
            console.log("setlist", setlist)
            console.log("setlists", this.presets.Setlist)
            // Get the index of the preset in the setlist

            const presetIndex = setlist.indexOf(preset);
            let setlistIndex = 0;
            
            for(let i = 0; i < this.presets.Setlist.length; i++){
                if(this.presets.Setlist[i].Preset == setlist){
                    setlistIndex = i;
                }
            }

            // The presets are stored per 8 presets per bank
            // So we need to calculate the bank and the preset index
            // The preset index is the preset index % 8

            const presetIndexInBank = presetIndex % 8;
            // Convert the index to the letter in the alphabet
            const presetLetter = String.fromCharCode(65 + presetIndexInBank);

            // Every 8 presets the bank has to be increased by 1
            // The bank is the preset index / 8
            const bank = Math.floor(presetIndex / 8) + 1;

            return {
                bank: bank,
                preset: presetLetter,
                presetIndex: presetIndex,
                setlistIndex: setlistIndex
            };
        }
    },
})

</script>

<style scoped>
</style>