<template>
  <v-card class="mb-1">
    <v-form>
      <v-container>
        <v-layout align-center justify-center wrap>
          <v-flex class="subheading" xs12 sm3>{{_driver.username}}</v-flex>
          <v-flex sm7>
            <v-layout>
              <v-checkbox
                :disabled="result.dnf"
                v-model="result.dns"
                label="DNS"
                color="blue"
                :value="false"
                hide-details
              ></v-checkbox>
              <v-checkbox
                :disabled="result.dns"
                v-model="result.dnf"
                label="DNF"
                color="blue"
                :value="false"
                hide-details
              ></v-checkbox>
              <v-checkbox
                :disabled="result.dns"
                v-model="result.dq"
                label="DQ"
                color="red"
                :value="false"
                hide-details
              ></v-checkbox>
            </v-layout>
          </v-flex>
          <v-flex sm2>
            <BestLapIndicator v-if="_isBestLap"/>
          </v-flex>

          <v-flex xs12 sm3>
            <v-text-field
              :disabled="result.dns"
              v-validate="{required: true }"
              name="start"
              type="number"
              :error-messages="errors.collect('start')"
              label="Start"
              v-model="result.start"
            ></v-text-field>
          </v-flex>
          <v-flex xs10 sm3>
            <v-text-field
              :disabled="result.dns || result.dnf"
              v-validate="{required: true }"
              name="Finish"
              type="number"
              :error-messages="errors.collect('Finish')"
              label="Finish"
              v-model="result.finish"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <PositionDiff :_start="Number(result.start)" :_finish="Number(result.finish)"/>
          </v-flex>
          <v-flex xs5 sm2>
            <v-text-field
              :disabled="result.dns"
              v-validate="{required: true }"
              name="stops"
              type="number"
              :error-messages="errors.collect('Pit stops')"
              label="Pit stops"
              v-model="result.stops"
            ></v-text-field>
          </v-flex>
          <v-flex xs7 sm2>
            <v-text-field
              :disabled="result.dns"
              name="time"
              mask="#:##:###"
              :error-messages="errors.collect('Time')"
              label="Best lap time"
              v-model="result.bestLapTime"
            ></v-text-field>
          </v-flex>
          <v-flex sm1>PTS: {{points}}</v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import PositionDiff from '@/components/championship/results/PositionDiff.vue'
import BestLapIndicator from '@/components/championship/results/BestLapIndicator.vue'
import pointsSystem from '@/config/points-systems.js'

export default {
  name: 'ResultsFormDriver',
  data () {
    return {
      result: {
        start: null,
        finish: null,
        stops: null,
        bestLapTime: null,
        dq: false,
        dnf: false,
        dns: false
      }
    }
  },
  props: {
    _driver: Object,
    _isBestLap: Boolean
  },
  watch: {
    result: {
      handler: function(newResult) {
        let result = {}
        result.driver = this._driver
        result.data = newResult
        this.$set(result.data, 'points', this.points)
        this.$emit('driverResultUpdate', result)
      },
      deep: true
    }
  },
  computed: {
    points () {
      let finish = this.result.finish || ''
      let points = pointsSystem.f1()[finish]
      if(points) {
        return points
      } else {
        return '0'
      }
    }
  },
  components: {
    PositionDiff,
    BestLapIndicator
  }
}
</script>
