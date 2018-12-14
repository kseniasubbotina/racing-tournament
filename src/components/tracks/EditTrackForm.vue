<template>
  <v-dialog v-model="trackDialog" max-width="700px">
    <v-card>
      <v-card-title class="title">Edit track</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <form v-if="trackData">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Circuit Name"
                v-validate="'required|min:2'"
                type="text"
                name="name"
                v-model="trackData.name"
                :error-messages="errors.collect('name')"
              ></v-text-field>
            </v-flex>
            <v-flex xs8 justify-space-between>
              <CountrySelect
                @changeCountry="onChangeCountry"
                :_selectedCountry="trackData.country"
                :_isRequired="false"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-validate="'numeric|required'"
                name="first grand prix"
                type="text"
                :error-messages="errors.collect('first grand prix')"
                label="First grand prix"
                v-model="trackData.firstGP"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>Circuit Length</v-flex>
            <v-flex xs12>
              <v-text-field
                v-validate="{required: true, regex: '^([0-9.]+)$' }"
                name="length"
                type="text"
                :error-messages="errors.collect('length')"
                label="x.xx"
                v-model="trackData.length"
                suffix="km"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 class="text-xs-center">
              <div v-if="selectedFile">{{selectedFile.name}}</div>
              <div v-else>Track Image</div>
              <v-layout justify-center align-center column wrap>
                <v-flex>
                  <img :src="trackData.imageUrl" width="300px" alt>
                  <br>
                </v-flex>
                <v-flex>
                  <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                  <v-btn
                    @click="deleteImage(trackData.id)"
                    v-if="trackData.imageUrl"
                    flat
                    color="error"
                  >Delete</v-btn>
                  <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
                </v-flex>
                <message/>
              </v-layout>
            </v-flex>
            <v-flex>
              <v-textarea v-model="trackData.description" label="Track Description"></v-textarea>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red darken-2" flat @click="trackDialog=false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!_isNew"
          color="red darken-2"
          @click="updateTrack(trackData.id)"
          :loading="imageLoading"
          dark
        >Save</v-btn>
        <v-btn v-else color="red darken-2" @click="addTrack" :loading="imageLoading" dark>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import message from '@/components/Message.vue'
import CountrySelect from '@/components/CountrySelect.vue'
import fb from '@/firebase/config.js'

export default {
  name: 'editTrackForm',
  data() {
    return {
      trackData: {},
      selectedFile: null,
      imageLoading: false,
      trackDialog: false
    }
  },
  props: {
    _trackData: {
      type: Object
    },
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    _trackData(val) {
      this.trackData = val
    }
  },
  mounted() {
    this.$root.$on('openDialog', this.openDialog)
    if (this._trackData) {
      this.trackData = this._trackData
    }
  },
  methods: {
    openDialog(trackData) {
      this.trackData = trackData
      this.trackDialog = true
    },
    onFileSelected(event) {
      let type = event.target.files[0].type
      if (type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg') {
        this.selectedFile = event.target.files[0]
        this.trackImageUrl = ''
      } else {
        this.$store.commit('setMessage', {
          type: 'error',
          text: 'Incorrect type of file. Only PNG, JPEG allowed.'
        })
      }
    },
    onChangeCountry(val) {
      if (val) this.trackData.country = val
    },
    closeWindow() {
      this.trackDialog = false
      this.$store.commit('set', {
        type: 'message',
        val: { error: '', success: '' }
      })
    },
    addTrack() {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async id => {
              let upload = await this.uploadImage(this.trackData.name)
            }
            upload().then(() => {
              fb.tracksCollection
                .doc(this.trackData.name)
                .set({
                  name: this.trackData.name,
                  country: this.trackData.country,
                  firstGP: this.trackData.firstGP,
                  length: this.trackData.length,
                  imageUrl: this.trackData.imageUrl,
                  description: this.trackData.description
                })
                .then(this.closeWindow(), this.$emit('updateTracks'))
            })
          } else {
            fb.tracksCollection
              .doc(this.trackData.name)
              .set({
                name: this.trackData.name,
                country: this.trackData.country,
                firstGP: this.trackData.firstGP,
                length: this.trackData.length,
                imageUrl: this.trackData.imageUrl,
                description: this.trackData.description
              })
              .then(this.closeWindow(), this.$emit('updateTracks'))
          }
        }
      })
    },
    updateTrack(id) {
      this.$validator.validate().then(result => {
        if (result) {
          if (this.selectedFile) {
            const upload = async () => {
              let upload = await this.uploadImage(this.trackData.id)
            }
            upload().then(() => {
              fb.tracksCollection
                .doc(this.trackData.id)
                .update({
                  name: this.trackData.name,
                  country: this.trackData.country,
                  firstGP: this.trackData.firstGP,
                  length: this.trackData.length,
                  imageUrl: this.trackData.imageUrl,
                  description: this.trackData.description
                })
                .then(this.$emit('closeWindow'), this.$emit('updateTracks'))
            })
          } else {
            fb.tracksCollection
              .doc(id)
              .update({
                name: this.trackData.name,
                country: this.trackData.country,
                firstGP: this.trackData.firstGP,
                length: this.trackData.length,
                imageUrl: this.trackData.imageUrl,
                description: this.trackData.description
              })
              .then(this.closeWindow())
          }
        }
      })
    },
    uploadImage(id) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef
          .child('tracks_images/' + id)
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
            this.trackData.imageUrl = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    deleteImage() {
      if (this.trackData.imageUrl) {
        this.trackData.imageUrl = ''
        fb.storageRef
          .child('tracks_images/' + this.trackData.id)
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
    message,
    CountrySelect
  }
}
</script>