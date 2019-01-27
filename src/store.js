import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userData: {},
    message: {
      error: '',
      success: ''
    },
    loading: false
  },
  mutations: {
    set(state, { type, val }) {
      state[type] = val
    },
    setMessage(state, { type, text }) {
      state.message[type] = text
      if (type === 'success') {
        state.message.error = ''
      } else {
        state.message.success = ''
      }
    }
  },
  actions: {
    signUp({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      fb.auth
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then(
          response => {
            if (response) {
              fb.usersCollection.doc(response.user.uid).set({
                id: response.user.uid,
                username: credentials.username,
                country: credentials.country,
                avatarURL: '',
                role: '0'
              })
              // .then(console.log('User note created!'))
              const newUser = {
                id: response.user.uid,
                email: response.user.email
              }
              commit('set', { type: 'user', val: newUser })
              commit('set', { type: 'loading', val: false })
              commit('setMessage', { type: 'success', text: '' })
              this.dispatch('fetchUserData')
            }
          },
          function(error) {
            commit('set', { type: 'loading', val: false })
            commit('setMessage', { type: 'error', text: error.message })
          }
        )
    },
    signIn({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      fb.auth
        .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(
          response => {
            const newUser = {
              id: response.user.uid,
              email: response.user.email
            }
            commit('set', { type: 'user', val: newUser })
            commit('set', { type: 'loading', val: false })
            this.dispatch('fetchUserData')
          },
          function(error) {
            commit('setMessage', { type: 'error', text: error.message })
            commit('set', { type: 'loading', val: false })
          }
        )
    },
    autoSignIn({ commit }, credentials) {
      commit('set', { type: 'loading', val: true })
      const newUser = {
        id: credentials.uid,
        email: credentials.email
      }
      commit('set', { type: 'user', val: newUser })
      commit('set', { type: 'loading', val: false })
      this.dispatch('fetchUserData')
    },
    signOut({ commit }) {
      fb.auth
        .signOut()
        .then(function() {
          commit('set', { type: 'user', val: null })
          commit('set', { type: 'userData', val: null })
        })
        .catch(function(error) {
          commit('setMessage', { type: 'error', text: error })
        })
    },
    fetchUserData({ commit }) {
      fb.usersCollection
        .where('id', '==', this.state.user.id)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            commit('set', { type: 'userData', val: doc.data() })
          })
        })
        .catch(err => {
          commit('setMessage', { type: 'error', text: err.message })
        })
    },
    updateProfile({ commit }, newDetails) {
      commit('set', { type: 'loading', val: true })
      fb.usersCollection
        .doc(newDetails.userId)
        .update({
          country: newDetails.country,
          username: newDetails.username,
          avatarURL: newDetails.avatarURL,
          role: newDetails.role
        })
        .then(function() {
          commit('setMessage', {
            type: 'success',
            text: 'Information successfully updated!'
          })
          commit('set', { type: 'loading', val: false })
        })
        .catch(function(error) {
          commit('setMessage', { type: 'error', text: error })
          commit('set', { type: 'loading', val: false })
        })
      if (this.state.user.id === newDetails.userId) {
        fb.usersCollection.doc(this.state.user.id).onSnapshot(doc => {
          this.dispatch('fetchUserData')
        })
      }
    },
    clearData({ commit }) {
      commit('set', { type: 'user', val: null })
      commit('set', { type: 'loading', val: false })
    }
  },
  getters: {
    user(state) {
      return state.user
    },
    userData(state) {
      return state.userData
    },
    loading(state) {
      return state.loading
    },
    message(state) {
      return state.message
    },
    error(state) {
      return state.error
    }
  }
})
