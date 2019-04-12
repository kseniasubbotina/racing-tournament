<template>
  <v-card class="mb-1 px-3">
    <v-layout align-center wrap>
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
      <v-flex>Gain: {{start - finish}}</v-flex>
      <v-flex>
        <v-text-field
          v-validate="{required: true }"
          name="time"
          mask="##:##:###"
          :error-messages="errors.collect('Time')"
          label="Best time"
          v-model="bestTime"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field
          v-validate="{required: true }"
          name="stops"
          type="number"
          :error-messages="errors.collect('Pit stops')"
          label="Pit stops"
          v-model="stops"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'ResultsFormDriver',
  data () {
    return {
      start: null,
      finish: null,
      stops: null,
      bestTime: null
    }
  },
  props: {
    _driver: Object
  }
}
</script>
