import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userData: {},
    message: '',
    loading: false
  },
  mutations: {
    set (state, { type, val }) {
      state[type] = val
    }
  },
  actions: {
    signUp ({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      fb.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        response => {
          if (response) {
            commit('set', { type: 'error', val: null })
            fb.usersCollection.doc(response.user.uid).set({
              username: credentials.username,
              country: credentials.country,
              avatarURL: ''
            }).then(
              console.log('User note created!')
            )
            const newUser = {
              'id': response.user.uid,
              'email': response.user.email
            }
            commit('set', { type: 'user', val: newUser })
            commit('set', { type: 'loading', val: false })
            commit('set', { type: 'message', val: null })
            this.dispatch('fetchUserData')
          }
        },
        function (error) {
          commit('set', { type: 'loading', val: false })
          commit('set', { type: 'message', val: error.message })
        })
    },
    signIn ({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      fb.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(
        response => {
          const newUser = {
            'id': response.user.uid,
            'email': response.user.email
          }
          commit('set', { type: 'user', val: newUser })
          commit('set', { type: 'loading', val: false })
          commit('set', { type: 'message', val: null })
          this.dispatch('fetchUserData')
        },
        function (error) {
          commit('set', { type: 'message', val: error.message })
          commit('set', { type: 'loading', val: false })
        })
    },
    autoSignIn ({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      const newUser = {
        'id': credentials.uid,
        'email': credentials.email
      }
      commit('set', { type: 'user', val: newUser })
      commit('set', { type: 'loading', val: false })
    },
    signOut ({ commit }) {
      fb.auth.signOut().then(function () {
        commit('set', { type: 'user', val: null })
      }).catch(function (error) {
        commit('set', { type: 'message', val: error })
      })
    },
    fetchUserData ({ commit }) {
      fb.usersCollection.doc(this.state.user.id).get().then(res => {
        commit('set', { type: 'userData', val: res.data() })
      }).catch(err => {
        console.log(err)
        commit('set', { type: 'message', val: err.message })
      })
    },
    updateProfile ({ commit }, newDetails) {
      commit('set', { type: 'loading', val: true })
      fb.usersCollection.doc(this.state.user.id).update({
        country: newDetails.country,
        username: newDetails.username,
        avatarURL: newDetails.avatarURL
      }).then(function () {
        console.log('Document successfully updated!')
        commit('set', { type: 'message', val: 'Information successfully updated!' })
        commit('set', { type: 'loading', val: false })
      }).catch(function (error) {
        commit('set', { type: 'message', val: error })
        commit('set', { type: 'loading', val: false })
      })
      fb.usersCollection.doc(this.state.user.id).onSnapshot(doc => {
        this.dispatch('fetchUserData')
      })
    },
    clearData ({ commit }) {
      commit('set', { type: 'message', val: null })
      commit('set', { type: 'message', val: null })
      commit('set', { type: 'user', val: null })
      commit('set', { type: 'loading', val: false })
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userData (state) {
      return state.userData
    },
    loading (state) {
      return state.loading
    },
    message (state) {
      return state.message
    },
    error (state) {
      return state.error
    }
  }
})
