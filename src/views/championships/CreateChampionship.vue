<template>
  <v-flex sm11 xs12>
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">
        Create a championship
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-form>
          <v-layout>
            <v-flex xs12 sm6>
              <v-text-field
                label="Title"
                v-model="title"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                :items="gameTypesArray"
                v-model="gameType"
                label="Game types"
                single-line
                autocomplete
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-text-field
                v-model="gameDescription"
                label="Championship description"
                multi-line
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <p>Championship image</p>
              <picture-input
                ref="pictureInput"
                @change="onChanged"
                width="200"
                height="200"
                margin="16"
                accept="image/jpeg,image/png"
                size="10"
                :removable="true"
                :customStrings="{
                  upload: '<h1>This image has been loaded</h1>',
                  drag: 'Drag an image here'
                }">
              </picture-input>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs10>
              <v-select
                :items="racingSeriesArray"
                v-model="racingSerie"
                label="Racing seria"
                single-line
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex>
              <v-tooltip left>
                <v-btn slot="activator"
                  outline
                  small fab
                  color="primary"
                  class="question-btn">
                  <span>?</span>
                </v-btn>
                <span>This field will affect on points sistem and available tracks</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <h2 class="headline text-xs-left">Select tracks</h2>
          <v-layout>
            <v-flex xs12 sm4>
              <v-select
                :items="tracksArray"
                v-model="track"
                label="Track"
                single-line
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12 sm3>
              <v-menu
                ref="dateMenu1"
                :close-on-content-click="true"
                v-model="dateMenu1"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="dateFormatted"
                  label="Date"
                  persistent-hint
                  @blur="date = parseDate(dateFormatted)"
                ></v-text-field>
                <v-date-picker v-model="date" no-title @input="dateMenu1 = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm3>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="timeMenu1"
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
                  slot="activator"
                  v-model="time"
                  label="Time"
                  readonly
                ></v-text-field>
                <v-time-picker v-model="time" @change="$refs.menu.save(time)"></v-time-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm2>
              <v-btn color="success">Add</v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-switch
                color="primary"
                :label="'Allow consructors and teams selection'"
                v-model="ConstrTeamsSwitch"
              ></v-switch>
            </v-flex>
          </v-layout>
          <h3 class="subheading text-xs-left">Select from pre-defined teams</h3>
          <v-layout>
            <v-flex xs12 sm8>
              <v-select
                :items="preDefinedTeamsArray"
                v-model="preDefinedTeam"
                label="Team"
                single-line
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field
                label="Number of places"
                v-model="preDefinedPlaces"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-btn color="success">Add</v-btn>
            </v-flex>
          </v-layout>
          <h3 class="subheading text-xs-left">Select from custom teams</h3>
          <v-layout>
            <v-flex xs12 sm8>
              <v-select
                :items="customTeamsArray"
                v-model="customTeam"
                label="Team"
                single-line
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12 sm2>
              <v-text-field
                label="Number of places"
                v-model="customPlaces"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm2>
              <v-btn color="success">Add</v-btn>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-btn color="success">
                Add new team
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout class="mt-4">
            <v-flex sx12>
              <v-btn
                large
                color="success"
                @click="submit">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'CreateChampionship',
  data: () => ({
    title: null,
    gameTypesArray: ['Game1', 'Game2', 'Game3'],
    gameType: null,
    gameDescription: null,
    racingSeriesArray: ['SerieA', 'SerieB', 'SerieC'],
    racingSerie: null,
    tracksArray: ['Track1', 'Track2', 'Track3'],
    track: null,
    date: null,
    dateFormatted: null,
    dateMenu1: false,
    time: null,
    timeMenu1: false,
    ConstrTeamsSwitch: true,
    preDefinedTeamsArray: ['Team1', 'Team2', 'Team3'],
    preDefinedTeam: null,
    preDefinedPlaces: null,
    customTeamsArray: ['Team1', 'Team2', 'Team3'],
    customTeam: null,
    customPlaces: null

  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    onChanged: function () {
      console.log('New picture loaded')
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    onRemoved: function () {
      this.image = ''
    },
    attemptUpload: function () {
      if (this.image) {
        // axios
      }
    },
    submit: function () {
      //
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
    }
  },
  components: {
    PictureInput
  }
}
</script>

<style>
.question-btn span {
  font-size: 20px;
  color: #111;
}
</style>
