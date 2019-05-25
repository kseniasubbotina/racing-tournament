<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <activeChampionship
      class="my-2"
      v-else-if="championships.length"
      v-for="championship in championships"
      :key="championship.id"
      :championship="championship"
      :userId="userId"
    />
  </div>
</template>

<script>
import fb from '@/firebase/config.js'
import activeChampionship from '@/widgets/active-championships/activeChampionship.vue'

export default {
  name: 'ActiveChampionships',
  data () {
    return {
      championships: [],
      loading: false
    }
  },
  props: {
    userId: String
  },
  created () {
    this.getActiveChampionships ()
  },
  methods: {
    getActiveChampionships () {
      this.loading = true
      // championship which has not ended
      let activeChampionships = fb.champsCollection.where("driversIds", "array-contains", this.userId)
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
    activeChampionship
  }
}
</script>
