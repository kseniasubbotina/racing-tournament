<template>
  <div class="championship-standings">
    <div class="my-3 text-xs-left headline">Constructor standings</div>
    <v-layout class="text-xs-left championship-standings_header" justify-start>
      <v-flex xs1>Pos.</v-flex>
      <v-flex>Team</v-flex>
      <v-flex class="text-xs-right">Points</v-flex>
    </v-layout>
    <v-layout
      class="championship-standings_row text-xs-left"
      v-for="(team, i) in constructors"
      :key="i"
    >
      <v-flex xs1>{{i+1}}</v-flex>
      <v-flex>{{team.name}}</v-flex>
      <v-flex class="text-xs-right">{{team.points}}</v-flex>
    </v-layout>
  </div>
</template>

<script>
  import sortStandings from '@/mixins/championship/sortStandings.js'

  export default {
    name: 'ConstructorStandings',
    props: {
      results: Object
    },
    computed: {
      constructors () {
        var constructors = {}
        var constructorsArray = []
        var sortedStandings = this.sortStandings(Object.values(this.results))
        sortedStandings.forEach(driver => {
          let teamName = [Object.values(driver)[0].driver.team.name]

          constructors[teamName] = constructors[teamName] ? constructors[teamName] + driver.totalPts : driver.totalPts
        })
        for (var prop in constructors) {
          var constructor = {
            name: prop,
            points: constructors[prop]
          }
          constructorsArray.push(constructor)
        }
        return constructorsArray
      }
    },
    mixins: [
      sortStandings
    ]
  }
</script>
