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
        color="primary"
        dark
        app
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        fixed
      >
        <v-toolbar-title style="width: auto" class="ml-0 mr-2 pl-3">
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
          <span class="hidden-sm-and-down">Racing Tournaments</span>
        </v-toolbar-title>
        <v-text-field
          flat
          solo-inverted
          prepend-icon="search"
          label="Search"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>notifications</v-icon>
        </v-btn>
        <template v-if="!isLoggedIn">
          <v-btn to="register" flat>Register</v-btn>
          <v-btn to="login" flat>Login</v-btn>
        </template>
        <v-btn v-if="isLoggedIn" :to="toCurrentUserProfile" icon large>
          <v-avatar size="32px">
            <img
              src="http://pol.audio/media/user-avatar.png">
          </v-avatar>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fill-height>
          <v-layout justify-center align-center>
            <router-view/>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer color="grey darken-3" app>
        <v-layout>
          <v-flex>
            <span class="white--text">&copy; 2018</span>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
    <!-- Loader if loading -->
    <!-- <v-flex
    v-else>
      <v-card
        color="primary"
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-flex> -->
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
    toCurrentUserProfile () {
      let id = this.$store.getters.user.id
      return 'user_' + id
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
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
  text-align center
  color #2c3e50

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
