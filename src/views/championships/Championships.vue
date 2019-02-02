<template>
  <v-container>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-layout v-else wrap>
      <h1>Available Championships</h1>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" :to="'/championships/create'" depressed color="success">
        <v-icon>add</v-icon>Create Championship
      </v-btn>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 sm6 md6 pa-1 v-for="champ in championships" :key="champ.id">
        <ChampionshipItem :_championship="champ"/>
      </v-flex>
      <v-layout>
        <v-flex sx12>
          <v-btn
            @click.stop="showCreateForm = true"
            color="red darken-2"
            dark
            fixed
            bottom
            right
            fab
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-dialog v-model="showCreateForm" max-width="800px">
        <ChampionshipCreateForm/>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import ChampionshipCreateForm from '@/components/championship/form/ChampionshipCreateForm'
import fb from '@/firebase/config.js'
import ChampionshipItem from '@/components/championship/ChampionshipItem'

export default {
  name: 'Championships',
  data() {
    return {
      championships: [],
      showCreateForm: false
    }
  },
  created() {
    this.getChampionships()
  },
  computed: {
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    getChampionships() {
      this.$store.commit('set', { type: 'loading', val: true })
      var championships = []
      fb.champsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          championships.push(data)
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.championships = championships
      })
    }
  },
  components: {
    ChampionshipItem,
    ChampionshipCreateForm
  }
}
</script>
