<template>
  <div class="championship-standings">
    <v-layout column>
      <v-layout align-center>
        <v-flex xs1>Pos.</v-flex>
        <v-flex xs5 md2>Username</v-flex>
        <v-flex xs5 md2>Team</v-flex>
        <v-flex
          xs1
          class="championship-standings_country hidden-xs"
          v-if="header.value === 'country'"
          v-for="header in headers"
          :key="header.id"
        >
          <CountryFlag :_country="header.text" :_width="30"/>
          {{header.text}}
        </v-flex>
        <v-else v-else>{{header.text}}</v-else>
      </v-layout>
      <v-layout v-if="_drivers" v-for="(user, index) in sortedResults" :key="user.id">
        <template v-if="Object.values(user)[0].driver">
          <v-flex xs1>{{index+1}}</v-flex>
          <v-flex xs5 md2>{{Object.values(user)[0].driver.username}}</v-flex>
          <v-flex xs5 md2>
            <img :src="Object.values(user)[0].driver.team.teamLogo" width="100" alt>
          </v-flex>
          <v-flex
            class="hidden-xs"
            xs1
            v-if="stage.points !== undefined"
            v-for="stage in user"
            :key="stage.id"
          >{{stage.points}}</v-flex>
          <v-flex class="hidden-xs" xs1 v-else>-</v-flex>
          <v-flex xs1>{{user.totalPts}}</v-flex>
        </template>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'
export default {
  name: 'ChampionshipStandings',
  data() {
    return {
      search: ''
    }
  },
  props: {
    _championship: Object,
    _drivers: Object,
    _results: Object
  },
  computed: {
    drivers() {
      if (this._drivers) {
        return Object.values(this._drivers)
      }
    },
    headers() {
      let headers = []
      for (let i = 0; i < this._championship.calendar.length; i++) {
        let calendarHeaderItem = {
          text: this._championship.calendar[i].stageCountry,
          align: 'center',
          sortable: false,
          value: 'country'
        }
        headers.push(calendarHeaderItem)
      }
      let totalColumnHeader = {
        text: 'Total',
        align: 'center',
        sortable: true,
        value: 'total'
      }
      headers.push(totalColumnHeader)
      return headers
    },
    sortedResults () {
      let resultsArr = Object.values(this._results)

      // sum all stages points and add it to the 'totalPts' property
      resultsArr.forEach(function(user) {
        let stagesArr = Object.values(user)
        let totalPts = 0
        stagesArr.forEach(function(stage) {
          if(stage.points) {
            totalPts += Number(stage.points)
          }
        })
        user.totalPts = totalPts
      })
      resultsArr = resultsArr.filter(user => Object.values(user)[0].bestLapTime !== undefined)
      // sort by total pts
      resultsArr.sort(this.compare)

      return resultsArr
    }
  },
  methods: {
    compare(a, b) {
      if (a.totalPts && b.totalPts) {
        if (a.totalPts > b.totalPts)
          return -1
        if (a.totalPts < b.totalPts)
          return 1
        return 0
      }
    }
  },
  components: {
    CountryFlag
  }
}
</script>