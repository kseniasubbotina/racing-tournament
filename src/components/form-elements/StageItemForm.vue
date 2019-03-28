<template>
  <v-card flat>
    <v-layout align-center wrap>
      <v-flex xs2 md1>
        <v-layout pr-1 justify-center>
          <CountryFlag :_country="_stage.stageCountry"/>
        </v-layout>
      </v-flex>
      <v-flex xs10 lg3 md3>
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
            :key="_stage.date"
            v-validate="'required'"
            name="date"
            :error-messages="errors.collect('date')"
            slot="activator"
            v-model="_stage.date"
            label="Race Day"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="_stage.date" @input="dateMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 md2>
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          v-model="timeMenu"
          :nudge-right="40"
          :return-value.sync="_stage.time"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            v-validate="'required'"
            name="time"
            :error-messages="errors.collect('time')"
            prepend-icon="access_time"
            slot="activator"
            v-model="_stage.time"
            label="Race Time"
            readonly
          ></v-text-field>
          <v-time-picker
            v-model="_stage.time"
            @change="$refs.menu.save(_stage.time)"
            header-color="primary"
            color="blue"
          >
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="timeMenu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(_stage.time)">OK</v-btn>
          </v-time-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 md3>
        <v-layout>
          <!-- <v-spacer></v-spacer> -->
          <v-btn small flat depressed fab color="red" dark @click="removeStage()">
            <v-icon>remove</v-icon>
          </v-btn>
          <v-btn v-if="_isLast" small fab flat depressed color="success" dark @click="addStage">
            <v-icon>add</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import idGenerator from '@/mixins/generateId'
import TrackSelect from '@/components/form-elements/TrackSelect.vue'
import CountryFlag from '@/components/CountryFlag.vue'
import moment from 'moment'

export default {
  name: 'StageItemForm',
  data() {
    return {
      stage: {
        track: '',
        trackId: '',
        date: '',
        time: null,
        stageCountry: ''
      },
      timeMenu: false,
      dateMenu: false,
      // track: '',
      // trackId: '',
      // date: '',
      // time: null,
      // stageCountry: '',
      isValidated: false
    }
  },
  props: {
    _isLast: Boolean,
    _index: Number,
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
  mounted () {
    this.stage = this._stage
    this.time = this._stage.time
  },
  methods: {
    addStage() {
      var validation = this.validate()
      validation
        .then(result => {
          if (result) {
            this.$emit('addStage')
          }
        })
        .catch(e => {
          console.log('Form is not valid')
        })
    },
    removeStage() {
      this.$emit('removeStage', this._index)
    },
    updateStage() {
      var stage = {
        id: idGenerator.generateId(),
        track: this.stage.track,
        country: this.stage.stageCountry,
        trackId: this.stage.trackId,
        date: this._stage.date || this.stage.date,
        time: this.stage.time,
        index: this._index
      }
      this.$emit('updateStage', stage)
    },
    validate() {
      return new Promise((resolve, reject) => {
        this.$validator.validate().then(result => {
          this.isValidated = result
          resolve(result)
        })
      })
    },
    onchangeTrack(data) {
      this.stage.track = data.name
      this.stage.stageCountry = data.country
      this.stage.trackId = data.id
    }
  },
  mixins: [
    idGenerator
  ],
  components: {
    TrackSelect,
    CountryFlag
  }
}
</script>

