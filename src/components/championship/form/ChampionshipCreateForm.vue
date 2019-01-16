<template>
  <v-stepper v-model="e6" vertical>
    <v-stepper-step color="success" :complete="e6 > 1" step="1">Championship information
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>

    <v-stepper-content step="1">
      <ChampInfoForm @nextStep="e6 = 2" @backStep="e6 = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="e6 > 2" step="2">Session and Difficulty</v-stepper-step>

    <v-stepper-content step="2">
      <SessionSettingsForm @nextStep="e6 = 3" @backStep="e6 = 1"/>
    </v-stepper-content>

    <v-stepper-step color="success" :complete="e6 > 3" step="3">Calendar</v-stepper-step>

    <v-stepper-content step="3">
      <ChampCalendarForm/>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat @click="e6 = 2">Back</v-btn>
    </v-stepper-content>

    <v-stepper-step color="success" step="4">Finish</v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat @click="e6 = 3">Back</v-btn>
    </v-stepper-content>
  </v-stepper>
  <!-- <v-card>
        <v-card-title class="py-4 title">
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
                    
                <v-autocomplete
                    :items="gameTypesArray"
                    v-model="gameType"
                    label="Game types"
                    single-line
                ></v-autocomplete>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                <v-textarea
                    v-model="gameDescription"
                    label="Championship description"
                ></v-textarea>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                <p>Championship image</p>
                <picture-input 
                    ref="pictureInput"
                    width="300" 
                    height="300" 
                    margin="16" 
                    accept="image/jpeg,image/png" 
                    size="10" 
                    button-class="btn"
                    :custom-strings="{
                    upload: '<h1>Bummer!</h1>',
                    drag: 'Drag a 😺 GIF or GTFO'
                    }"
                >
                </picture-input>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs10>
                <v-autocomplete
                    :items="racingSeriesArray"
                    v-model="racingSerie"
                    label="Racing seria"
                    single-line
                ></v-autocomplete>
                </v-flex>
                <v-flex>
                <v-tooltip left>
                    <v-btn slot="activator"
                    dark
                    outline
                    small fab
                    color="red darken-2" 
                    class="question-btn">
                    <span class="text-white">?</span>
                    </v-btn>
                    <span>This field will affect on points sistem and available tracks</span>
                </v-tooltip>
                </v-flex>
            </v-layout>
            <h2 class="headline text-xs-left">Select tracks</h2>
            <v-layout>
                <v-flex xs12 sm4>
                <v-autocomplete
                    :items="tracksArray"
                    v-model="track"
                    label="Track"
                    single-line
                ></v-autocomplete>
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
                <v-btn color="red darken-2" dark >Add</v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                <v-switch
                    color="red darken-2" 
                    :label="'Allow consructors and teams selection'"
                    v-model="ConstrTeamsSwitch"
                ></v-switch>
                </v-flex>
            </v-layout>
            <h3 class="subheading text-xs-left">Select from pre-defined teams</h3>
            <v-layout>
                <v-flex xs12 sm8>
                <v-autocomplete
                    :items="preDefinedTeamsArray"
                    v-model="preDefinedTeam"
                    label="Team"
                    single-line
                ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm2>
                <v-text-field
                    label="Number of places"
                    v-model="preDefinedPlaces"
                ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                <v-btn color="red darken-2" dark >Add</v-btn>
                </v-flex>
            </v-layout>
            <h3 class="subheading text-xs-left">Select from custom teams</h3>
            <v-layout>
                <v-flex xs12 sm8>
                <v-autocomplete
                    :items="customTeamsArray"
                    v-model="customTeam"
                    label="Team"
                    single-line
                ></v-autocomplete>
                </v-flex>
                <v-flex xs12 sm2>
                <v-text-field
                    label="Number of places"
                    v-model="customPlaces"
                ></v-text-field>
                </v-flex>
                <v-flex xs12 sm2>
                <v-btn color="red darken-2" dark >Add</v-btn>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex>
                <v-btn color="red darken-2" dark >
                    Add new team
                </v-btn>
                </v-flex>
            </v-layout>
            <v-layout class="mt-4">
                <v-flex sx12>
                <v-btn
                    large
                    color="red darken-2" dark 
                    @click="submit">Submit</v-btn>
                </v-flex>
            </v-layout>
            </v-form>
        </v-container>
  </v-card>-->
</template>


<script>
import ChampInfoForm from '@/components/championship/form/ChampInfoForm.vue'
import SessionSettingsForm from '@/components/championship/form/SessionSettingsForm.vue'
import ChampCalendarForm from '@/components/championship/form/ChampCalendarForm.vue'
export default {
  name: 'CreateChampionshipForm',
  data: () => ({
    e6: 3
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    onChanged() {
      console.log('New picture loaded')
      if (this.$refs.pictureInput.file) {
        this.image = this.$refs.pictureInput.file
      } else {
        console.log('Old browser. No support for Filereader API')
      }
    },
    onRemoved: function() {
      this.image = ''
    },
    attemptUpload: function() {
      if (this.image) {
        // axios
      }
    },
    submit() {
      //
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${day.padStart(2, '0')}-${month.padStart(2, '0')}`
    }
  },
  components: {
    ChampInfoForm,
    SessionSettingsForm,
    ChampCalendarForm
  }
}
</script>
