<template>
  <v-card v-if="userData">
    <v-layout>
      <v-card-title>
        <span
          @click="$router.push({name: 'Championship', params: {id: championshipName}})"
          class="pointer subheading mr-1"
        >{{championshipName}}</span>
        <v-chip
          small
          class="subheading"
          :color="statusColor"
          disabled
          text-color="white"
        >{{data.championship.status}}</v-chip>
        <v-btn
          @click="$router.push({name: 'Championship', params: {id: championshipName}})"
          color="primary"
          flat
          small
        >Details</v-btn>
      </v-card-title>
      <v-spacer></v-spacer>
    </v-layout>
    <v-card-text v-if="full">
      <v-layout wrap>
        <v-flex xs6 lg4>
          <div class="caption">Team:</div>
          <img :src="team.teamLogo" alt width="100">
        </v-flex>
        <v-flex xs6 lg2>
          <span class="caption">Position:</span>
          <h3>{{userPosition}}</h3>
        </v-flex>
        <v-flex xs6 lg3>
          <span class="caption">Points:</span>
          <h3>{{points}}</h3>
        </v-flex>
        <v-flex xs6 lg3>
          <span class="caption">Teammate:</span>
          <h3>{{teammate.username}}&nbsp;({{teammatePosition}})</h3>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>


<script>
import sortStandings from '@/mixins/championship/sortStandings.js'

export default {
  name: 'UserChampionshipItem',
  props: {
    data: Object,
    userData: Object,
    full: {
      type: Boolean,
      default: true
    }
  },
  computed: {
        isClosed () {
      return this.data.championship.status === 'Closed' ? true : false
    },
        statusColor () {
      return this.isClosed ? 'red' : 'green'
    },
    championshipName () {
      return this.data.championship.info.name
    },
    team () {
      return this.data.drivers[this.userData.id].team
    },
    points () {
      if (this.data.results[this.userData.id]) {
        return this.data.results[this.userData.id].totalPts
      }
      return 0
    },
    userPosition () {
      let userPosition = 0
      let sortedStandings = this.sortStandings(this.data.results)
      for(let i = 0; i<sortedStandings.length; i++) {
        let driver = Object.values(sortedStandings[i])[0].driver
        if(driver.username == this.userData.username) {
          userPosition = i + 1
          break
        }
      }
      if(!userPosition) {
        return '-'
      }
      if (userPosition == 1) {
        return userPosition + 'st'
      } else if (userPosition == 2) {
        return userPosition + 'nd'
      } else if(userPosition == 3) {
        return userPosition + 'rd'
      } else {
        return userPosition + 'th'
      }
      
    },
    teammate () {
      let drivers = Object.values(this.data.drivers)
      let teammate = drivers.filter(driver => driver.team.name === this.team.name && driver.username !== this.userData.username)[0]
      return teammate || {username: '-'}
    },
    teammatePosition () {
      let teammatePosition = 0
      let sortedStandings = this.sortStandings(this.data.results)
      for(let i = 0; i<sortedStandings.length; i++) {
        let driver = Object.values(sortedStandings[i])[0].driver
        if(driver.username == this.teammate.username) {
          teammatePosition = i + 1
          break
        }
      }
      if(!teammatePosition) {
        return '-'
      }
      if (teammatePosition == 1) {
        return teammatePosition + 'st'
      } else if (teammatePosition == 2) {
        return teammatePosition + 'nd'
      } else if(teammatePosition == 3) {
        return teammatePosition + 'rd'
      } else {
        return teammatePosition + 'th'
      }
    }
  },
  mixins: [
    sortStandings
  ]
}
</script>
