<template>
  <div>
    <v-label>Add Stages</v-label>
    <v-alert type="info" :value="true">
      <div>Just set time of races in your time, it will adjust for other users timezones.</div>
    </v-alert>
    <StageItemForm
      v-for="(stage, i) in stages"
      :key="i"
      :_isLast="stagesCount - 1 == i"
      :_index="stage.index"
      :_stage="stage"
      @addStage="addStage"
      @updateStage="updateStage"
      @removeStage="removeStage"
    />
    <v-layout justify-end>
      <v-btn flat @click="$emit('backStep')">Back</v-btn>
      <v-btn :disabled="!isValid" depressed color="green white--text" @click="nextStep">Continue</v-btn>
    </v-layout>
  </div>
</template>

<script>
import StageItemForm from '@/components/form-elements/StageItemForm.vue'
export default {
  name: 'ChampCalendarForm',
  data() {
    return {
      stages: [
        {
          track: '',
          date: '',
          stageCountry: '',
          time: null,
          index: Math.random()
        }
      ]
    }
  },
  props: {
    _calendar: Array
  },
  created() {
    this.fetchCalendar()
  },
  computed: {
    stagesCount() {
      return this.stages.length
    },
    isValid() {
      var isValid = false
      this.stages.forEach((stage, i) => {
        if (!stage.track || !stage.date || !stage.time) {
          isValid = false
        } else {
          isValid = true
        }
      })
      return isValid
    }
  },
  methods: {
    fetchCalendar() {
      if (this._calendar) this.stages = this._calendar
    },
    nextStep() {
      this.$emit('nextStep', this.stages, 'calendar')
    },
    addStage() {
      var stage = {
        track: '',
        date: '',
        time: null,
        index: Math.random()
      }
      this.stages.push(stage)
    },
    updateStage(stage) {
      let arayIndex = null
      // Пихать это в этап при отправке на сервер а не тут
      // stage.date = this.dateTimeToUtc(stage.date, stage.time, 'date')
      // stage.time = this.dateTimeToUtc(stage.date, stage.time, 'time')
      this.stages.forEach((item, i, arr) => {
        if (item.index == stage.index) {
          arayIndex = i
        }
      })
      this.stages.splice(arayIndex, 1, stage)
    },
    removeStage(id) {
      if (this.stages.length !== 1) {
        let index = null
        this.stages.forEach((item, i, arr) => {
          if (item.index == id) {
            index = i
          }
        })
        this.stages.splice(index, 1)
      }
    },
    dateTimeToUtc (date, time, type) {
      if(date && time) {
        let dateArr = date.split('-')
        let timeArr = time.split(':')
        let localStageDateTIme = new Date(dateArr[0], dateArr[1]-1, dateArr[2], timeArr[0], timeArr[1])
        let year = localStageDateTIme.getUTCFullYear()
        let month = localStageDateTIme.getUTCMonth()
        let day = localStageDateTIme.getUTCDate()
        let hours = localStageDateTIme.getUTCHours()
        let minutes = localStageDateTIme.getUTCMinutes()
        // let utcDateTime = year + ', ' + month + ', ' + day + ', ' + hours + ', ' + minutes
        if(type == 'date') {
          return year + '-' + month + '-' + day
        } else if(type == 'time') {
          return hours + ':' + minutes
        }
        // return utcDateTime.toString()
      } else {
        return ''
      }
    }
  },
  components: {
    StageItemForm
  }
}
</script>