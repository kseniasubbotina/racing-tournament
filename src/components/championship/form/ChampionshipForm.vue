<template>
  <v-card>
    <v-container>
      <h1 v-if="_isNew">Create a championship</h1>
      <h1 v-else>Update a championship</h1>
    </v-container>
    <v-stepper v-model="step" vertical>
      <v-stepper-step color="success" :complete="step > 1" step="1">Championship information
        <!-- <small>Summarize if needed</small> -->
      </v-stepper-step>

      <v-stepper-content step="1">
        <ChampInfoForm :_champInfo="champInfo" @nextStep="nextStep" @backStep="step = 1"/>
      </v-stepper-content>

      <v-stepper-step color="success" :complete="step > 2" step="2">Session and Difficulty</v-stepper-step>

      <v-stepper-content step="2">
        <SessionSettingsForm
          :_champSettings="champSettingsProp"
          @nextStep="nextStep"
          @backStep="step = 1"
        />
      </v-stepper-content>

      <v-stepper-step color="success" :complete="step > 3" step="3">Calendar</v-stepper-step>

      <v-stepper-content step="3">
        <ChampCalendarForm :_calendar="calendarProp" @backStep="step = 2" @nextStep="nextStep"/>
      </v-stepper-content>

      <v-stepper-step color="success" :complete="step > 4" step="4">Extenal info</v-stepper-step>
      <v-stepper-content step="4">
        <ChampExternalInfo
          :_externalInfo="externalInfoProp"
          @nextStep="nextStep"
          @backStep="step = 3"
        />
      </v-stepper-content>

      <v-stepper-step color="success" step="5">Finish</v-stepper-step>
      <v-stepper-content step="5">
        <v-layout justify-center>
          <v-btn flat @click="step = 4">Back</v-btn>
          <v-btn
            v-if="_isNew"
            depressed
            :loading="imageLoading"
            dark
            color="green"
            @click="submit('set')"
          >Save</v-btn>
          <v-btn
            v-else
            depressed
            :loading="imageLoading"
            dark
            color="green"
            @click="submit('update', championship.documentId)"
          >Update</v-btn>
        </v-layout>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>


<script>
import ChampExternalInfo from '@/components/championship/form/ChampExternalInfo.vue'
import ChampInfoForm from '@/components/championship/form/ChampInfoForm.vue'
import SessionSettingsForm from '@/components/championship/form/SessionSettingsForm.vue'
import ChampCalendarForm from '@/components/championship/form/ChampCalendarForm.vue'
import championships from '@/mixins/championship/championship.js'
export default {
  name: 'ChampionshipForm',
  data: () => ({
    step: 1,
    championship: {},
    imageLoading: false
  }),
  props: {
    _championship: Object,
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.championship = this._championship
  },
  computed: {
    champInfo() {
      return this.championship ? this.championship.info : null
    },
    champSettingsProp() {
      return this.championship ? this.championship.settings : null
    },
    externalInfoProp() {
      return this.championship ? this.championship.externalInfo : null
    },
    calendarProp () {
      return this.championship ? this.championship.calendar : []
    },
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  methods: {
    nextStep(data, fieldName) {
      this.step++
      this.championship[fieldName] = data
    }
  },
  mixins: [championships],
  components: {
    ChampExternalInfo,
    ChampInfoForm,
    SessionSettingsForm,
    ChampCalendarForm
  }
}
</script>
