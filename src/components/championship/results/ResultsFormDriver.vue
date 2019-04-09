<template>
  <v-layout>
    <v-flex>{{_driver.username}}</v-flex>
    <v-flex>
      <v-text-field
        v-validate="{required: true }"
        name="start"
        type="number"
        :error-messages="errors.collect('start')"
        label="Start"
        v-model="start"
      ></v-text-field>
    </v-flex>
    <v-flex>
      <v-text-field
        v-validate="{required: true }"
        name="Finish"
        type="number"
        :error-messages="errors.collect('Finish')"
        label="Finish"
        v-model="finish"
      ></v-text-field>
    </v-flex>
    <v-flex>Gain</v-flex>
    <v-flex>
      <v-text-field
        v-validate="{required: true }"
        name="time"
        type="time"
        :error-messages="errors.collect('Time')"
        label="Best time"
        v-model="bestTime"
      ></v-text-field>
    </v-flex>
    <v-flex>Stops</v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'ResultsFormDriver',
  data () {
    return {
      start: null,
      finish: null,
      bestTime: null
    }
  },
  props: {
    _driver: Object
  }
}
</script>
