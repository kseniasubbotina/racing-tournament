<template>
  <v-card class="mb-1">
    <v-form>
      <v-container>
        <v-layout align-center wrap>
          <v-flex class="subheading" xs12>{{_driver.username}}</v-flex>
          <v-flex xs12 sm3>
            <v-text-field
              v-validate="{required: true }"
              name="start"
              type="number"
              :error-messages="errors.collect('start')"
              label="Start"
              v-model="start"
            ></v-text-field>
          </v-flex>
          <v-flex xs10 sm3>
            <v-text-field
              v-validate="{required: true }"
              name="Finish"
              type="number"
              :error-messages="errors.collect('Finish')"
              label="Finish"
              v-model="finish"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <PositionDiff :_start="Number(start)" :_finish="Number(finish)"/>
          </v-flex>
          <v-flex xs5 sm2>
            <v-text-field
              v-validate="{required: true }"
              name="stops"
              type="number"
              :error-messages="errors.collect('Pit stops')"
              label="Pit stops"
              v-model="stops"
            ></v-text-field>
          </v-flex>
          <v-flex xs7 sm3>
            <v-text-field
              name="time"
              mask="#:##:###"
              :error-messages="errors.collect('Time')"
              label="Best time"
              v-model="bestTime"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import PositionDiff from '@/components/championship/results/PositionDiff.vue'

export default {
  name: 'ResultsFormDriver',
  data () {
    return {
      start: null,
      finish: null,
      stops: null,
      bestTime: null
    }
  },
  props: {
    _driver: Object
  },
  components: {
    PositionDiff
  }
}
</script>
