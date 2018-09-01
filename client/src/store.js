import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    set (state, {type, val}) {
      state[type] = val
    }
  },
  actions: {
    signIn ({commit}, credentials) {
      commit('set', {type: 'loading', val: true})
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password).then(
        function (response) {
          const newUser = {
            'id': response.user.uid,
            'email': response.user.email,
            'name': response.user.displayName
          }
          commit('set', {type: 'user', val: newUser})
          commit('set', {type: 'loading', val: false})
        },
        function (error) {
          var errorMessage = error.message
          commit('set', {type: 'error', val: errorMessage})
          commit('set', {type: 'loading', val: false})
        })
    },
    autoSignIn ({commit}, credentials) {
      const newUser = {
        'id': credentials.uid,
        'email': credentials.email,
        'name': credentials.displayName
      }
      commit('set', {type: 'user', val: newUser})
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    }
  }
})
