<template>
  <v-card :key="_id">
    <v-card-actions>
      <v-layout align-center>
        <v-flex>{{_id + 1}}</v-flex>
        <v-flex>
          <TrackSelect @changeTrack="onchangeTrack" :_selectedTrack="track"/>
        </v-flex>
        <v-flex>
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
              v-model="date"
              label="Race Day"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs3>
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
              v-model="time"
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

        <v-flex xs2>
          <v-btn small fab flat depressed color="success" dark @click="addStage">
            <v-icon>add</v-icon>
          </v-btn>
          <v-btn small fab flat depressed color="red" dark @click="removeStage()">
            <v-icon>remove</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      {{date}} - {{time}}
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
      date: new Date().toISOString().substr(0, 10),
      time: null
    }
  },
  props: {
    _id: Number,
    _stage: Object
  },
  watch: {
    track() {
      debugger
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
      debugger
      var stage = {
        track: this.track,
        date: this.date,
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

