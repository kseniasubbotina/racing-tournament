<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>

    <v-card>
      <v-container v-if="championship">
        <v-layout>
          <v-flex>
            <h1>{{championship.info.name}}</h1>
            <v-spacer></v-spacer>
          </v-flex>
          <v-flex>Approved: {{championship.approved}}</v-flex>
        </v-layout>
        <v-layout column>
          <h3>{{championship.info.game}}</h3>
          {{championship.info.description}}
          Drivers: {{championship.drivers.length}}/{{championship.info.playersCount}}
        </v-layout>
        <div
          v-for="stage in championship.calendar"
          :key="stage.documentId"
        >{{stage.track}} - {{stage.date}} {{stage.time}}</div>
      </v-container>
    </v-card>
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