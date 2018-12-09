<template>
  <v-dialog persistent v-model="_showEditWindow" max-width="700px">
    <v-card>
      <v-container grid-list-sm class="pa-4">
        <v-card-title class="py-4 title">Edit track</v-card-title>
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
            <!-- <v-flex xs12 class="text-xs-center">
              <div v-if="selectedFile">{{selectedFile.name}}</div>
              <div v-else>Track Image</div>
              <v-layout justify-center align-center column wrap>
                <v-flex>
                  <img :src="trackImageUrl" width="300px" alt>
                  <br>
                </v-flex>
                <v-flex>
                  <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                  <v-btn
                    @click="deleteImage(id)"
                    v-if="selectedFile || trackImageUrl"
                    flat
                    color="error"
                  >Delete</v-btn>
                  <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
                </v-flex>
                <message/>
              </v-layout>
            </v-flex>-->
            <v-flex>
              <v-textarea v-model="trackData.description" label="Track Description"></v-textarea>
            </v-flex>
          </v-layout>
        </form>
        <v-card-actions>
          <v-btn color="red darken-2" flat @click="closeWindow">Close</v-btn>
          <v-spacer></v-spacer>
          <!-- <v-btn color="red darken-2" @click="saveTrack()" :loading="imageLoading" dark>Save</v-btn> -->
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import message from '@/components/Message.vue'
import CountrySelect from '@/components/CountrySelect.vue'
import fb from '@/firebase/config.js'

export default {
  name: 'editTrackDialog',
  data() {
    return {
      trackData: null,
      id: '',
      name: '',
      length: null,
      firstGP: null,
      trackImageUrl: '',
      trackDescription: '',
      country: '',
      selectedFile: null
    }
  },
  props: {
    _showEditWindow: {
      type: Boolean,
      default: false
    },
    _trackData: {
      type: Object
    }
  },
  watch: {
    _trackData(val) {
      debugger
      this.trackData = val
    }
  },
  methods: {
    onChangeCountry(val) {
      this.trackData.country = val
    },
    updateTrack() {
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
                  name: this.name,
                  country: this.country,
                  firstGP: this.firstGP,
                  length: this.length,
                  imageUrl: this.trackImageUrl,
                  description: this.trackDescription
                })
                .then(this.getTracks(), this.closeEditWindow())
            })
          } else {
            fb.tracksCollection
              .doc(this.id)
              .update({
                name: this.name,
                country: this.country,
                firstGP: this.firstGP,
                length: this.length,
                imageUrl: this.trackImageUrl,
                description: this.trackDescription
              })
              .then(this.closeEditWindow(), this.getTracks())
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
            this.trackImageUrl = downloadURL
            resolve(downloadURL)
          })
        })
      })
    },
    closeWindow() {
      this.$emit('closeEditWindow')
    }
  },
  components: {
    message,
    CountrySelect
  }
}
</script>