
const state = {
  current: null
}
const getters = {
  num(state) {
    return state.current
  },
}
const actions = {
  upIndex({ commit }, data) {
    commit('upIndex', data)
  }
}
const mutations = {
  upIndex(state, data) {
    state.current=data;
  },
}
export default {
  state,
  actions,
  getters,
  mutations
}
