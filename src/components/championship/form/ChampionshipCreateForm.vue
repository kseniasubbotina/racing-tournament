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
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
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
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    updateData(data) {
      //
    },
    onChanged() {
      console.log('New picture loaded')
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    onRemoved: function() {
      this.image = ''
    },
    attemptUpload: function() {
      if (this.image) {
        // axios
      }
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
