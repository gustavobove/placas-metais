import Vue from 'vue'
import VueHtml2Canvas from 'vue-html2canvas'
import BabelPolyfill from '@babel/polyfill'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/libs/axios'
import '@/libs/vee-validate'
import '@/libs/bootstrap-vue'
import '@/libs/vmask'
import '@/libs/tastyburgers'

Vue.config.productionTip = false

require('./assets/scss/style.scss')

Vue.use(BabelPolyfill)
Vue.use(VueHtml2Canvas)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
