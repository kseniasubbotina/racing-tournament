<template>
  <v-list>
    <v-list-tile
      v-if="link.role <= userRole"
      v-for="(link, idx) in links"
      :key="idx"
      @click="onMenuItemClick(link)">
      <v-list-tile-action>
        <v-icon>{{link.icon}}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{link.label}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'NavigationMenu',
  data: () => ({
    dialog: false,
    drawer: null,
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
        route: 'championships',
        role: 0
      },
      {
        label: 'Teams',
        icon: 'directions_car',
        route: 'teams',
        role: 1
      },
      {
        label: 'Users',
        icon: 'people',
        route: 'users',
        role: 1
      },
      {
        label: 'Tracks',
        icon: 'swap_calls',
        route: 'tracks',
        role: 0
      }
    ]
  }),
  computed: {
    userRole () {
      if (this.$store.getters.user && this.$store.getters.userData) {
        return this.$store.getters.userData.role
      } else {
        return 0
      }
    }
  },
  methods: {
    onMenuItemClick: function (_link) {
      this.$router.push(_link.route)
    }
  }
}
</script>
