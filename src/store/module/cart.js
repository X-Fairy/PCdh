
import { cartData, subGood, cartUpdata, cartUpdate, delGoods } from '@/api'
import { Message } from 'view-design';
const state = {
  cartCount: 0,
  cartMoney:0,
}
const getters = {
  cartNum(state) {
    return state.cartCount
  },
  cartMoney(state) {
    return state.cartMoney
  },
}
const actions = {
  update({ commit }, data) {
    commit('update', data)
  }
}
const mutations = {
  update(state, data) {
    cartData().then(res => {
      state.cartCount = res.allnum;
      state.cartMoney = res.amt;
    })
  },
}
export default {
  state,
  actions,
  getters,
  mutations
}
