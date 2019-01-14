<template>
  <div>
    <v-label>Add Stages</v-label>
    <StageItemForm
      v-for="(stage, i) in stages"
      :key="stage.hj"
      :_id="i"
      :_stage="stage"
      @addStage="addStage"
      @updateStage="updateStage"
      @removeStage="removeStage"
    />
    {{stages}}
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
          time: null
        }
      ],
      stagesCount: 1
    }
  },
  methods: {
    addStage() {
      var stage = {
        track: '',
        date: null,
        time: this.stages.time
      }
      this.stages.push(stage)
    },
    updateStage(stage, id) {
      debugger
      this.stages[id].track = stage.track
      this.stages[id].date = stage.date
      this.stages[id].time = stage.time
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