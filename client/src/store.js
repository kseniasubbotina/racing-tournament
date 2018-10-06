import Vue from 'vue'
import Vuex from 'vuex'
import fb from './firebase/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    //
    user: null,
    userData: {},
    error: null,
    message: '',
    loading: false
  },
  mutations: {
    set (state, {type, val}) {
      state[type] = val
    }
  },
  actions: {
    signUp ({commit}, credentials) {
      commit('set', {type: 'loading', val: true})
      fb.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        function (response) {
          if (response) {
            commit('set', {type: 'error', val: null})
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
            commit('set', {type: 'user', val: newUser})
            commit('set', {type: 'loading', val: false})
          }
        },
        function (error) {
          commit('set', {type: 'error', val: error})
        })
    },
    signIn ({commit}, credentials) {
      commit('set', {type: 'loading', val: true})
      fb.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(
        function (response) {
          const newUser = {
            'id': response.user.uid,
            'email': response.user.email
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
      commit('set', {type: 'loading', val: true})
      const newUser = {
        'id': credentials.uid,
        'email': credentials.email
      }
      commit('set', {type: 'user', val: newUser})
      commit('set', {type: 'loading', val: false})
    },
    signOut ({commit}) {
      fb.auth.signOut().then(function () {
        // Sign-out successful.
        commit('set', {type: 'user', val: null})
      }).catch(function (error) {
        // An error happened.
        commit('set', {type: 'error', val: error})
      })
    },
    fetchUserData ({commit}) {
      fb.usersCollection.doc(this.state.user.id).get().then(res => {
        commit('set', {type: 'userData', val: res.data()})
      }).catch(err => {
        console.log(err)
      })
    },
    updateProfile ({commit}, newDetails) {
      fb.usersCollection.doc(this.state.user.id).update({
        country: newDetails.country,
        username: newDetails.username,
        avatarURL: newDetails.avatarURL
      }).then(function () {
        console.log('Document successfully updated!')
        commit('set', {type: 'message', val: 'Information successfully updated!'})
      }).catch(function (error) {
        // An error happened.
        commit('set', {type: 'error', val: error})
      })
      fb.usersCollection.doc(this.state.user.id).onSnapshot(doc => {
        console.log(doc.data())
        commit('set', {type: 'userData', val: doc.data()})
      })
    },
    clearData ({commit}) {
      commit('set', {type: 'error', val: null})
      commit('set', {type: 'message', val: null})
      commit('set', {type: 'user', val: null})
      commit('set', {type: 'error', val: false})
    }
  },
  getters: {
    user (state) {
      return state.user
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
