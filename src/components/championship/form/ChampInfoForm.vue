<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm9>
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
      <v-flex xs12 sm3>
        <v-text-field
          v-validate="'required|min:1|numeric'"
          name="players"
          type="number"
          :error-messages="errors.collect('players')"
          label="Maximum Drivers"
          v-model="playersCount"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <GameSelect :_disabled="true" :_selectedGame="game.name" @changeGame="onChangeGame"/>
      </v-flex>
      <v-flex>
        <PlatformSelect :_selectedPlatform="platform" @changePlatform="onChangePlatform"/>
      </v-flex>
      <v-flex>
        <SeriaSelect :_disabled="true" :_selectedSeria="seria" @changeSeria="onChangeSeria"/>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center v-if="seria === 'F1'">
      <v-flex
        shrink
        class="px-3 champ-info-form_fastest-lap"
        :class="{'selected' : fastestLapPoint}"
      >
        <v-checkbox
          width="500px"
          color="#c002c0"
          v-model="fastestLapPoint"
          label="Award extra point to driver who sets fastest lap in a grand prix"
        ></v-checkbox>
      </v-flex>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12>
        <div class="mt-2">Description</div>
        <vue-editor v-model="description" :editorToolbar="customToolbar"></vue-editor>
      </v-flex>
      <v-flex>
        Championship image
        <ImageInput :_url="champImage" @fileSelected="onfileSelected"/>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
      <v-btn depressed :disabled="!isValid" dark color="green" @click="nextStep">Continue</v-btn>
    </v-layout>
  </div>
</template>

<script>
import SeriaSelect from '@/components/form-elements/SeriaSelect.vue'
import PlatformSelect from '@/components/form-elements/PlatformSelect.vue'
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
      platform: '',
      playersCount: 20,
      champImage: '',
      selectedFile: null,
      isValid: true,
      fastestLapPoint: false,
      customToolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }]
      ]
    }
  },
  props: {
    _champInfo: Object
  },
  mounted() {
    this.fetchInfo()
  },
  methods: {
    fetchInfo() {
      if (this._champInfo) {
        this.champName = this._champInfo.name
        this.description = this._champInfo.description
        this.champImage = this._champInfo.champImage
        this.platform = this._champInfo.platform
        this.fastestLapPoint = this._champInfo.fastestLapPoint
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
              platform: this.platform,
              playersCount: this.playersCount,
              champImage: this.champImage,
              fastestLapPoint: this.fastestLapPoint,
              createdDate: new Date()
            },
            selectedFile: this.selectedFile
          }
          this.$emit('nextStep', data, 'data')
        }
      })
    },
    onChangePlatform(val) {
      this.platform = val
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
    PlatformSelect,
    GameSelect,
    ImageInput
  }
}
</script>