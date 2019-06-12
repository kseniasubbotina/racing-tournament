<template>
  <v-card width="100%">
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-container v-else grid-list-sm class="pa-4">
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
            <v-layout align-center justify-center>
              <CountryFlag class="mx-2" :_country="userData.country" :_width="30"/>
              <span class="subheading">{{userData.country}}</span>
            </v-layout>
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
                  <component
                    v-if="userData.id"
                    :is="item.componentName"
                    :isGuest="isGuest"
                    :_userData="userData"
                    @logOut="logOut"
                  ></component>
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
      userData: {},
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
  watch: {
    $route(val) {
      this.getUserData()
    }
  },
  computed: {
    authenticatedUserId() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.id
      }
    },
    // visitedUserId() {
    //   return this.$route.params.id
    // },
    isGuest() {
      return this.authenticatedUserId !== this.userData.id
    },
    message() {
      return this.$store.getters.message
    },
    loading() {
      return this.$store.getters.loading
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
      this.$store.commit('set', { type: 'loading', val: true })
      fb.usersCollection
        .where('username', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              if (doc.exists) {
                this.userData = doc.data()
              } else {
                this.$router.push('/')
              }
            })
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
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
