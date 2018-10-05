import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
const fb = require('./firebase/config.js')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    //
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
    signUp ({commit}, credentials) {
      commit('set', {type: 'loading', val: true})
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(
        function (response) {
          if (response) {
            firebase.auth().currentUser.updateProfile({
              displayName: credentials.username
            }).then(function () {
              const newUser = {
                'id': response.user.uid,
                'email': response.user.email,
                'name': response.user.displayName
              }
              commit('set', {type: 'user', val: newUser})
              commit('set', {type: 'loading', val: false})
            }).catch(function (error) {
              commit('set', {type: 'error', val: error})
              commit('set', {type: 'loading', val: false})
            })
          }
        },
        function (error) {
          // Handle Errors here.
          commit('set', {type: 'error', val: error})
        // ...
        })
    },
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
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName
          commit('set', {type: 'userInfo', val: displayName})
        }
      })
    },
    autoSignIn ({commit}, credentials) {
      commit('set', {type: 'loading', val: true})
      const newUser = {
        'id': credentials.uid,
        'email': credentials.email,
        'name': credentials.displayName
      }
      commit('set', {type: 'user', val: newUser})
      commit('set', {type: 'loading', val: false})
    },
    signOut ({commit}) {
      firebase.auth().signOut().then(function () {
        // Sign-out successful.
        commit('set', {type: 'user', val: null})
      }).catch(function (error) {
        // An error happened.
        commit('set', {type: 'error', val: error})
      })
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
