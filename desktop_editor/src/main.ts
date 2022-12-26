import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PresetViewer from './views/PresetViewer.vue'
import PresetBrowserView from './views/PresetBrowserView.vue'

// Define routes
const routes = [
    { path: '/', component: App },
    {
        path: '/browser',
        component: PresetBrowserView,
    },
    { 
        name: 'Preset viewer',
        path: '/viewer', 
        component: PresetViewer,
    },
]

// Create router
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App);

app.use(router);

app.mount('#app');
