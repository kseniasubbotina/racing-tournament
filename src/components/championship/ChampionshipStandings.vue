<template>
  <div class="championship-standings">
    <!-- Headers below -->

    <v-layout column>
      <v-layout class="hidden-xs" align-center>
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
        <v-flex xs1 v-else>{{header.text}}</v-flex>
      </v-layout>

      <!-- Headers above -->

      <!-- Drivers below -->

      <v-layout
        align-center
        class="championship-standings_row py-1"
        v-if="_drivers"
        v-for="(user, index) in sortedResults"
        :key="user.id"
      >
        <template v-if="Object.values(user)[0].driver">
          <v-flex xs1>{{index+1}}</v-flex>
          <v-flex class="championship-standings_username" xs5 md2>
            <router-link
              :to="'/user_' + Object.values(user)[0].driver.username"
            >{{Object.values(user)[0].driver.username}}</router-link>
          </v-flex>
          <v-flex xs5 md2>
            <img :src="findDriverTeam(user).teamLogo" width="100" alt>
          </v-flex>
          <v-flex xs1 v-for="stage in _championship.calendar" :key="stage.id">
            <div v-if="user[stage.trackDocumentId] !== undefined" class="hidden-xs" xs1>
              <span v-if="user[stage.trackDocumentId].dnf">DNF</span>
              <span v-else-if="user[stage.trackDocumentId].dns">DNS</span>
              <span class="red--text" v-else-if="user[stage.trackDocumentId].dq">DQ</span>
              <span
                :class="'position-' + user[stage.trackDocumentId].finish"
                v-else
              >{{user[stage.trackDocumentId].points}}</span>
            </div>
            <div v-else class="hidden-xs" xs1>-</div>
          </v-flex>
          <v-flex xs1 class="championship-standings_total-value">{{user.totalPts}}</v-flex>
        </template>
      </v-layout>

      <!-- Drivers above -->

      <!-- Drivers with no results below -->

      <v-layout
        class="championship-standings_row py-1"
        align-center
        v-if="!_results[driver.userId]"
        v-for="driver in _drivers"
        :key="driver.id"
      >
        <v-flex xs1>-</v-flex>
        <v-flex xs5 md2>{{driver.username}}</v-flex>
        <v-flex xs5 md2>
          <img :src="driver.team.teamLogo" width="100" alt>
        </v-flex>
        <v-flex xs1 v-for="stage in _championship.calendar">-</v-flex>
        <v-flex xs1>0</v-flex>
      </v-layout>

      <!-- Drivers with no results above -->
    </v-layout>
  </div>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'
import sortStandings from '@/mixins/championship/sortStandings.js'
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
      return this.sortStandings(Object.values(this._results))
    }
  },
  methods: {
    findDriverTeam (user) {
      let resultsLength = Object.values(user).length
      let userId = Object.values(user)[0].driver.userId
      let team = this._drivers[userId] ? this._drivers[userId].team : Object.values(user)[resultsLength-2].driver.team
      return team
    }
  },
  mixins: [
    sortStandings
  ],
  components: {
    CountryFlag
  }
}
</script>