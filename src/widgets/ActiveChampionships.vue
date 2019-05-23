<template>
  <v-card>
    <v-btn @click="getActiveChampionships">query</v-btn>
  </v-card>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'ActiveChampionships',
  methods: {
    getActiveChampionships () {
      // query championship when approved = true, driver is there, 
      let userId = 'testId'
      let activeChampionships = fb.champsCollection.where("drivers.driversArr", "array-contains", userId)
      activeChampionships.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, ' => ', doc.data())
        })
      })
    }
  }
}
</script>
