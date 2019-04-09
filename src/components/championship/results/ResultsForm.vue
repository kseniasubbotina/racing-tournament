<template>
  <v-card>
    <v-container>
      <v-card-title>Add results</v-card-title>
      <ResultsFormDriver v-for="driver in _drivers" :key="driver.id" :_driver="driver"/>
    </v-container>
  </v-card>
</template>

<script>
import ResultsFormDriver from '@/components/championship/results/ResultsFormDriver.vue'

export default {
  name: 'ResultsForm',
  props: {
    _drivers: Object
  },
  components: {
    ResultsFormDriver
  }
}
</script>