import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCalendarCheck,
  faClipboard,
  faCheckCircle,
  faCubesStacked,
  faExclamationTriangle,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'

import './assets/styles/tailwind.css'

import App from './App.vue'
import router from './router'
import { store } from './store'

library.add(
  faCalendarCheck,
  faCheckCircle,
  faClipboard,
  faCubesStacked,
  faExclamationTriangle,
  faPlus
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
