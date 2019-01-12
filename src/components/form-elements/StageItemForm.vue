<template>
  <v-card>
    <v-card-actions>
      <v-layout align-center>
        <v-flex>{{_id + 1}} {{_name}}</v-flex>
        <v-flex>
          <TrackSelect @changeTrack="onchangeTrack"/>
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
              label="Picker without buttons"
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
              label="Time"
              readonly
            ></v-text-field>
            <v-time-picker
              v-model="time"
              color="green lighten-1"
              @change="$refs.menu.save(time)"
              header-color="primary"
            ></v-time-picker>
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
    _name: String
  },
  watch: {
    // stage: {
    //   handler: function(newVal) {
    //     debugger
    //     this.updateStage(newVal, this._id)
    //   },
    //   deep: true
    // },
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
      debugger
      this.$emit('addStage')
    },
    removeStage() {
      this.$emit('removeStage', this._id)
    },
    updateStage() {
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

