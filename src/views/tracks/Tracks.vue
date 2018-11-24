<template>
<v-container>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="red"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-layout wrap>
        <v-spacer></v-spacer>
        <v-btn v-if="isAdmin" flat 
            @click="addNewWindowOpen">
            <v-icon>add</v-icon> Add new
        </v-btn>
      </v-layout>
    <v-layout wrap>
      <v-flex xs12 pa-1 v-for="track in tracks" :key="track.id">
        <v-card>
          <v-layout>
              <v-card-title primary-title>
                <v-flex pr-4>
              <img :src="require(`@/assets/flag-icons/svg/${track.country.toLowerCase()}.svg`)" width="40px" alt="">
            </v-flex>
                <div class="headline">{{track.name}}</div>
              </v-card-title>
              <v-spacer />
              <v-menu v-if="isAdmin" bottom left>
              <v-btn
                slot="activator"
                icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile
                @click="onEditClick(track.id, track.name, track.length, track.country, track.firstGP, track.imageUrl, track.description)">
                  <v-list-tile-title>Edit</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
                @click="deleteTrack">
                  <v-list-tile-title>Delete</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-layout>
          <v-card-text>
            {{track.description}}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :to="'/circuit_' + track.id" flat color="green">View</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
        <v-dialog v-model="trackDialog" persistent max-width="700px">
          <v-card>
            <v-container grid-list-sm class="pa-4">
              <v-card-title v-if="isNewTrack" class="py-4 title">
                Add new track
              </v-card-title>
              <v-card-title v-else class="py-4 title">
                Edit track
              </v-card-title>
              <form>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field label="Circuit Name" 
                      v-validate="'required|min:2'" 
                      type="text" name="name"
                      v-model="name"
                      :error-messages="errors.collect('name')">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs8 justify-space-between>
                    <CountrySelect @changeCountry="onChangeCountry" :_selectedCountry="country" :_isRequired="false"/>
                  </v-flex>
                  <v-flex xs4>
                  <v-text-field
                      v-validate="'numeric|required'" name="first grand prix" type="text"
                      :error-messages="errors.collect('first grand prix')"
                      label="First grand prix"
                      v-model="firstGP"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    Circuit Length
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-validate="{required: true, regex: '^([0-9.]+)$' }" name="length" type="text"
                      :error-messages="errors.collect('length')"
                      label="x.xx"
                      v-model="length"
                      suffix="km"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center">
                    <div v-if="selectedFile">
                      {{selectedFile.name}}
                    </div>
                    <div v-else>
                      Track Image
                    </div>
                    <v-layout justify-center align-center column wrap>
                      <v-flex>
                        <img :src="trackImageUrl" width="300px" alt=""><br>
                      </v-flex>
                      <v-flex>
                        <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                        <v-btn @click="deleteImage(id)" v-if="selectedFile || trackImageUrl" flat color="error">Delete</v-btn>
                        <input style="display: none" ref="filenput" type="file" @change="onFileSelected">                        
                      </v-flex>
                      <message />                 
                    </v-layout>
                  </v-flex>
                  <v-flex>
                    <v-textarea
                      v-model="trackDescription"
                      label="Track Description"
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </form>
              <v-card-actions>
                <v-btn color="red darken-2"  flat @click="closeEditWindow">Close</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-2" @click="saveTrack()" :loading="imageLoading" dark>Save</v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-dialog>
    </v-layout>
  </div>
</v-container>

</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'
import fb from '@/firebase/config.js'

