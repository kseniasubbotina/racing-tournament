<template>
  <div class="ma-2">
    <v-card>
      <v-card-text>
        <v-layout align-center wrap>
          <v-flex>
            <v-layout align-start>
              <v-flex>
                <CountryFlag class="pr-3" :_country="_stage.stageCountry" :_width="60"/>
              </v-flex>
              <v-flex>
                <div class="subheading">{{_stage.date + ', ' + _stage.time}}</div>
                <div class="caption">Your local time</div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-btn @click="stageResultsWindow = true">Add results</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-dialog scrollable fullscreen v-model="stageResultsWindow" width="900px">
      <component
        @closeWindow="stageResultsWindow=false"
        :is="component"
        :_drivers="_drivers"
        :_stage="_stage"
      />
    </v-dialog>
  </div>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'
import ResultsForm from '@/components/championship/results/ResultsForm.vue'
export default {
  name: 'CalendarItem',
  data() {
    return {
      stageResultsWindow: false,
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
