<template>
  <div>
    <v-label>Add Stages</v-label>
    <StageItemForm
      v-for="(stage, i) in stages"
      :key="i"
      :_isLast="stagesCount - 1 == i"
      :_id="stage.id"
      :_stage="stage"
      @addStage="addStage"
      @updateStage="updateStage"
      @removeStage="removeStage"
    />
    <v-btn color="primary" @click="nextStep">Continue</v-btn>
    <v-btn flat @click="$emit('backStep')">Back</v-btn>
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
          id: Math.random()
        }
      ]
    }
  },
  watch: {
    // stages: {
    //   handler: function(newValue) {
    //     this.nextStep(newValue)
    //   },
    //   deep: true
    // }
  },
  computed: {
    stagesCount() {
      return this.stages.length
    }
  },
  methods: {
    nextStep() {
      this.$emit('nextStep', this.stages, 'calendar')
    },
    addStage() {
      var stage = {
        track: '',
        date: null,
        time: this.stages.time,
        id: Math.random()
      }
      this.stages.push(stage)
    },
    updateStage(stage, id) {
      let index = null
      this.stages.forEach((item, i, arr) => {
        if (item.id == id) {
          index = i
        }
      })
      this.stages[index].track = stage.track
      this.stages[index].date = stage.date
      this.stages[index].time = stage.time
    },
    removeStage(i) {
      if (this.stages.length !== 1) {
        this.stages.splice(i, 1)
      }
    }
  },
  components: {
    StageItemForm
  }
}
</script>