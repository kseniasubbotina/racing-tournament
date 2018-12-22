<template>
  <div id="app">
    <v-app id="inspire" :dark="isDarkColorTheme">
      <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
        <navigationMenu @colorThemeChanged="onColorThemeChanged"/>
      </v-navigation-drawer>
      <v-toolbar color="red darken-2" dark app :clipped-left="$vuetify.breakpoint.lgAndUp" fixed>
        <v-toolbar-title style="width: auto" class="ml-0 mr-2 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <img width="70" src="./assets/logo1.png" alt>
          <span class="hidden-sm-and-down">Esport</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <template v-if="!isLoggedIn">
          <v-btn to="/register" flat>Register</v-btn>
          <v-btn to="/login" flat>Login</v-btn>
        </template>
        <v-btn v-if="isLoggedIn" :to="toCurrentUserProfile" icon large>
          <v-avatar size="32px">
            <img v-if="userData && userData.avatarURL" :src="userData.avatarURL">
            <img v-else src="http://pol.audio/media/user-avatar.png">
          </v-avatar>
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
        <v-layout>
          <v-flex align-center class="text-xs-center white--text">&copy; 2018</v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
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
  watch: {
    userData(val) {
      if (val) {
        this.isDarkColorTheme = val.isDarkColorTheme
      }
    }
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
      return this.$store.getters.userData
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
    onColorThemeChanged() {
      this.isDarkColorTheme = !this.isDarkColorTheme
      fb.usersCollection
        .doc(this.$store.getters.userData.username)
        .update({
          isDarkColorTheme: this.isDarkColorTheme
        })
        .then(function() {
          // success
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearData')
  },
  components: {
    NavigationMenu,
    Breadcrumbs
  }
}
</script>
