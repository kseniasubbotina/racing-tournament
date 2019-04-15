<template>
  <v-card>
    <v-card-text>
      <v-card-title
        class="title"
      >Add results for {{_stage.stageCountry}} Grand Prix - {{_stage.date}} - {{_stage.time}}</v-card-title>
      {{raceResults}}
      <ResultsFormDriver
        v-for="driver in _drivers"
        :_isBestLap="isBestLap(driver)"
        :key="driver.id"
        :_driver="driver"
        @driverResultUpdate="onDriverResultUpdate"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="error" @click="closeWindow">Cancel</v-btn>
        <v-btn depressed dark color="green">Save</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import ResultsFormDriver from '@/components/championship/results/ResultsFormDriver.vue'

export default {
  name: 'ResultsForm',
  data () {
    return {
      raceResults: {}
    }
  },
  props: {
    _drivers: Object,
    _stage: Object
  },
  components: {
    ResultsFormDriver
  },
  methods: {
    onDriverResultUpdate (result) {
      this.$set(this.raceResults, result.driver.userId, result.data)
    },
    isBestLap (driver) {
      // debugger
      if(this.raceResults[driver.userId]) {
        let resultsArr = Object.values(this.raceResults)
        function compare(a, b) {
          if (a.bestLapTime < b.bestLapTime)
            return -1
          if (a.bestLapTime > b.bestLapTime)
            return 1
          return 0
        }
        resultsArr.sort(compare)
        if(resultsArr[0].bestLapTime === this.raceResults[driver.userId].bestLapTime) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    closeWindow () {
      this.$emit('closeWindow')
    }
  }
}
</script>