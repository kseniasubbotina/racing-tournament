<template>
  <div class="ma-2">
    <v-card>
      <v-card-text>
        <v-layout align-center wrap>
          <v-flex>
            <v-layout column align-center justify-center>
              <v-flex>
                <div class="subheading">{{_stage.date + ', ' + _stage.time}}</div>
              </v-flex>
              <v-flex>
                <div class="caption">Your local time</div>
              </v-flex>
              <v-flex>
                <CountryFlag :_country="_stage.stageCountry" :_width="60"/>
              </v-flex>

              <v-flex class="text-xs-center" v-if="userResult">
                <div>Finish: {{userResult.finish}}</div>
                <div>Points: {{userResult.points}}</div>
                <div>Experience: {{userResult.experience}}</div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-layout justify-center align-center>
          <v-btn
            v-if="isAuthor && !isClosed"
            flat
            color="green"
            @click="stageResultsWindow = true"
          >Edit results</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
    <v-dialog v-if="stageResultsWindow" scrollable v-model="stageResultsWindow" width="900px">
      <component
        @closeWindow="stageResultsWindow=false"
        :is="component"
        :_championship="_championship"
        :_stage="_stage"
        :_drivers="_drivers"
        :_results="_results"
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
    _championship: Object,
    _results: Object,
    _country: String,
    _stage: Object,
    _drivers: Object
  },
  computed: {
    userId() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.id
      }
    },
    isAuthor() {
    if (this.$store.getters.user && this._championship)
      return this.userId == this._championship.author.id
    },
    isClosed () {
      return this._championship.status === 'Closed' ? true : false
    },
    userResult () {
      if (this._results && this._results[this.userId]) {
        return this._results[this.userId][this._stage.trackDocumentId]
      } else {
        return false
      }
    }
  },
  components: {
    CountryFlag,
    ResultsForm
  }
}
</script>
