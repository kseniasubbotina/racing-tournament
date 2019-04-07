<template>
  <div>
    <v-layout>
      <v-flex>
        <!-- <h1>{{_championship.info.name}}</h1> -->
        <v-spacer></v-spacer>
      </v-flex>
    </v-layout>
    <h3>{{_championship.info.game}}</h3>
    {{_championship.info.description}}
    <v-layout>
      <v-flex>
        <h3>Platform: {{_championship.info.platform}}</h3>
      </v-flex>
      <v-flex>
        <h3>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</h3>
      </v-flex>
      <v-flex>
        <h3>Author:
          <router-link
            :to="'/user_' + _championship.author.username"
          >{{_championship.author.username}}</router-link>
        </h3>
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

