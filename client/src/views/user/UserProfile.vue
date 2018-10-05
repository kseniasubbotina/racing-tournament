<template>
  <v-layout>
    <v-flex>
      <v-card flat>
        <v-layout>
        <v-flex sm5 xs12 ma-2>
          <v-layout d-block pa-1>
          <v-flex>
            <v-avatar size="100">
              <img src="http://pol.audio/media/user-avatar.png" alt="">
            </v-avatar>
          </v-flex>
          <v-flex>
            <h2>Name</h2>
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
        <v-flex ma-2 xs12>
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
                      <v-text-field label="First name" v-model="name" v-validate="{required: true, min: 2 }" type="text" name="name" :error-messages="errors.collect('name')">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-card-actions>
                    <v-btn @click="update">
                      Update
                    </v-btn>
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
import firebase from 'firebase'

export default {
  name: 'UserProfile',
  data () {
      return {
        country: '',
        name: '',
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
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('signOut')
      this.$router.push('/')
    },
    update () {
      var ref = firebase.database().ref('users/' + this.authenticatedUserId)
      ref.set({
        first_name: this.name
      }, function(error) {
        if (error) {
          alert(error)
        } else {
          console.log('success')
          // Data saved successfully!
        }
      })
    }
  }
}
</script>
