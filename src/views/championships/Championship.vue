<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-container v-if="championship">
      {{championship.info.name}}
      Drivers: {{championship.drivers.length}}/{{championship.info.playersCount}}
    </v-container>
  </div>
</template>

<script>
import fb from '@/firebase/config.js'
export default {
  name: 'Championship',
  data() {
    return {
      championship: null
    }
  },
  created() {
    this.getChampionship()
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    getChampionship() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.champsCollection
        .where('info.name', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.championship = doc.data()
              this.championship.documentId = doc.id
            })
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
        })
    }
  }
}
</script>