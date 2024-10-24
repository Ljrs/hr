import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  tonken: getToken

}

const getters = {

}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存中
    setToken(token)
  },
  removeToken(state) {
    // 删除vuex中的token
    state.token = null
    // 删除缓存中的token
    removeToken
  }

}

const actions = {
  login(context, data) {
    // todo:调用登录接口

    // 返回一个token，存到vuex中
    context.commit('setToken', '123456')
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  getters,
  mutations,
  actions
}
