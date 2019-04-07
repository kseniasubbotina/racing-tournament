<template>
  <div class="ma-2">
    <a>
      <v-card>
        <v-card-text @click="stageResults = true">
          <v-layout align-center>
            <CountryFlag class="pr-3" :_country="_stage.stageCountry" :_width="60"/>
            <v-flex>
              <div>
                <h3>{{_stage.date + ', ' + _stage.time}}</h3>
              </div>
              <div>Your local time</div>
            </v-flex>
            <v-btn>Add results</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </a>
    <v-dialog v-model="stageResults" width="800px">
      <v-card>
        <v-card-title>stage results</v-card-title>
      </v-card>
    </v-dialog>
  </div>
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
      if (this._stage.utcDateTime) {
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
      } else {
        return ''
      } 
    },
    utcStageTimeConverted () {
      if (this._stage.utcDateTime) {
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
      } else {
        return ''
      }
    }
  },
  components: {
    CountryFlag
  }
}
</script>
