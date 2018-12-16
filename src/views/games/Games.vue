<template>
  <v-container>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-layout wrap>
        <v-spacer></v-spacer>
        <v-btn v-if="isAdmin" flat @click="openForm">
          <v-icon>add</v-icon>Add new
        </v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 md6 pa-1 v-for="game in games" :key="game.id">
          <GameItem :_game="game" @editGame="openForm"/>
          <!-- <TrackItem :_track="track" @editTrack="openForm" @deleteTrack="openConfirmation"/> -->
        </v-flex>
      </v-layout>
      <GameForm :_gameData="gameData" :_isNew="isNew" @updateGames="getGames"/>
    </div>
  </v-container>
</template>

<script>
import fb from '@/firebase/config.js'
import GameForm from '@/components/games/GameForm.vue'
import GameItem from '@/components/games/GameItem.vue'
export default {
  name: 'games',
  data() {
    return {
      games: [],
      gameData: {},
      isNew: false
    }
  },
  computed: {
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return 0
    },
    loading() {
      return this.$store.getters.loading
    },
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  created() {
    this.getGames()
  },
  methods: {
    openForm(game) {
      if (!game.id) {
        this.trackData = {
          name: '',
          releaseDate: '',
          platforms: ['PS4', 'Xbox One', 'PC', 'Other'],
          developer: '',
          publisher: '',
          coverImageUrl: '',
          webSite: '',
          buy: []
        }
        this.isNew = true
      } else {
        this.isNew = false
        this.gameData = game
      }
      this.$root.$emit('openDialog', game)
    },
    getGames() {
      this.$store.commit('set', { type: 'loading', val: true })
      var gamesArr = []
      fb.gamesCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          gamesArr.push(data)
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.games = gamesArr
      })
    }
  },
  components: {
    GameForm,
    GameItem
  }
}
</script>
