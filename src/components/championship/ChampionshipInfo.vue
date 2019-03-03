<template>
  <div>
    <v-layout>
      <v-flex>
        <h1>{{_championship.info.name}}</h1>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex>Approved: {{_championship.approved}}</v-flex>
    </v-layout>
    <v-layout column>
      <h3>{{_championship.info.game.name}}</h3>
      {{_championship.info.description}}
      <div>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</div>
    </v-layout>
    <div>Author:
      <router-link :to="'/user_' + _championship.author.username">{{_championship.author.username}}</router-link>
    </div>
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

