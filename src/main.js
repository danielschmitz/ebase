import '@babel/polyfill'
import Vue from 'vue'
import './plugins'
import './filters'
import App from './App.vue'
import router from './router'
import './style.css'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
