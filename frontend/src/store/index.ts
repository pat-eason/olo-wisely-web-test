import Vue from 'vue'
import Vuex from 'vuex'

import { actions } from '@/store/actions'
import { getters } from '@/store/getters'
import { mutations } from '@/store/mutations'
import { state } from '@/store/state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})
