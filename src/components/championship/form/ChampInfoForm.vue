<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          label="Championship Name"
          v-model="champName"
          v-validate="'required|min:3|max:50'"
          counter="50"
          type="text"
          name="Name"
          :error-messages="errors.collect('Name')"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <GameSelect :_disabled="true" :_selectedGame="game" @changeGame="onChangeGame"/>
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
    <v-btn color="primary" @click="$emit('nextStep')">Continue</v-btn>
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
      seria: '',
      description: '',
      game: 'F1 2018',
      playersCount: 20,
      champImage: '',
      selectedFile: null
    }
  },
  methods: {
    onChangeSeria(val) {
      this.seria = val
    },
    onChangeGame(val) {
      this.game = val
    },
    onfileSelected(file) {
      this.selectedFile = file
    }
  },
  components: {
    SeriaSelect,
    GameSelect,
    ImageInput
  }
}
</script>