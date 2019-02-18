<template>
  <div>
    <v-label>Add Stages</v-label>
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
      <v-btn :disabled="!isValid" depressed dark color="green" @click="nextStep">Continue</v-btn>
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
          date: null,
          time: null,
          index: Math.random()
        }
      ]
    }
  },
  props: {
    _calendar: Array
  },
  mounted() {
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
        country: '',
        date: null,
        time: this.stages.time,
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
          if (item.id == id) {
            index = i
          }
        })
        this.stages.splice(index, 1)
      }
    }
  },
  components: {
    StageItemForm
  }
}
</script>