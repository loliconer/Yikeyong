const state = {
  id: '',
  admin: false,
  username: '',
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
  initUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      fetch(new Request('/api/user', {
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'same-origin'
      })).then(res => {
        if (res.ok) return res.json()
      }).then(body => {
        if (body.code === 0) {
          commit('SET_USER_INFO', body.data)
          // sessionStorage.csrf = body.data.csrf
        }
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
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
