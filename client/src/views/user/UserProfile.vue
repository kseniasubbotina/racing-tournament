<template>
  <v-layout>
    <v-flex>
      <v-card flat>
        <v-layout>
        <v-flex md5 sm12 ma-2>
          <v-layout d-block pa-1>
          <v-flex>
            <v-avatar size="100">
              <img v-if="userData.avatarURL" :src="userData.avatarURL" alt="">
              <img v-else src="http://pol.audio/media/user-avatar.png" alt="">
            </v-avatar>
          </v-flex>
          <v-flex>
            <h2>{{userData.username}}</h2>
          </v-flex>
          <v-flex>
            Country: {{userData.country}}
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
          <v-layout>
            <v-flex> 
              <v-btn @click="redirect('overview')" flat>
                Overview
              </v-btn>
              <v-btn @click="redirect('settings')" flat>
                Settings
              </v-btn>
            </v-flex>
          </v-layout>
            <v-flex>
              <v-card flat>
                  <router-view>
                  </router-view>
              </v-card>
          </v-flex>
        </v-flex>
      </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import fb from '@/firebase/config.js'
import userSettings from '@/components/user/UserSettings.vue'
export default {
  name: 'UserProfile',
  data () {
      return {
        userData: {
          country: '',
          username: '',
          avatarURL: ''
        },
        selectedFile: null,
        loadingProgress: null,
        tab: null,
        items: [
          'Overview', 'Statistic', 'Activity', 'Settings'
        ],
        tabContent: 'userSettings'
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
    redirect (to) {
      var router = this.$route.params
      this.$router.push('/user_' + this.$route.params.id + '/' + to)
    },
    logOut () {
      this.$store.dispatch('signOut')
      this.$router.push('/')
      this.$store.dispatch('clearData')
    },
    getUserData () {
      fb.usersCollection.doc(this.visitedUserId).onSnapshot(doc => {
        if(doc.exists) {
          var data = doc.data()
          this.userData.username = data.username
          this.userData.country = data.country
          this.userData.avatarURL = data.avatarURL
        } else {
          this.$router.push('/')
          console.log('No user found')
        } 
      })
    }
  },
  components: {
    userSettings
  }
}
</script>
