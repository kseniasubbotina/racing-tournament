<template>
  <div id="app">
    <v-app id="inspire">
      <v-navigation-drawer
        fixed
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        v-model="drawer">
        <navigationMenu/>
      </v-navigation-drawer>
      <v-toolbar
        color="red darken-2"
        dark
        app
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        fixed
      >
        <v-toolbar-title style="width: auto" class="ml-0 mr-2 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <img width="70" src="./assets/logo1.png" alt="">
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
              <img v-if="userData && userData.avatarURL"
              :src="userData.avatarURL">
              <img v-else
              src="http://pol.audio/media/user-avatar.png">
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container>
          <v-layout justify-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer color="grey darken-3" app>
        <v-layout>
          <v-flex align-center class="text-xs-center">
            &copy; 2018
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import NavigationMenu from '@/components/NavigationMenu.vue'
export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    drawer: null
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    isLoggedIn () {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    },
    userData () {
      return this.$store.getters.userData
    },
    toCurrentUserProfile () {
      let id = this.$store.getters.user.id
      return '/user_' + id
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  beforeDestroy () {
    this.$store.dispatch('clearData')
  },
  components: {
    NavigationMenu
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
