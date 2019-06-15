<template>
  <div>
    <div class="subheading">{{_championship.info.game}}</div>
    <v-layout wrap>
      <v-flex xs12 sm4>
        <div>Platform: {{_championship.info.platform}}</div>
        <div>Status: {{_championship.status}}</div>
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
    <div class="mt-3">Session settings</div>
    <v-layout>
      <v-flex>Race distance: {{_championship.settings.distance}}</v-flex>
      <v-flex>Qualification format: {{_championship.settings.qFormat}}</v-flex>
      <v-flex>Weather: {{_championship.settings.weather}}</v-flex>
      <v-flex>AI difficulty: {{_championship.settings.aiDifficulty}}</v-flex>
    </v-layout>
    <div class="mt-3" v-html="_championship.info.description"></div>
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

