<template>
  <div>
    <v-layout>
      <v-flex>
        <!-- <h1>{{_championship.info.name}}</h1> -->
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <h3>{{_championship.info.game.name}}</h3>
    {{_championship.info.description}}
    <v-layout>
      <v-flex>Platform: {{_championship.info.platform}}</v-flex>
      <v-flex>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</v-flex>
      <v-flex>Author:
        <router-link
          :to="'/user_' + _championship.author.username"
        >{{_championship.author.username}}</router-link>
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

