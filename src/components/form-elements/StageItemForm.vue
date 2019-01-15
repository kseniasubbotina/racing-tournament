<template>
  <v-card>
    <v-card-actions>
      <v-layout align-center wrap>
        <v-flex xs12 md4>
          <TrackSelect @changeTrack="onchangeTrack" :_selectedTrack="_stage.track || ''"/>
        </v-flex>
        <v-flex xs12 md3>
          <v-menu
            :close-on-content-click="false"
            v-model="dateMenu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="_stage.date"
              label="Race Day"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="_stage.date" @input="dateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 md3>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="timeMenu"
            :nudge-right="40"
            :return-value.sync="time"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <v-text-field
              prepend-icon="access_time"
              slot="activator"
              v-model="_stage.time"
              label="Race Time"
              readonly
            ></v-text-field>
            <v-time-picker
              v-model="time"
              @change="$refs.menu.save(time)"
              header-color="primary"
              color="blue"
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
            </v-time-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 md2>
          <v-btn v-if="_isLast" small flat depressed color="success" dark @click="addStage">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn small flat depressed color="red" dark @click="removeStage()">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import TrackSelect from '@/components/form-elements/TrackSelect.vue'

export default {
  name: 'StageItemForm',
  data() {
    return {
      timeMenu: false,
      dateMenu: false,
      track: '',
      date: null,
      time: null
    }
  },
  props: {
    _isLast: Boolean,
    _id: Number,
    _stage: Object
  },
  watch: {
    track() {
      this.updateStage()
    },
    date() {
      this.updateStage()
    },
    time() {
      this.updateStage()
    }
  },
  methods: {
    addStage() {
      this.$emit('addStage')
    },
    removeStage() {
      this.$emit('removeStage', this._id)
    },
    updateStage() {
      var stage = {
        track: this.track,
        date: this._stage.date || this.date,
        time: this.time
      }
      this.$emit('updateStage', stage, this._id)
    },
    onchangeTrack(track, id) {
      this.track = track
      // this.stages.$set(id, track)
      // this.stages.splice(id, 1, track)
    }
  },
  components: {
    TrackSelect
  }
}
</script>

