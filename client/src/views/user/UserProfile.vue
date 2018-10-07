<template>
  <v-layout>
    <v-flex>
      <v-card flat>
        <v-layout>
        <v-flex md5 sm12 ma-2>
          <v-layout d-block pa-1>
          <v-flex>
            <v-avatar size="100">
              <img v-if="avatarURL" :src="avatarURL" alt="">
              <img v-else src="http://pol.audio/media/user-avatar.png" alt="">
            </v-avatar>
          </v-flex>
          <v-flex>
            <h2>{{username}}</h2>
          </v-flex>
          <v-flex>
            Country: {{country}}
          </v-flex>
          <v-flex>
            Guest: {{isGuest}}
          </v-flex>
          {{authenticatedUserId}}
          <v-flex>
            <v-btn @click="logOut">
              Log out
            </v-btn>
          </v-flex>
          </v-layout>
        </v-flex>
        <v-flex ma-2 sm12>
          <v-flex>
            <v-tabs
                slot="extension"
                v-model="tab"
                color="light"
                grow
              >
              <v-tabs-slider color="blue"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
              </v-flex>
              <v-flex>
              <v-tabs-items v-model="tab">
                <form>
                  <v-layout row wrap>
                    <v-flex xs12 justify-space-between>
                      <v-text-field label="Country" v-model="country" type="text" name="country"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field label="First name" v-model="username" v-validate="{required: true, min: 2 }" type="text" name="name" :error-messages="errors.collect('name')">
                      </v-text-field>
                    </v-flex>
                    <v-flex>
                      <input type="file" @change="onFileSelected">
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-btn @click="update"
                      :Loading="loading">
                      Update
                    </v-btn>
                    {{message}}
                  </v-card-actions>
              </form>
              <!-- <v-tab-item v-for="item in items" :key="item">
                <v-card flat>
                  <v-card-text>{{ tabContent }}</v-card-text>
                </v-card>
              </v-tab-item> -->
            </v-tabs-items>
          </v-flex>
        </v-flex>
      </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import fb from '@/firebase/config.js'
export default {
  name: 'UserProfile',
  data () {
      return {
        country: '',
        username: '',
        selectedFile: null,
        avatarURL: '',
        tab: null,
        items: [
          'Overview', 'Statistic', 'Activity', 'Settings'
        ],
        tabContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
  },
  computed: {
    authenticatedUserId () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.id
      }
    },
    visitedUserId () {
      return this.$route.params.id
    },
    isGuest () {
      return this.authenticatedUserId !== this.visitedUserId
    },
    message () {
      return this.$store.getters.message
    },
    loading () {
      this.$store.getters.loading
    }
  },
  created () {
    this.getUserData ()
  },
  beforeDestroy () {
    this.$store.commit('set', {type: 'message', val: null})
  },
  methods: {
    logOut () {
      this.$store.dispatch('signOut')
      this.$router.push('/')
      this.$store.dispatch('clearData')
    },
    update () {
      this.$store.commit('set', {type: 'loading', val: true})
      if (this.selectedFile) {
        var uploadTask = fb.storageRef.child('users_avatars/' + this.authenticatedUserId + this.selectedFile.name)
        uploadTask.put(this.selectedFile).then(snapshot => {
          console.log('Uploaded a file!')
          uploadTask.put(this.selectedFile).snapshot.ref.getDownloadURL().then(downloadURL => {
            this.$store.dispatch('updateProfile', {
            country: this.country, 
            username: this.username, 
            avatarURL: downloadURL
            })
            this.$store.commit('set', {type: 'loading', val: false})
          })
        })
      } else {
        this.$store.dispatch('updateProfile', {
          country: this.country, 
          username: this.username, 
          avatarURL: this.avatarURL
        })
        this.$store.commit('set', {type: 'loading', val: false})
      }

    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    getUserData () {
      fb.usersCollection.doc(this.visitedUserId).onSnapshot(doc => {
        if(doc.exists) {
          var userData = doc.data()
          this.username = userData.username
          this.country = userData.country,
          this.avatarURL = userData.avatarURL
        } else {
          this.$router.push('/')
          console.log('No user found')
        } 
      })
    }
  }
}
</script>
