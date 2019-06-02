<template>
  <div v-if="userData && userData.username">
    <div v-if="loading" class="text-xs-center my-2">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <template v-else-if="championships.length">
      <v-flex class="my-3">
        <span class="headline">Active championships:</span>
      </v-flex>
      <v-layout wrap>
        <v-flex v-for="championship in championships" :key="championship.id">
          <ActiveChampionship class="ma-2" :data="championship" :userData="userData"/>
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
            <v-flex v-if="isGuest" justify-center>User has no active championships</v-flex>
            <v-flex v-else justify-center>You have no active championships</v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text v-if="!isGuest">
          <v-layout column justify-center>
            <v-btn color="green" dark to="/championships">Select a championships</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script>
import fb from '@/firebase/config.js'
import ActiveChampionship from '@/widgets/active-championships/ActiveChampionship.vue'

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
    this.getActiveChampionships ()
  },
  watch: {
    userData: {
      handler () {
        this.getActiveChampionships()
      },
      deep: true
    }
  },
  methods: {
    getActiveChampionships () {
      this.loading = true
      // championship which has not ended
      if(this.userData && this.userData.id) {
        let activeChampionships = fb.champsCollection.where("driversIds", "array-contains", this.userData.id)
        activeChampionships.get().then(querySnapshot => {
          if(!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.championships.push(doc.data())
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
    ActiveChampionship
  }
}
</script>
