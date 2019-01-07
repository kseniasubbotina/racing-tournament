<template>
  <div>
    <v-label>Add Stages</v-label>
    <v-card v-for="(stage, i) in stages" :key="stage.i">
      <v-card-actions>
        <v-layout align-center>
          <v-flex>
            <TrackSelect/>
          </v-flex>
          <v-flex>
            <v-menu
              :close-on-content-click="false"
              v-model="stage.dateMenu"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="stage.date"
                label="Picker without buttons"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="stage.date" @input="stage.dateMenu = false"></v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs3>
            <v-menu
              ref="menu"
              :close-on-content-click="false"
              v-model="stage.timeMenu"
              :nudge-right="40"
              :return-value.sync="stage.time"
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
                v-model="stage.time"
                label="Time"
                readonly
              ></v-text-field>
              <v-time-picker
                v-model="stage.time"
                color="green lighten-1"
                @change="$refs.menu[i].save(stage.time)"
                header-color="primary"
              ></v-time-picker>
            </v-menu>
          </v-flex>

          <v-flex xs2>
            <v-spacer/>
            <v-btn small fab flat depressed color="success" dark @click="addStage">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn
              small
              fab
              v-if="stages.length !== 1"
              flat
              depressed
              color="red"
              dark
              @click="removeStage(i)"
            >
              <v-icon>remove</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TrackSelect from '@/components/form-elements/TrackSelect.vue'
export default {
  name: 'ChampCalendarForm',
  data() {
    return {
      time: null,
      timeMenu1: false,
      stages: [
        {
          timeMenu: false,
          dateMenu: false,
          track: '',
          date: new Date().toISOString().substr(0, 10),
          time: null
        }
      ],
      dateMenu: false,
      date: null,
      time: null
    }
  },
  methods: {
    save(time, i) {
      debugger
      this.$refs.menu[i].save(time)
    },
    addStage() {
      var newStage = {
        timeMenu: false,
        dateMenu: false,
        track: '',
        date: new Date().toISOString().substr(0, 10),
        time: null
      }
      this.stages.push(newStage)
    },
    removeStage(i) {
      if (this.stages.length !== 1) this.stages.splice(i, 1)
    }
  },
  components: {
    TrackSelect
  }
}
</script>