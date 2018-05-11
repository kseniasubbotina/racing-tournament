<template>
  <v-list>
    <v-list-tile
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
        route: '/'
      },
      {
        label: 'Championships',
        icon: 'star',
        route: 'championships'
      },
      {
        label: 'Teams',
        icon: 'directions_car',
        route: 'teams'
      },
      {
        label: 'Profile',
        icon: 'account_circle'
      }
    ]
  }),
  methods: {
    onMenuItemClick: function (_link) {
      this.$router.push(_link.route)
    }
  }
}
</script>
