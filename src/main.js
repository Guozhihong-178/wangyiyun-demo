import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins'
import Vuex from 'vuex'

// import { Swipe, SwipeItem, Button, Lazyload } from 'vant'

const app = createApp(App)
getVant(app)
app.use(Vuex)
app.use(store)
app.use(router).mount('#app')
