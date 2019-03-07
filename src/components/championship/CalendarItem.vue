<template>
  <v-layout justify-center column align-center>
    <v-card @click.stop="stageResults = true">
      <v-container>
        <v-layout justify-center column align-center>
          <CountryFlag :_country="_stage.country" :_width="60"/>
          <div>{{_stage.date}}</div>
          <div>{{_stage.time}}</div>
        </v-layout>
      </v-container>
    </v-card>
    <v-dialog v-model="stageResults" width="800px">
      <v-card>
        <v-card-title>stage results</v-card-title>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'

export default {
  name: 'CalendarItem',
  data() {
    return {
      stageResults: false
    }
  },
  props: {
    _results: Object,
    _country: String,
    _stage: Object
  },
  components: {
    CountryFlag
  }
}
</script>
