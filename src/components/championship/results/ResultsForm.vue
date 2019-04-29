<template>
  <v-card>
    <v-card-text>
      <v-card-title
        class="title"
      >Add results for {{_stage.stageCountry}} Grand Prix - {{_stage.date}} - {{_stage.time}}</v-card-title>
      <ResultsFormDriver
        v-for="driver in _drivers"
        :_isBestLap="isBestLap(driver)"
        :key="driver.userId"
        :_driver="driver"
        :_results="_results"
        :_stage="_stage"
        @driverResultUpdate="onDriverResultUpdate"
      />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="error" @click="closeWindow">Cancel</v-btn>
        <v-btn :loading="isLoading" depressed dark color="green" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import results from '@/mixins/results/results.js'
import ResultsFormDriver from '@/components/championship/results/ResultsFormDriver.vue'

export default {
  name: 'ResultsForm',
  data () {
    return {
      results: {},
      isLoading: false
    }
  },
  props: {
    _championship: Object,
    _stage: Object,
    _drivers: Object,
    _results: Object
  },
  methods: {
    onDriverResultUpdate (result) {
      this.$set(this.results, result.driver.userId, result)
    },
    isBestLap (driver) {
      if(this.results[driver.userId]) {
        let resultsArr = Object.values(this.results)
        function compare(a, b) {
          if (a.bestLapTime < b.bestLapTime)
            return -1
          if (a.bestLapTime > b.bestLapTime)
            return 1
          return 0
        }
        resultsArr.sort(compare)
        if(resultsArr[0].bestLapTime && resultsArr[0].bestLapTime === this.results[driver.userId].bestLapTime) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    submit () {
      this.addResult(this._championship, this._stage, this.results)
    },
    closeWindow () {
      this.$emit('closeWindow')
    }
  },
  mixins: [
    results
  ],
  components: {
    ResultsFormDriver
  },
}
</script>