<template>
  <div v-if="championships.length">
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <div>
      <v-flex class="my-3">
        <span class="headline">Active championships:</span>
      </v-flex>
      <ActiveChampionship
        lg6
        class="my-2"
        v-for="championship in championships"
        :key="championship.id"
        :data="championship"
        :userData="userData"
      />
    </div>
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
    userData: Object
  },
  created () {
    this.getActiveChampionships ()
  },
  methods: {
    getActiveChampionships () {
      this.loading = true
      // championship which has not ended
      let activeChampionships = fb.champsCollection.where("driversIds", "array-contains", this.userData.id)
      activeChampionships.get().then(querySnapshot => {
        if(!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            this.championships.push(doc.data())
            this.loading = false
          })
        }
      })
      this.loading = false
    }
  },
  components: {
    ActiveChampionship
  }
}
</script>
