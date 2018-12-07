<template>
  <v-card width="100%">
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12 sm3 class="text-xs-center">
          <v-layout d-block pa-1>
            <v-flex>
              <v-avatar size="100">
                <img v-if="userData.avatarURL" :src="userData.avatarURL" alt>
                <img v-else src="http://pol.audio/media/user-avatar.png" alt>
              </v-avatar>
            </v-flex>
            <v-flex>
              <h2>{{userData.username}}</h2>
            </v-flex>
            <v-layout align-center justify-center column>
              <CountryFlag :_country="userData.country" :_width="30"/>
              {{userData.country}}
            </v-layout>
            <v-flex v-if="!isGuest">
              <v-btn @click="logOut">Log out</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm8 justify-space-between>
          <v-tabs show-arrows>
            <v-tabs-slider color="red"></v-tabs-slider>
            <v-tab
              v-if="item.public || !isGuest && !item.public"
              v-for="item in tabs"
              :key="item.name"
            >{{ item.name }}</v-tab>
            <v-tabs-items>
              <v-tab-item v-for="item in tabs" :id="item.name" :key="item.name">
                <v-card flat class="pa-1">
                  <component :is="item.componentName" :_userData="userData"></component>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import fb from '@/firebase/config.js'
import userOverview from '@/components/user/UserOverview.vue'
import userSettings from '@/components/user/UserSettings.vue'
import userStatistic from '@/components/user/UserStatistic.vue'
import CountryFlag from '@/components/CountryFlag.vue'

export default {
  name: 'UserProfile',
  data() {
    return {
      userData: {
        userId: '',
        country: '',
        username: '',
        avatarURL: '',
        role: ''
      },
      selectedFile: null,
      loadingProgress: null,
      componentName: 'userSettings',
      tabs: [
        {
          name: 'Overview',
          componentName: 'userOverview',
          public: true
        },
        {
          name: 'Statistic',
          componentName: 'userStatistic',
          public: true
        },
        {
          name: 'Settings',
          componentName: 'userSettings',
          public: false
        }
      ]
    }
  },
  computed: {
    authenticatedUserId() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.id
      }
    },
    visitedUserId() {
      return this.$route.params.id
    },
    isGuest() {
      return this.authenticatedUserId !== this.visitedUserId
    },
    message() {
      return this.$store.getters.message
    },
    loading() {
      this.$store.getters.loading
    }
  },
  created() {
    this.getUserData()
  },
  methods: {
    changeTab(tabName) {
      if (tabName == 'Overview') {
        this.componentName = 'userOverview'
      } else if (tabName == 'Statistic') {
        this.componentName = 'userStatistic'
      } else if (tabName == 'Settings') {
        this.componentName = 'userSettings'
      }
    },
    logOut() {
      this.$store.dispatch('signOut')
      this.$router.push('/')
      this.$store.dispatch('clearData')
    },
    getUserData() {
      fb.usersCollection.doc(this.visitedUserId).onSnapshot(doc => {
        if (doc.exists) {
          var data = doc.data()
          this.userData.userId = data.id
          this.userData.username = data.username
          this.userData.country = data.country
          this.userData.avatarURL = data.avatarURL
          this.userData.role = data.role
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
    userStatistic,
    CountryFlag
  }
}
</script>
