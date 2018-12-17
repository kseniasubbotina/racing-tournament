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
            <v-flex xs12 class="text-xs-center">
              <div v-if="selectedFile">{{selectedFile.name}}</div>
              <div v-else>Cover Image</div>
              <v-layout justify-center align-center column wrap>
                <v-flex>
                  <img width="300px" :src="gameData.coverImageUrl" alt>
                  <br>
                </v-flex>
                <v-flex>
                  <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                  <v-btn
                    @click="deleteImage(gameData.id)"
                    v-if="gameData.coverImageUrl"
                    flat
                    color="error"
                  >Delete</v-btn>
                  <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
                </v-flex>
                <message/>
              </v-layout>
            </v-flex>
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
import message from '@/components/Message.vue'
import fb from '@/firebase/config.js'

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
    _gameData: {
      type: Object
    },
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    _gameData(val) {
      this.gameData = val
    },
    menu(val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    }
  },
  mounted() {
    this.$root.$on('openGameDialog', this.openDialog)
    if (this._gameData) {
      this.gameData = this._gameData
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    openDialog(gameData) {
      this.gameData = gameData
      this.gameDialog = true
    },
    onFileSelected(event) {
      let type = event.target.files[0].type
      if (type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg') {
        this.selectedFile = event.target.files[0]
        this.gameCoverImageUrl = ''
      } else {
        this.$store.commit('setMessage', {
          type: 'error',
          text: 'Incorrect type of file. Only PNG, JPEG allowed.'
        })
      }
    },
    closeWindow() {
      this.gameDialog = false
      this.$store.commit('set', {
        type: 'message',
        val: { error: '', success: '' }
      })
    },
    addGame() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async id => {
              let upload = await this.uploadImage(this.gameData.name)
            }
            upload().then(() => {
              fb.gamesCollection
                .doc(this.gameData.name)
                .set({
                  name: this.gameData.name,
                  releaseDate: this.gameData.releaseDate,
                  platforms: this.gameData.platforms,
                  developer: this.gameData.developer,
                  publisher: this.gameData.publisher,
                  coverImageUrl: this.gameData.coverImageUrl,
                  webSite: this.gameData.webSite
                })
                .then(this.closeWindow(), this.$emit('updateGames'))
            })
          } else {
            fb.gamesCollection
              .doc(this.gameData.name)
              .set({
                name: this.gameData.name,
                releaseDate: this.gameData.releaseDate,
                platforms: this.gameData.platforms,
                developer: this.gameData.developer,
                publisher: this.gameData.publisher,
                coverImageUrl: this.gameData.coverImageUrl,
                webSite: this.gameData.webSite
              })
              .then(this.closeWindow(), this.$emit('updateGames'))
          }
        }
      })
    },
    updateGame(gameData) {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async () => {
              let upload = await this.uploadImage(this.gameData.id)
            }
            upload().then(() => {
              fb.gamesCollection
                .doc(this.gameData.id)
                .update({
                  name: this.gameData.name,
                  releaseDate: this.gameData.releaseDate,
                  platforms: this.gameData.platforms,
                  developer: this.gameData.developer,
                  publisher: this.gameData.publisher,
                  coverImageUrl: this.gameData.coverImageUrl,
                  webSite: this.gameData.webSite
                })
                .then(this.$emit('closeWindow'), this.$emit('updateGames'))
            })
          } else {
            fb.gamesCollection
              .doc(gameData.id)
              .update({
                name: gameData.name,
                releaseDate: gameData.releaseDate,
                platforms: gameData.platforms,
                developer: gameData.developer,
                publisher: gameData.publisher,
                coverImageUrl: gameData.coverImageUrl,
                webSite: gameData.webSite
              })
              .then(this.closeWindow())
          }
        }
      })
    },
    uploadImage(id) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('games_images/' + id)
          .put(this.selectedFile)
        uploadTask.on('state_changed', snapshot => {
          this.imageLoading = true
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        })
        uploadTask.then(snapshot => {
          this.imageLoading = false
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.gameData.coverImageUrl = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    deleteImage() {
      if (this.gameData.coverImageUrl) {
        this.gameData.coverImageUrl = ''
        fb.storageRef
          .child('games_images/' + this.gameData.id)
          .delete()
          .then(() => {
            this.$store.commit('setMessage', {
              type: 'success',
              text: 'The image has been deleted from server.'
            })
          })
          .catch(error => {
            console.log(error)
            this.$store.commit('setMessage', {
              type: 'error',
              text: error.message
            })
          })
      }
    }
  },
  components: {
    message
  }
}
</script>
