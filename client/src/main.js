import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'
import VeeValidate from 'vee-validate'
import firebase from 'firebase'
import firebaseConfig from './firebase/config'

Vue.use(VeeValidate)
Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  firebase,
  router,
  store,
  created () {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
