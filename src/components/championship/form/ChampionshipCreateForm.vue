<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step color="success" :complete="e6 > 1" step="1">Championship information
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <ChampInfoForm @nextStep="e6 = 2" @backStep="e6 = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="e6 > 2" step="2">Session and Difficulty</v-stepper-step>

    <v-stepper-content step="2">
      <SessionSettingsForm @nextStep="e6 = 3" @backStep="e6 = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="e6 > 3" step="3">Calendar</v-stepper-step>

    <v-stepper-content step="3">
      <ChampCalendarForm @updateData="updateData"/>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat @click="e6 = 2">Back</v-btn>
    </v-stepper-content>

    <v-stepper-step color="success" step="4">Finish</v-stepper-step>
    <v-stepper-content step="4">
      YouTube or Twitch Link,
      another info
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat @click="e6 = 3">Back</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>


<script>
import ChampInfoForm from '@/components/championship/form/ChampInfoForm.vue'
import SessionSettingsForm from '@/components/championship/form/SessionSettingsForm.vue'
import ChampCalendarForm from '@/components/championship/form/ChampCalendarForm.vue'
export default {
  name: 'CreateChampionshipForm',
  data: () => ({
    e6: 3
  }),
  methods: {
    updateData(data) {
      debugger
    },
    onRemoved: function() {
      this.image = ''
    },
    submit() {
      //
    }
  },
  components: {
    ChampInfoForm,
    SessionSettingsForm,
    ChampCalendarForm
  }
}
</script>
