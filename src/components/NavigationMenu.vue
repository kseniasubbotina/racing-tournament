<template>
  <v-list>
    <v-subheader>Menu</v-subheader>
    <template v-for="(link, idx) in links">
      <v-list-tile
        v-if="link.role <= userRole"
        :key="idx"
        @click="onMenuItemClick(link)"
      >
        <v-list-tile-action>
          <v-icon>{{link.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{link.label}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
    <v-divider dark></v-divider>
    <v-list-tile
      v-if="isLoggedIn"
      @click="$router.push('/user_' + $store.getters.userData.username)"
    >
      <v-list-tile-action>
        <v-icon>account_circle</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Profile</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider dark class="mb-3"></v-divider>
    <template>
      <!-- v-if="isLoggedIn" -->
      <v-subheader>Settings</v-subheader>
      <v-layout>
        <v-flex>
          <v-list-tile>Theme color:</v-list-tile>
        </v-flex>
        <v-flex>
          <v-list-tile>
            <v-switch
              color="red"
              :label="colorThemeLabel"
              v-model="isDarkColorTheme"
              @change="colorThemeChanged(isDarkColorTheme)"
            ></v-switch>
          </v-list-tile>
        </v-flex>
      </v-layout>
      <v-divider dark class="my-3"></v-divider>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'NavigationMenu',
  data: () => ({
    dialog: false,
    drawer: null,
    isDarkColorTheme: false,
    links: [
      {
        label: 'Home',
        icon: 'home',
        route: '/',
        role: 0
      },
      {
        label: 'Championships',
        icon: 'star',
        route: '/championships',
        role: 0
      },
      {
        label: 'Tracks',
        icon: 'swap_calls',
        route: '/tracks',
        role: 0
      },
      {
        label: 'Teams',
        icon: 'directions_car',
        route: '/teams',
        role: 1
      },
      {
        label: 'Users',
        icon: 'people',
        route: '/users',
        role: 1
      },
      {
        label: 'Games',
        icon: 'gamepad',
        route: '/games',
        role: 0
      }
    ]
  }),
  watch: {
    storedTheme(val) {
      if (val) this.isDarkColorTheme = val
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.user ? true : false
    },
    storedTheme() {
      if (
        this.$store.getters.userData &&
        this.$store.getters.userData.isDarkColorTheme
      ) {
        this.isDarkColorTheme = this.$store.getters.userData.isDarkColorTheme
        return this.$store.getters.userData.isDarkColorTheme
      } else {
        this.isDarkColorTheme = window.localStorage.isDarkColorTheme == 'true'
        return window.localStorage.isDarkColorTheme == 'true'
      }
    },
    colorThemeLabel() {
      return this.isDarkColorTheme ? 'Dark' : 'Light'
    },
    userRole() {
      if (this.$store.getters.user && this.$store.getters.userData) {
        return this.$store.getters.userData.role
      } else {
        return 0
      }
    }
  },
  methods: {
    onMenuItemClick: function(_link) {
      this.$router.push(_link.route)
    },
    colorThemeChanged(val) {
      this.$emit('colorThemeChanged', val)
    }
  }
}
</script>
