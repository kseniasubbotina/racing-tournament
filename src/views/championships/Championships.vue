<template>
  <!-- <v-container> -->
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-layout v-else wrap>
      <div class="headline my-3">Available Championships</div>
      <v-spacer></v-spacer>
      <!-- <v-btn v-if="isLoggedIn" :to="'/create'" depressed color="success">
        <v-icon>add</v-icon>Create Championship
      </v-btn>-->
    </v-layout>
    <v-layout wrap>
      <v-flex
        v-if="champ.approved || champ.currentUserId == champ.author.id || isAdmin"
        xs12
        sm6
        md6
        pa-1
        v-for="champ in championships"
        :key="champ.id"
      >
        <ChampionshipItem :_drivers="drivers" :_championship="champ"/>
      </v-flex>
      <v-layout v-if="showAddButton">
        <v-flex sx12>
          <v-btn v-if="isLoggedIn" :to="'/create'" color="green" dark fixed bottom right fab>
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>
    <!-- </v-container> -->
  </div>
</template>

<script>
import ChampionshipForm from '@/components/championship/form/ChampionshipForm'
import fb from '@/firebase/config.js'
import ChampionshipItem from '@/components/championship/ChampionshipItem'

export default {
  name: 'Championships',
  data() {
    return {
      championships: [],
      showCreateForm: false,
      drivers: {}
    }
  },
  props: {
    showAddButton: {
      default: true,
      type: Boolean
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
    },
    currentUserId() {
      return this.$store.getters.user.id
    },
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return false
    }
  },
  methods: {
    getChampionships() {
      this.$store.commit('set', { type: 'loading', val: true })
      var championships = []
      var drivers = {}
      fb.champsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          drivers = doc.data().drivers
          var data = doc.data().championship
          if (data) {
            data.id = doc.id
            championships.push(data)
          }
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.championships = championships
        this.drivers = drivers
      })
    }
  },
  components: {
    ChampionshipItem,
    ChampionshipForm
  }
}
</script>
