<template>
  <v-card>
    <v-layout>
      <v-card-title>{{championshipName}}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        @click="$router.push({name: 'Championship', params: {id: championshipName}})"
        color="primary"
        flat
      >More</v-btn>
    </v-layout>

    <v-card-text>
      <v-layout>
        <v-flex>
          <div class="caption">Team:</div>
          <img :src="team.teamLogo" alt width="150">
        </v-flex>
        <v-flex>
          <span class="caption">Position:</span>
          <h2>1st</h2>
        </v-flex>
        <v-flex>
          <span class="caption">Points:</span>
          <h2>{{points}}</h2>
        </v-flex>
        <v-flex>
          <span class="caption">Teammate:</span>
          <div>{{teammate.username}}</div>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>


<script>
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
    teammate () {
      let drivers = Object.values(this.data.drivers)
      let teammate = drivers.filter(driver => driver.team.name === this.team.name && driver.username !== this.userData.username)[0]
      return teammate || {username: '-'}
    }
  }
}
</script>
