<template>
  <div>
    <v-layout column>
      <v-layout align-center>
        <v-flex xs1>Pos.</v-flex>
        <v-flex xs2>Username</v-flex>
        <v-flex xs2>Team</v-flex>
        <v-flex xs1 v-for="header in headers" :key="header.id">
          <CountryFlag v-if="header.value === 'country'" :_country="header.text" :_width="30"/>
          {{header.text}}
        </v-flex>
      </v-layout>
      <v-layout v-if="_drivers" v-for="(user, index) in sortedResults" :key="user.id">
        <template v-if="Object.values(user)[0].driver">
          <v-flex xs1>{{index+1}}</v-flex>
          <v-flex xs2>{{Object.values(user)[0].driver.username}}</v-flex>
          <v-flex xs2>{{Object.values(user)[0].driver.team.name}}</v-flex>
          <v-flex xs1 v-if="stage.points" v-for="stage in user" :key="stage.id">{{stage.points}}</v-flex>
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
      // sort by total pts
      resultsArr.sort(this.compare)

      console.log(resultsArr)
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