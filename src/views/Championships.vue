<template>
  <v-flex>
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
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-text-field
                v-model="gameDescription"
                label="Game description"
                textarea
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
        </v-form>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'Championships',
  data: () => ({
    title: null,
    gameTypesArray: ['Game1', 'Game2', 'Game3'],
    gameType: null,
    gameDescription: null
  }),
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
    }
  },
  components: {
    PictureInput
  }
}
</script>
