<template>
  <div>
    <v-layout wrap>
      <h1>Available Championships</h1>
      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" :to="'/create'" depressed color="success">
        <v-icon>add</v-icon>Create Championship
      </v-btn>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 pa-1 v-for="champ in championships" :key="champ.id">
        <v-card>
          <v-card-title primary-title>
            <div class="headline">{{champ.info.name}}</div>
          </v-card-title>
          <v-card-text>
            <div>F1 2017 championship - no assists</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="green">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <!-- <v-layout>
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
      </v-layout>-->
      <v-dialog v-model="showCreateForm" max-width="800px">
        <ChampionshipCreateForm/>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import ChampionshipCreateForm from '@/components/championship/form/ChampionshipCreateForm'
import fb from '@/firebase/config.js'

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
    ChampionshipCreateForm
  }
}
</script>
