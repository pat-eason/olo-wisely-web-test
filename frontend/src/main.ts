import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCalendarCheck,
  faCubesStacked
} from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'

import './assets/styles/tailwind.css'

import App from './App.vue'
import router from './router'

library.add(faCalendarCheck, faCubesStacked)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
