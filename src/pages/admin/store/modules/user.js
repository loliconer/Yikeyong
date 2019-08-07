const state = {
  id: '',
  admin: false,
  username: 'Scott',
  nickname: '',
  avatar: '/img/loli.png',
  csrf: ''
}

const mutations = {
  SET_USER_INFO(_state, userInfo) {
    for (let key in userInfo) {
      if (userInfo.hasOwnProperty(key)) {
        _state[key] = userInfo[key]
      }
    }
  },
  LOGOUT(_state) {
    _state.id = ''
    _state.admin = false
    _state.username = ''
    _state.nickname = ''
    _state.avatar = ''
    _state.csrf = ''
  }
}

const actions = {
  async init({ commit }) {
    const body = await $fetch.get('user').catch(() => undefined)
    if (body === undefined) return false

    commit('SET_USER_INFO', body)
    return true
  }
}

const getters = {
  isAdmin(_state) {
    return _state.admin
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
