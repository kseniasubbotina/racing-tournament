<template>
  <v-card>
    <div>
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
      </div>
      <v-container v-else>
        <div v-if="isAdmin">
          <v-btn flat @click="openForm(gameData)">
            <v-icon>edit</v-icon>Edit
          </v-btn>
          <v-btn color="error" flat @click="openConfirmation">
            <v-icon>delete</v-icon>Delete
          </v-btn>
        </div>
        <v-layout>
          <v-flex pa-1 xs12 lg4>
            <img :src="gameData.coverImageUrl" width="100%" alt>
          </v-flex>
          <v-flex pa-1 xs12 lg8>
            <div class="headline">{{gameData.name}}</div>
            <div>Release date: {{gameData.releaseDate}}</div>
            <div>Platforms: {{gameData.platforms.join(', ')}}</div>
            <div>Developer: {{gameData.developer}}</div>
            <div>Publisher: {{gameData.publisher}}</div>
            <div>
              <a :href="gameData.webSite">{{gameData.webSite}}</a>
            </div>
          </v-flex>
        </v-layout>
        <GameForm :_gameData="gameData" @imageDeleted="gameData.coverImageUrl=''"/>
      </v-container>
      <Confirmation @confirmed="deleteGame(gameData)" _message="Delete this game?"/>
    </div>
  </v-card>
</template>

<script>
import fb from '@/firebase/config.js'
import GameForm from '@/components/games/GameForm.vue'
import Confirmation from '@/components/Confirmation.vue'
import games from '@/mixins/games/games.js'

export default {
  name: 'Game',
  data() {
    return {
      showEditWindow: false,
      gameData: {}
    }
  },
  created() {
    this.getGame()
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return 0
    }
  },
  methods: {
    openForm(game) {
      this.$root.$emit('openGameDialog', game)
    },
    openConfirmation(track) {
      this.$root.$emit('confirm', track)
    },
    getGame() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.gamesCollection
        .where('name', '==', this.$route.params.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.gameData = doc.data()
            this.gameData.documentId = doc.id
            this.$store.commit('set', { type: 'loading', val: false })
          })
        })
    },
    deleteGame() {
      fb.gamesCollection
        .doc(this.gameData.documentId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.$router.push('/games')
          if (this.gameData.coverImageUrl) {
            fb.storageRef
              .child('games_images/' + this.gameData.id)
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
  mixins: [games],
  components: {
    GameForm,
    Confirmation
  }
}
</script>
