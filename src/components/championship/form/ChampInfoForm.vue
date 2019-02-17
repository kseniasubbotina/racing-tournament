<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="Championship Name"
          v-model="champName"
          v-validate="'required|min:5|max:50'"
          counter="50"
          type="text"
          name="Name"
          :error-messages="errors.collect('Name')"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <GameSelect :_disabled="true" :_selectedGame="game.name" @changeGame="onChangeGame"/>
      </v-flex>
      <v-flex>
        <SeriaSelect :_disabled="true" :_selectedSeria="seria" @changeSeria="onChangeSeria"/>
      </v-flex>
      <v-text-field
        v-validate="'required|min:1|numeric'"
        name="players"
        type="number"
        :error-messages="errors.collect('players')"
        label="Maximum Drivers"
        v-model="playersCount"
      ></v-text-field>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <v-textarea
          name="Description"
          label="Description"
          v-model="description"
          hint="Not required"
          v-validate="'max:50'"
          :error-messages="errors.collect('Description')"
          counter="50"
        ></v-textarea>
      </v-flex>
      <v-flex>Championship image
        <ImageInput :_url="champImage" @fileSelected="onfileSelected"/>
      </v-flex>
    </v-layout>
    <v-btn :disabled="!isValid" color="primary" @click="nextStep">Continue</v-btn>
    <v-btn flat @click="$emit('backStep')">Back</v-btn>
  </div>
</template>

<script>
import SeriaSelect from '@/components/SeriaSelect.vue'
import GameSelect from '@/components/form-elements/GameSelect.vue'
import ImageInput from '@/components/form-elements/ImageInput.vue'

export default {
  name: 'ChampInfoForm',
  data() {
    return {
      champName: '',
      seria: 'F1',
      description: '',
      game: 'F1 2018',
      playersCount: 20,
      champImage: '',
      selectedFile: null,
      isValid: true
    }
  },
  props: {
    _champInfo: Object
  },
  mounted() {
    this.fetchInfo()
  },
  // watch: {
  //   champName(val) {
  //     debugger
  //     this.validate()
  //   }
  // },
  methods: {
    fetchInfo() {
      if (this._champInfo) {
        this.champName = this._champInfo.name
        this.description = this._champInfo.description
        this.champImage = this._champInfo.champImage
        if (this._champInfo.name.length > 4) this.isValid = true
      }
    },
    nextStep() {
      this.$validator.validate().then(result => {
        if (result) {
          let data = {
            info: {
              name: this.champName,
              seria: this.seria,
              description: this.description,
              game: this.game,
              playersCount: this.playersCount,
              champImage: this.champImage,
              createdDate: new Date()
            },
            selectedFile: this.selectedFile
          }
          this.$emit('nextStep', data, 'data')
        }
      })
    },
    onChangeSeria(val) {
      this.seria = val
    },
    onChangeGame(val) {
      this.game = {
        name: val.name,
        documentId: val.id
      }
    },
    onfileSelected(file) {
      this.selectedFile = file
    },
    validate(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.isValid = true
        } else {
          this.isValid = false
        }
      })
    }
  },
  components: {
    SeriaSelect,
    GameSelect,
    ImageInput
  }
}
</script>