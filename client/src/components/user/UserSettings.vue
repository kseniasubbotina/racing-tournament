<template>
  <v-layout>
    <form>
      <v-layout row wrap>
        <v-flex xs12 justify-space-between>
          <v-text-field label="Country" v-model="userData.country" type="text" name="country"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="First name" v-model="userData.username" v-validate="{required: true, min: 2 }" type="text" name="name" :error-messages="errors.collect('name')">
          </v-text-field>
        </v-flex>
        <v-flex>
          <input type="file" @change="onFileSelected">
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-layout>
          <v-flex>
            <v-btn @click="update"
            :Loading="loading">
            Update
          </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex v-if="loadingProgress">
            <v-progress-circular
              :rotate="360"
              :size="50"
              :width="5"
              :value="loadingProgress"
              color="teal"
            >
            </v-progress-circular>
          </v-flex>
          <v-flex>
            {{message}}
          </v-flex>
        </v-layout>
      </v-card-actions>
  </form>
  </v-layout>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'user-settings',
  data () {
    return {
      userData: {},
      selectedFile: null,
      loadingProgress: null
    }
  },
  created () {
    this.fetchuserData()
  },
  computed: {
    loading () {
      this.$store.getters.loading
    },
    message () {
      return this.$store.getters.message
    }
  },
  methods: {
    fetchuserData () {
      this.userData = this.$store.getters.userData
    },
    update () {
      this.$store.commit('set', {type: 'loading', val: true})
      if (this.selectedFile) {
        var uploadTask = fb.storageRef.child('users_avatars/' + this.authenticatedUserId + this.selectedFile.name).put(this.selectedFile)
        uploadTask.on('state_changed', snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          this.loadingProgress = progress
        })
        uploadTask.then(snapshot => {
          console.log('Uploaded a file!')
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$store.dispatch('updateProfile', {
            country: this.userData.country, 
            username: this.userData.username, 
            avatarURL: downloadURL
            })
            this.$store.commit('set', {type: 'loading', val: false})
          })
        })
      } else {
        this.$store.dispatch('updateProfile', {
          country: this.userData.country, 
          username: this.userData.username, 
          avatarURL: this.userData.avatarURL
        })
        this.$store.commit('set', {type: 'loading', val: false})
      }
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    }
  }
}
</script>