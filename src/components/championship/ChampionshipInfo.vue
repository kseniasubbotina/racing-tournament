<template>
  <div>
    <v-layout align-center row>
      <v-flex>
        <div class="subheading">
          {{_championship.info.game}}
          <span>- {{_championship.info.platform}}</span>
        </div>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>

    <v-layout justify-center align-center class="mt-3 subheading" wrap>
      <v-flex xs12 sm4>
        <v-chip
          v-if="_championship.approved"
          class="subheading"
          :color="statusColor"
          disabled
          text-color="white"
        >{{_championship.status}}</v-chip>
        <v-chip
          v-else
          small
          class="subheading"
          color="orange"
          disabled
          text-color="white"
        >Moderation</v-chip>
      </v-flex>
      <v-flex xs12 sm4>
        <div>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</div>
      </v-flex>
      <v-flex xs12 sm4>
        <v-layout justify-start>
          Author:
          <UserAvatar :width="30" :userData="_championship.author"/>
          <router-link
            :to="'/user_' + _championship.author.username"
          >{{_championship.author.username}}</router-link>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex xs12 sm6>
        <div class="subheading mt-3">Session settings:</div>
        <v-layout column>
          <v-flex xs12>Race distance: {{_championship.settings.distance}}</v-flex>
          <v-flex xs12>Qualification format: {{_championship.settings.qFormat}}</v-flex>
          <v-flex xs12>Weather: {{_championship.settings.weather}}</v-flex>
          <v-flex xs12>AI difficulty: {{_championship.settings.aiDifficulty}}</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="subheading mt-3">Assists settings:</div>
        <v-layout column>
          <v-flex xs12>
            <v-chip disabled outline :color="assistColor(isTractionAllowed)">
              <v-icon :color="assistColor(isTractionAllowed)" v-if="isTractionAllowed" left>check</v-icon>
              <v-icon :color="assistColor(isTractionAllowed)" v-else left>close</v-icon>Traction Control
            </v-chip>
            <v-chip disabled outline :color="assistColor(isABSAllowed)">
              <v-icon :color="assistColor(isABSAllowed)" v-if="isABSAllowed" left>check</v-icon>
              <v-icon :color="assistColor(isABSAllowed)" v-else left>close</v-icon>ABS
            </v-chip>
            <v-chip disabled outline :color="assistColor(isRacingLineAllowed)">
              <v-icon
                :color="assistColor(isRacingLineAllowed)"
                v-if="isRacingLineAllowed"
                left
              >check</v-icon>
              <v-icon :color="assistColor(isRacingLineAllowed)" v-else left>close</v-icon>Racing line
            </v-chip>
            <v-chip disabled outline>
              <v-icon left>settings</v-icon>
              {{gearbox}}
            </v-chip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <div class="subheading mt-3">Description:</div>
    <div class="mt-3" v-html="_championship.info.description"></div>
  </div>
</template>

<script>
  import UserAvatar from '@/components/user/UserAvatar.vue'

  export default {
  name: 'ChampionshipInfo',
  props: {
    _championship: Object,
    _drivers: Object
  },
  computed: {
    isClosed () {
      return this._championship.status === 'Closed' ? true : false
    },
    statusColor () {
      return this.isClosed ? 'red' : 'green'
    },
    driversCount() {
      let drivers = this._drivers
      if (drivers) {
        return Object.keys(drivers).length
      } else {
        return 0
      }
    },
    isTractionAllowed () {
      return this._championship.settings.assists.tractionControl
    },
    isABSAllowed () {
      return this._championship.settings.assists.antiLockBrakes
    },
    isRacingLineAllowed () {
      return this._championship.settings.assists.racingLine
    },
    gearbox () {
      return this._championship.settings.assists.gearboxManual ? 'Manual' : 'Automatic'
    }
  },
  methods: {
    assistColor (val) {
      return val ? 'green' : 'red'
    }
  },
  components: {
    UserAvatar
  }
}
</script>

