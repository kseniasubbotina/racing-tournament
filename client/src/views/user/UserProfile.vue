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
          <v-tabs
            color="white"
            show-arrows>
              <v-tabs-slider color="blue"></v-tabs-slider>
              <v-tab
                v-for="item in tabs" :key="item.name"
                :href="'#' + item.name">
                {{ item.name }}
              </v-tab>
              <v-tabs-items>
                <v-tab-item
                  v-for="item in tabs"
                  :id="item.name"
                  :key="item.name">
                  <v-card flat>
                    <component :is="item.componentName"></component>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
        </v-flex>
      </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import fb from '@/firebase/config.js'
import userOverview from '@/components/user/UserOverview.vue'
import userSettings from '@/components/user/UserSettings.vue'
import userStatistic from '@/components/user/UserStatistic.vue'

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
        componentName: 'userSettings',
        tabs: [
          {
            name: 'Overview',
            componentName: 'userOverview'
          },
          {
            name: 'Statistic',
            componentName: 'userStatistic'
          },
          {
            name: 'Settings',
            componentName: 'userSettings'
          },
        ]
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
    changeTab (tabName) {
      if(tabName == 'Overview') {
        this.componentName = 'userOverview'
      } else if(tabName == 'Statistic') {
        this.componentName = 'userStatistic'
      } else if(tabName == 'Settings') {
        this.componentName = 'userSettings'
      }
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
    userSettings,
    userOverview,
    userStatistic
  }
}
</script>
