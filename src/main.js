import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'
import './styles/main.css'
import './styles/layout.css'
import VeeValidate from 'vee-validate'
import fb from './firebase/config'
import VueTheMask from 'vue-the-mask'

Vue.use(VeeValidate)
Vue.use(Vuetify)
Vue.use(VueTheMask)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      store,
      router,
      created() {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      },
      render: h => h(App)
    })
  }
})
