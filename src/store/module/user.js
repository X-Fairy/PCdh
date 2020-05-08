import { login } from "@/api";

let userInfo =localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):{};

const state = {
  userInfo: userInfo
}
const getters = {
  userup(state) {
    return state.userInfo
  },
}
const actions = {
  addUser({ commit }, data) {
    commit('addUser', data)
  }
}
const mutations = {
  addUser(state, data) {
    console.log(data)
    state.userInfo = data;  //保存了登录信息
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  },
  outUser(state) {
    state.userInfo = "";
    localStorage.setItem("userInfo",state.userInfo);
  }
}
export default {
  state,
  actions,
  mutations,
  getters
}
