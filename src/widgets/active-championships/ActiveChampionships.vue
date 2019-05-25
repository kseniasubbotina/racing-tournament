<template>
  <div>
    <activeChampionship
      class="my-2"
      v-if="championships.length"
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
      championships: []
    }
  },
  created () {
    this.getActiveChampionships ()
  },
  computed: {
    userId () {
      if (this.$store.getters.user) {
        return this.$store.getters.user.id
      }
    }
  },
  methods: {
    getActiveChampionships () {
      debugger
      // championship which has not ended
      let activeChampionships = fb.champsCollection.where("driversIds", "array-contains", this.userId)
      activeChampionships.get().then(querySnapshot => {
        if(!querySnapshot.empty) {
          querySnapshot.forEach(doc => {
            this.championships.push(doc.data())
          })
        }
      })
    }
  },
  components: {
    activeChampionship
  }
}
</script>
