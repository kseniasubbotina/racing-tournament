<template>
  <v-container>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-layout wrap>
        <div class="headline my-3">Games</div>
        <v-spacer></v-spacer>
        <v-btn depressed color="success" v-if="isAdmin" @click="openForm">
          <v-icon>add</v-icon>Add new
        </v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex xs12 sm6 md6 pa-1 v-for="game in games" :key="game.id">
          <GameItem :_game="game" @editGame="openForm" @deleteGame="openConfirmation"/>
        </v-flex>
      </v-layout>
      <Confirmation @confirmed="deleteGame" _message="Delete this game?"/>
      <GameForm :_isNew="isNew" @updateGames="getGames"/>
    </div>
  </v-container>
</template>

<script>
  import fb from '@/firebase/config.js'
  import GameForm from '@/components/games/GameForm.vue'
  import GameItem from '@/components/games/GameItem.vue'
  import Confirmation from '@/components/Confirmation.vue'
  import games from '@/mixins/games/games.js'
  import isAdmin from '@/mixins/isAdmin.js'

  export default {
  name: 'games',
  data() {
    return {
      games: [],
      isNew: false
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isLoggedIn() {
      return this.$store.getters.user ? true : false
    }
  },
  created() {
    this.getGames()
  },
  methods: {
    openConfirmation(game) {
      this.$root.$emit('confirm', game)
    },
    openForm(game) {
      let gameData = game
      this.isNew = false
      if (!game.documentId) {
        gameData = {
          name: '',
          releaseDate: '',
          platforms: [],
          developer: '',
          publisher: '',
          coverImageUrl: '',
          webSite: ''
        }
        this.isNew = true
      }
      this.$root.$emit('openGameDialog', gameData)
    },
    getGames() {
      this.$store.commit('set', { type: 'loading', val: true })
      var gamesArr = []
      fb.gamesCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.documentId = doc.id
          gamesArr.push(data)
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.games = gamesArr
      })
    },
    deleteGame(game) {
      fb.gamesCollection
        .doc(game.documentId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.getGames()
          if (game.coverImageUrl) {
            fb.storageRef
              .child('games_images/' + game.id)
              .delete()
              .then(() => {
                this.$store.commit('setMessage', {
                  type: 'success',
                  text: 'The image has been deleted from server.'
                })
              })
              .catch(error => {
                console.log(error)
                this.$store.commit('setMessage', {
                  type: 'error',
                  text: error.message
                })
              })
          }
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    }
  },
  mixins: [games, isAdmin],
  components: {
    GameForm,
    GameItem,
    Confirmation
  }
}
</script>
