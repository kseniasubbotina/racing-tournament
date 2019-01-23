<template>
  <v-stepper v-model="step" vertical>
    <v-stepper-step color="success" :complete="step > 1" step="1">Championship information
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <ChampInfoForm @nextStep="nextStep" @backStep="step = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="step > 2" step="2">Session and Difficulty</v-stepper-step>

    <v-stepper-content step="2">
      <SessionSettingsForm @nextStep="nextStep" @backStep="step = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="step > 3" step="3">Calendar</v-stepper-step>

    <v-stepper-content step="3">
      <ChampCalendarForm @backStep="step = 2" @nextStep="nextStep"/>
    </v-stepper-content>

    <v-stepper-step color="success" step="4">Finish</v-stepper-step>
    <v-stepper-content step="4">
      YouTube or Twitch Link,
      another info
      <v-btn :loading="imageLoading" color="primary" @click="submit">Continue</v-btn>
      <v-btn flat @click="step = 3">Back</v-btn>
    </v-stepper-content>
    {{championship}}
  </v-stepper>
</template>


<script>
import ChampInfoForm from '@/components/championship/form/ChampInfoForm.vue'
import SessionSettingsForm from '@/components/championship/form/SessionSettingsForm.vue'
import ChampCalendarForm from '@/components/championship/form/ChampCalendarForm.vue'
import championships from '@/mixins/championship/championship.js'
export default {
  name: 'CreateChampionshipForm',
  data: () => ({
    step: 1,
    championship: {},
    imageLoading: false
  }),
  computed: {
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
    ChampInfoForm,
    SessionSettingsForm,
    ChampCalendarForm
  }
}
</script>
