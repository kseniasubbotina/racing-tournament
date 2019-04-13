<template>
  <div>
    <h3>{{_championship.info.game}}</h3>
    {{_championship.info.description}}
    <v-layout wrap>
      <v-flex xs12 sm4>
        <div>Platform: {{_championship.info.platform}}</div>
      </v-flex>
      <v-flex xs12 sm4>
        <div>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</div>
      </v-flex>
      <v-flex xs12 sm4>
        <div>Author:
          <router-link
            :to="'/user_' + _championship.author.username"
          >{{_championship.author.username}}</router-link>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ChampionshipInfo',
  props: {
    _championship: Object
  },
  computed: {
    driversCount() {
      let drivers = this._championship.drivers
      if (drivers) {
        return Object.keys(drivers).length
      } else {
        return 0
      }
    }
  }
}
</script>

