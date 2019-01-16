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
  computed: {
    stagesCount() {
      return this.stages.length
    }
  },
  methods: {
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