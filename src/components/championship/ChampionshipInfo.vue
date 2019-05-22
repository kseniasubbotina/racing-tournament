<template>
  <div>
    <div class="subheading">{{_championship.info.game}}</div>
    <v-layout wrap>
      <v-flex xs12 sm4>
        <div>Platform: {{_championship.info.platform}}</div>
      </v-flex>
      <v-flex xs12 sm4>
        <div>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</div>
      </v-flex>
      <v-flex xs12 sm4>
        <div>
          Author:
          <router-link
            :to="'/user_' + _championship.author.username"
          >{{_championship.author.username}}</router-link>
        </div>
      </v-flex>
    </v-layout>
    <div v-html="_championship.info.description"></div>
  </div>
</template>

<script>
export default {
  name: 'ChampionshipInfo',
  props: {
    _championship: Object,
    _drivers: Object
  },
  computed: {
    driversCount() {
      let drivers = this._drivers
      if (drivers) {
        return Object.keys(drivers).length
      } else {
        return 0
      }
    }
  }
}
</script>

