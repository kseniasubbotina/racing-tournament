<template>
  <v-card>
    <v-card-text>
      <v-card-title
        class="title"
      >Add results for {{_stage.stageCountry}} Grand Prix - {{_stage.date}} - {{_stage.time}}</v-card-title>
      <ResultsFormDriver
        v-for="driver in _drivers"
        :key="driver.userId"
        :_fastestLapPoint="_championship.info.fastestLapPoint"
        :_driver="driver"
        :_drivers="_drivers"
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
      result: {},
      isLoading: false,
      results: {}
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
      let stageId = this._stage.trackDocumentId
      let stageUserResult = {
        [stageId]: result
      }
      this.result = stageUserResult

      let results = this._results
      if(!results[result.driver.userId]) {
        results[result.driver.userId] = {}
      }

      if (!results.drivers) {
        results.drivers = []
      }
      // Add all users with results in this champ to Array
      // It will help us to find users results even if they has quit the championship
      const matchedUser = results.drivers.filter(driver => driver.indexOf(result.driver.userId) > -1)
      if(!matchedUser.length) {
        results.drivers.push(result.driver.userId)
      }

      results[result.driver.userId][stageId] = result
      this.results = results
    },
    submit () {
      let results = this.results
      results.championshipInfo = this._championship.info
      this.addResult(this._championship, results)
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