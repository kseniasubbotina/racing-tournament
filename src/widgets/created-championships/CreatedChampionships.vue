<template>
  <div v-if="userData && userData.username">
    <h3 class="my-3">Created championships</h3>
    <div v-if="loading" class="text-xs-center my-2">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <template v-else-if="championships.length">
      <v-layout wrap>
        <v-flex v-for="championship in championships" :key="championship.id">
          <UserChampionshipItem
            class="ma-2"
            :full="false"
            :data="championship"
            :userData="userData"
          />
        </v-flex>
      </v-layout>
    </template>

    <template v-else-if="!loading">
      <v-card>
        <v-card-title class="text-xs-center">
          <v-layout column>
            <v-flex>
              <v-icon>block</v-icon>
            </v-flex>
            <v-flex v-if="isGuest" justify-center>User has not yet created a championship</v-flex>
            <v-flex v-else justify-center>You have not created a championship</v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text v-if="!isGuest">
          <v-layout column justify-center>
            <v-btn color="green" dark to="/create">Create a championship</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import fb from '@/firebase/config.js'
import UserChampionshipItem from '@/components/user/UserChampionshipItem.vue'

export default {
  name: 'ActiveChampionships',
  data () {
    return {
      championships: [],
      loading: false
    }
  },
  props: {
    userData: Object,
    isGuest: {
      default: false,
      type: Boolean
    }
  },
  created () {
    this.getCreatedChampionships ()
  },
  watch: {
    userData: {
      handler () {
        this.getCreatedChampionships()
      },
      deep: true
    }
  },
  methods: {
    getCreatedChampionships () {
      this.loading = true
      // championship which has not ended
      if(this.userData && this.userData.id) {
        let activeChampionships = fb.champsCollection.where('championship.author.id', '==', this.userData.id)
        activeChampionships.get().then(querySnapshot => {
          if(!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              if(doc.data().championship) {
                this.championships.push(doc.data())
              }
              this.loading = false
            })
          } else {
            this.loading = false
          }
        }).catch(e => {
          this.loading = false
        })
      }

    }
  },
  components: {
    UserChampionshipItem
  }
}
</script>