export default {
  data () {
    return {
      isNewTrack: true,
      trackDialog: false,
      tracks: [],
      selectedFile: null,
      id: '',
      name: '',
      length: null,
      firstGP: null,
      trackImageUrl: '',
      trackDescription: '',
      country: '',
      selectedFile: null,
      imageLoading: false,
    }
  },
  computed: {
    isAdmin () {
      if (this.$store.getters.userData.role == '1') {
        return true
      } else return 0
    },
    loading () {
      return this.$store.getters.loading
    },
    isLoggedIn () {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  created () {
    this.getTracks()
  },
  methods: {
    addNewWindowOpen () {
      this.trackDialog = true
      this.isNewTrack = true
    },
    onChangeCountry (val) {
      this.country = val
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    getTracks () {
      this.$store.commit('set', { type: 'loading', val: true })
      var tracksArr = []
      fb.tracksCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          for(let i = 0; i < data.length; i ++) {
            data.id = doc.id
          }
          tracksArr.push(data)
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.tracks = tracksArr
      })
    },
    saveTrack () {
      if (this.isAdmin) {
        if (this.isNewTrack) {
          this.addTrack ()
        } else {
        this.updateTrack ()
        }
      }
    },
    addTrack () {
      this.$validator.validate().then(result => {
        if(result) {
          if (this.selectedFile) {
            let id = this.name
            const upload = async id => {
              let upload = await this.uploadImage()
            }
            upload().then(() => {
              fb.tracksCollection.doc(this.name).set({
              name: this.name,
              country: this.country,
              firstGP: this.firstGP,
              length: this.length,
              imageUrl: this.trackImageUrl,
              description: this.trackDescription
              }).then(
                this.getTracks(),
                this.closeEditWindow()
              )                
            })
          } else {
            fb.tracksCollection.doc(this.name).set({
              name: this.name,
              country: this.country,
              firstGP: this.firstGP,
              length: this.length,
              imageUrl: this.trackImageUrl,
              description: this.trackDescription
            }).then(
              this.closeEditWindow(),
              this.getTracks()
            )            
          }
        }
      })
    },
    updateTrack () {
      this.$validator.validate().then(result => {
        if(result) {
          if (this.selectedFile) {
            let id = this.id
            const upload = async id => {
              let upload = await this.uploadImage()
            }
            upload().then(() => {
              fb.tracksCollection.doc(this.id).update({
                name: this.name,
                country: this.country,
                firstGP: this.firstGP,
                length: this.length,
                imageUrl: this.trackImageUrl,
                description: this.trackDescription
              }).then(
                this.getTracks(),
                this.closeEditWindow()
              )
            })
          } else {
            fb.tracksCollection.doc(this.id).update({
            name: this.name,
            country: this.country,
            firstGP: this.firstGP,
            length: this.length,
            imageUrl: this.trackImageUrl,
            description: this.trackDescription
          }).then(
            this.closeEditWindow(),
            this.getTracks()
            )
          }
        }
      })
    },
    onEditClick (id, name, length, country, firstGP, trackImageUrl, trackDescription) {
      this.id = id
      this.name = name
      this.length = length,
      this.country = country
      this.firstGP = firstGP
      this.trackImageUrl = trackImageUrl,
      this.trackDescription = trackDescription
      this.isNewTrack = false
      this.trackDialog = true
    },
    closeEditWindow () {
      this.selectedFile = null
      this.name = ''
      this.length = null
      this.firstGP = null
      this.trackImageUrl = '',
      this.trackDescription = ''
      this.country = ''
      this.trackDialog = false
      this.isNewTrack = true
    },
    deleteTrack () {
      // 
    },
    onFileSelected (event) {
      let type = event.target.files[0].type
      if(type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg'){
        this.selectedFile = event.target.files[0]
        this.trackImageUrl = ''
      } else {
        this.$store.commit('setMessage', { type: 'error', text: 'Incorrect type of file. Only PNG, JPEG allowed.' })
      }
    },
    uploadImage (id) {
      return new Promise(resolve => {
        var uploadTask = fb.storageRef.child('tracks_images/' + id).put(this.selectedFile)
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
    deleteImage () {
      this.selectedFile = null
      if(this.trackImageUrl) {
        this.trackImageUrl = ""
        fb.storageRef.child('tracks_images/' + this.id).delete().then(function() {
          console.log('deleted')
          // this.updateTrack()
        }).catch(function(error) {
          console.log(error)
          // Uh-oh, an error occurred!
        });
      }
    }
  },
  components: {
    CountrySelect,
    message
  }
}
</script>
