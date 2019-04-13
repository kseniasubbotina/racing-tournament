<template>
  <v-card>
    <v-container>
      <v-card-title
        class="title"
      >Add results for {{_stage.stageCountry}} Grand Prix - {{_stage.date}} - {{_stage.time}}</v-card-title>
      <ResultsFormDriver v-for="driver in _drivers" :key="driver.id" :_driver="driver"/>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat color="error" @click="closeWindow">Cancel</v-btn>
        <v-btn depressed dark color="green">Save</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
import ResultsFormDriver from '@/components/championship/results/ResultsFormDriver.vue'

export default {
  name: 'ResultsForm',
  props: {
    _drivers: Object,
    _stage: Object
  },
  components: {
    ResultsFormDriver
  },
  methods: {
    closeWindow () {
      this.$emit('closeWindow')
    }
  }
}
</script>