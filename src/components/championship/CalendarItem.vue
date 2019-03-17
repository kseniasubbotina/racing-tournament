<template>
  <v-layout justify-center column align-center>
    <v-card flat>
      <v-container>
        <a>
          <v-layout @click.stop="stageResults = true" justify-center column align-center>
            <CountryFlag :_country="_stage.country" :_width="60"/>
            <!-- <div>{{_stage.date}}</div>
            <div>{{_stage.time}}</div>-->
            <div>GMT +0: {{utcStageTimeConverted}}</div>
            <div>Your: {{browserStageTimeFormatted}}</div>
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
import moment from 'moment'
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
  computed: {
    browserStageTimeFormatted () {
      let browserStageTime = this._stage.utcDateTime.split(',')
      let convertedDate = new Date(Date.UTC(browserStageTime[0], browserStageTime[1], browserStageTime[2], browserStageTime[3], browserStageTime[4]))
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
      }
      
      return convertedDate.toLocaleString("en", options)
    },
    utcStageTimeConverted () {
      let browserStageTime = this._stage.utcDateTime.split(',')
      let convertedDate = new Date(browserStageTime[0], browserStageTime[1], browserStageTime[2], browserStageTime[3], browserStageTime[4])
      var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
      }
      
      return convertedDate.toLocaleString("en", options)
    }
  },
  components: {
    CountryFlag
  }
}
</script>
