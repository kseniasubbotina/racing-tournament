<template>
  <div id="app">
    <v-app id="inspire" :dark="isDarkColorTheme">
      <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
        <navigationMenu @colorThemeChanged="onColorThemeChanged"/>
      </v-navigation-drawer>
      <v-toolbar color="#e10600" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title style="width: auto" class="ml-0 mr-2 pl-3">
          <img width="70" src="./assets/logo1.png" alt>
          <span class="hidden-sm-and-down font-weight-bold">Esport (&#945;)</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>-->
        <v-btn to="/about" flat>About</v-btn>
        <template v-if="!isLoggedIn">
          <v-btn to="/register" flat>Register</v-btn>
          <v-btn to="/login" flat>Login</v-btn>
        </template>
        <v-btn v-if="isLoggedIn" :to="toCurrentUserProfile" icon large>
          <UserAvatar :userData="userData" :width="30"/>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container>
          <v-layout column>
            <Breadcrumbs flex-start/>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer color="grey darken-3" app>
        <v-layout align-center justify-center class="px-2">
          <v-flex class="grey--text text-xs-center">f1-esport.com &copy; | 2019 | Work in progress</v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import UserAvatar from '@/components/user/UserAvatar.vue'

import NavigationMenu from '@/components/NavigationMenu.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import fb from './firebase/config.js'
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null,
    isDarkColorTheme: null
  }),
  created() {
    if (window.localStorage)
      this.isDarkColorTheme = window.localStorage.isDarkColorTheme == 'true'
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    },
    userData() {
      let userData = this.$store.getters.userData
      if (userData && userData.isDarkColorTheme) {
        this.onColorThemeChanged(userData.isDarkColorTheme)
      }
      return userData
    },
    toCurrentUserProfile() {
      if (this.$store.getters.userData) {
        let id = this.$store.getters.userData.username
        return '/user_' + id
      }
    }
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    onColorThemeChanged(val) {
      if (window.localStorage) {
        window.localStorage.isDarkColorTheme = val
      }
      this.isDarkColorTheme = val
      if (this.isLoggedIn) {
        fb.usersCollection
          .doc(this.$store.getters.user.id)
          .update({
            isDarkColorTheme: val
          })
          .then(function() {
            // success
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearData')
  },
  components: {
    NavigationMenu,
    Breadcrumbs,
    UserAvatar
  }
}
</script>
