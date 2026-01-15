import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // Importe o export default acima

const app = createApp(App)
app.use(vuetify) // O erro 'map' costuma sumir aqui
app.mount('#app')
