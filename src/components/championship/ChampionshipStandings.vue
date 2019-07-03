<template>
  <div class="championship-standings">
    <div class="my-3 text-xs-left headline">Driver standings</div>

    <!-- Headers below -->

    <v-layout column>
      <v-layout class="hidden-xs text-xs-left" align-center>
        <v-flex xs1>Pos.</v-flex>
        <v-flex xs5 md2>Username</v-flex>
        <v-flex xs5 md2>Team</v-flex>
        <template v-for="(header, index) in headers">
          <v-flex
            xs1
            class="championship-standings_country hidden-xs"
            v-if="header.value === 'country'"
            :key="index"
          >
            <CountryFlag :_country="header.text" :_width="30"/>
            {{header.text}}
          </v-flex>
          <v-flex xs1 v-else :key="index">{{header.text}}</v-flex>
        </template>
      </v-layout>

      <!-- Headers above -->

      <!-- Drivers below -->
      <template v-if="drivers && drivers.length">
        <template v-for="(user, index) in sortedResults">
          <v-layout
            align-center
            class="championship-standings_row text-xs-left py-1"
            :class="{'removed':isDriverRemoved(user)}"
            v-if="_drivers"
            :key="index"
          >
            <template v-if="Object.values(user)[0].driver">
              <v-flex xs1>{{index+1}}</v-flex>
              <v-flex class="championship-standings_username" xs5 md2>
                <router-link
                  :to="'/user_' + Object.values(user)[0].driver.username"
                >{{Object.values(user)[0].driver.username}}</router-link>
              </v-flex>
              <v-flex xs5 md2 class="championship-standings_team">
                <div v-if="!isDriverRemoved(user)">
                  <img :src="findDriverTeam(user).teamLogo" width="100" alt>
                </div>
                <div v-else></div>
              </v-flex>

              <v-flex xs1 v-for="stage in _championship.calendar" :key="stage.id">
                <div v-if="user[stage.trackDocumentId] !== undefined" class="hidden-xs" xs1>
                  <span v-if="user[stage.trackDocumentId].dnf">DNF</span>
                  <span v-else-if="user[stage.trackDocumentId].dns">DNS</span>
                  <span class="red--text" v-else-if="user[stage.trackDocumentId].dq">DQ</span>
                  <span
                    :class="cellClass(user[stage.trackDocumentId])"
                    v-else
                  >{{user[stage.trackDocumentId].points}}</span>
                </div>
                <div v-else class="hidden-xs" xs1>-</div>
              </v-flex>
              <v-flex xs1 class="championship-standings_total-value">{{user.totalPts}}</v-flex>
            </template>
          </v-layout>
        </template>
      </template>
      <template v-else>
        <v-card>
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-icon>block</v-icon>
              </v-flex>
              <v-flex class="subheading" justify-center>No drivers in championship</v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </template>

      <!-- Drivers above -->

      <!-- Drivers with no results below -->
      <template v-for="(driver, index) in _drivers">
        <v-layout
          class="championship-standings_row py-1"
          align-center
          v-if="!_results[driver.userId]"
          :key="index"
        >
          <v-flex xs1>-</v-flex>
          <v-flex class="championship-standings_username" xs5 md2>
            <router-link :to="'/user_' + driver.username">{{driver.username}}</router-link>
          </v-flex>
          <v-flex xs5 md2>
            <img :src="driver.team.teamLogo" width="100" alt>
          </v-flex>
          <v-flex xs1 v-for="(stage, index) in _championship.calendar" :key="index">-</v-flex>
          <v-flex xs1>0</v-flex>
        </v-layout>
      </template>
      <!-- Drivers with no results above -->
    </v-layout>
    <ConstructorStandings :results="_results"/>
  </div>
</template>

<script>
  import ConstructorStandings from '@/components/championship/ConstructorStandings.vue'
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
    cellClass (driverResult) {
      let className = 'result-cell position-' + driverResult.finish
      if (driverResult.isBestLap)
      className = className + ' best-lap'
      return className
    },
    findDriverTeam (user) {
      let resultsLength = Object.values(user).length
      let userId = Object.values(user)[0].driver.userId
      return this._drivers[userId] ? this._drivers[userId].team : Object.values(user)[resultsLength - 2].driver.team
    },
    isDriverRemoved(user) {
      if(user) {
        let userId = Object.values(user)[0].driver.userId
        if(userId) {
          const result = this.drivers.filter(driver => driver.userId === userId)
          if (!result.length) {
            return true
          } else {
            return false
          }
        }
        return false
      }
    }
  },
  mixins: [
    sortStandings
  ],
  components: {
    CountryFlag,
    ConstructorStandings
  }
}
</script>