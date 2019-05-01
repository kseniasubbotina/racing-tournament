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
import convertDateTime from '@/mixins/convertDateTime.js'
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
      let stages = this.stages
      for (let i in stages) {
        let stage = stages[i]
        stage.date = this.dateTimeToUtc(stage.date, stage.time, 'date')
        stage.time = this.dateTimeToUtc(stage.date, stage.time, 'time')
      }
      this.$emit('nextStep', stages, 'calendar')
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
    }
  },
  mixins: [
    convertDateTime
  ],
  components: {
    StageItemForm
  }
}
</script>