<template>
  <v-card>
    <v-layout>
      <v-card-title class="subheading">{{championshipName}}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="$router.push({name: 'Championship', params: {id: championshipName}})"
        color="red"
        flat
      >More</v-btn>
    </v-layout>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs6 lg3>
          <div class="caption">Team:</div>
          <img :src="team.teamLogo" alt width="150">
        </v-flex>
        <v-flex xs6 lg3>
          <span class="caption">Position:</span>
          <h4>{{userPosition}}</h4>
        </v-flex>
        <v-flex xs6 lg3>
          <span class="caption">Points:</span>
          <h4>{{points}}</h4>
        </v-flex>
        <v-flex xs6 lg3>
          <span class="caption">Teammate:</span>
          <h4>{{teammate.username}}&nbsp;({{teammatePosition}})</h4>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>


<script>
import sortStandings from '@/mixins/championship/sortStandings.js'

export default {
  name: 'ActiveChampionship',
  props: {
    data: Object,
    userData: Object
  },
  computed: {
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
