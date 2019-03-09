<template>
  <v-dialog v-model="gameDialog" max-width="700px">
    <v-card>
      <v-card-title v-if="!_isNew" class="title">Edit game</v-card-title>
      <v-card-title v-else class="title">Add game</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <form v-if="gameData">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Name"
                v-validate="'required|min:2'"
                type="text"
                name="name"
                :error-messages="errors.collect('name')"
                v-model="gameData.name"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-combobox
                v-model="gameData.platforms"
                :items="platformItems"
                label="Platform"
                multiple
                chips
              ></v-combobox>
            </v-flex>
            <v-flex xs12>
              <v-menu
                ref="menu"
                :close-on-content-click="false"
                v-model="menu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="gameData.releaseDate"
                  label="Release date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  ref="picker"
                  v-model="gameData.releaseDate"
                  :max="new Date().toISOString().substr(0, 10)"
                  min="1950-01-01"
                  @change="save"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-validate="{required: true }"
                name="developer"
                type="text"
                :error-messages="errors.collect('developer')"
                label="Developer"
                v-model="gameData.developer"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-validate="{required: true }"
                name="publisher"
                type="text"
                :error-messages="errors.collect('publisher')"
                label="Publisher"
                v-model="gameData.publisher"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Web-site"
                v-validate="'required|min:2'"
                type="text"
                name="Web-site"
                :error-messages="errors.collect('Web-site')"
                v-model="gameData.webSite"
              ></v-text-field>
            </v-flex>
            <ImageInput
              v-if="gameDialog"
              :_url="gameData.coverImageUrl"
              @deleteImage="deleteImage"
              @fileSelected="onfileSelected"
            />
          </v-layout>
        </form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red darken-2" flat @click="gameDialog=false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!_isNew"
          color="red darken-2"
          @click="updateGame(gameData)"
          :loading="imageLoading"
          dark
        >Save</v-btn>
        <v-btn v-else color="red darken-2" @click="addGame" :loading="imageLoading" dark>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ImageInput from '@/components/form-elements/ImageInput.vue'
import message from '@/components/Message.vue'
import fb from '@/firebase/config.js'
import games from '@/mixins/games/games.js'

export default {
  name: 'GameForm',
  data() {
    return {
      platformItems: ['PS4', 'Xbox One', 'PC', 'Other'],
      menu: false,
      gameData: {},
      selectedFile: null,
      imageLoading: false,
      gameDialog: false
    }
  },
  props: {
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  created() {
    this.getPlatforms()
  },
  mounted() {
    this.$root.$on('openGameDialog', this.openDialog)
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    openDialog(gameData) {
      this.gameData = gameData
      this.gameDialog = true
    },
    onfileSelected(file) {
      this.selectedFile = file
    },
    closeWindow() {
      this.gameDialog = false
      this.$store.commit('set', {
        type: 'message',
        val: { error: '', success: '' }
      })
    },
    getPlatforms() {
      var platformsArr = []
      fb.platformsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          platformsArr.push(data.name)
        })
        this.platformItems = platformsArr
      })
    }
  },
  mixins: [games],
  components: {
    message,
    ImageInput
  }
}
</script>
