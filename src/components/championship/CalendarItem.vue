<template>
  <v-layout justify-center column align-center>
    <v-card flat>
      <v-container>
        <a>
          <v-layout @click.stop="stageResults = true" justify-center column align-center>
            <CountryFlag :_country="_stage.country" :_width="60"/>
            <div>{{_stage.date}}</div>
            <div>{{_stage.time}}</div>
          </v-layout>
        </a>
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
