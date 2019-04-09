<template>
  <div class="ma-2">
    <a>
      <v-card>
        <v-card-text>
          <v-layout align-center>
            <CountryFlag class="pr-3" :_country="_stage.stageCountry" :_width="60"/>
            <v-flex>
              <div>
                <h3>{{_stage.date + ', ' + _stage.time}}</h3>
              </div>
              <div>Your local time</div>
            </v-flex>
            <v-btn @click="stageResults = true">Add results</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </a>
    <v-dialog v-model="stageResults" width="800px">
      <component :is="component" :_drivers="_drivers"/>
    </v-dialog>
  </div>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'
import moment from 'moment'
import ResultsForm from '@/components/championship/results/ResultsForm.vue'
export default {
  name: 'CalendarItem',
  data() {
    return {
      stageResults: false,
      component: 'ResultsForm'
    }
  },
  props: {
    _results: Object,
    _country: String,
    _stage: Object,
    _drivers: Object

  },
  components: {
    CountryFlag,
    ResultsForm
  }
}
</script>
