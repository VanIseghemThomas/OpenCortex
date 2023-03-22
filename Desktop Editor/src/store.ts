import { createStore } from 'vuex'


export default createStore({
    state: {
        currentPreset: null,
        currentSetlits: null,
        modelRepo: null,
    },
    getters: {
        currentPreset: state => state.currentPreset,
        currentSetlits: state => state.currentSetlits,
        modelRepo: state => state.modelRepo,
    },
    mutations: {
        SET_PRESET(state, preset) {
            state.currentPreset = preset;
        },
        SET_SETLIST(state, setlits) {
            state.currentSetlits = setlits;
        },
        SET_MODEL_REPO(state, modelRepo) {
            state.modelRepo = modelRepo;
        }
    },
    actions: {
        setSelectedPreset(context, preset) {
            context.commit('SET_PRESET', preset);
        },
        setSelectedSetlist(context, setlits) {
            context.commit('SET_SETLIST', setlits);
        },
        setModelRepo(context, modelRepo) {
            context.commit('SET_MODEL_REPO', modelRepo);
        }
    },
})

