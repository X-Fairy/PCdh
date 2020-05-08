import Vue from 'vue'
import Vuex from 'vuex'
import config from '../config'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import user from './module/user'
import cart from './module/cart'
import order from './module/order'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
    cart,
    order
  }
})
