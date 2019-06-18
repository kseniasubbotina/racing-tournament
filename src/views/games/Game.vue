<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <template v-else>
      <div v-if="isAdmin">
        <v-btn flat @click="openForm(gameData)">
          <v-icon>edit</v-icon>Edit
        </v-btn>
        <v-btn color="error" flat @click="openConfirmation">
          <v-icon>delete</v-icon>Delete
        </v-btn>
      </div>
      <v-card>
        <v-container>
          <v-layout>
            <v-flex pa-1 xs12 lg8>
              <h1>{{gameData.name}}</h1>
              <div>
                <div>
                  <span class="body-2">Release date:</span>
                  {{gameData.releaseDate}}
                </div>
                <div>
                  <span class="body-2">Platforms:</span>
                  <span v-for="platform in gameData.platforms" :key="platform.id">{{platform}}</span>
                </div>
                <div>
                  <span class="body-2">Developer:</span>
                  {{gameData.developer}}
                </div>
                <div>
                  <span class="body-2">Publisher:</span>
                  {{gameData.publisher}}
                </div>
                <div>
                  <span class="body-2">Website:</span>
                  <a :href="gameData.webSite">{{gameData.webSite}}</a>
                </div>
              </div>
            </v-flex>
            <v-flex pa-1 xs12 lg4>
              <img :src="gameData.coverImageUrl" width="100%" alt>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout justify-center>
            <span class="subheading grey--text">Work in progress</span>
          </v-layout>

          <GameForm :_gameData="gameData" @imageDeleted="gameData.coverImageUrl=''"/>
        </v-container>
        <Confirmation @confirmed="deleteGame(gameData)" _message="Delete this game?"/>
      </v-card>
    </template>
  </div>
</template>

<script>
import fb from '@/firebase/config.js'
import GameForm from '@/components/games/GameForm.vue'
import Confirmation from '@/components/Confirmation.vue'
import games from '@/mixins/games/games.js'
import isAdmin from '@/mixins/isAdmin.js'

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
          if (!querySnapshot.empty) {
            querySnapshot.forEach(doc => {
              this.gameData = doc.data()
              this.gameData.documentId = doc.id
            })
          } else {
            this.$router.push('/404')
          }
          this.$store.commit('set', { type: 'loading', val: false })
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
  mixins: [games, isAdmin],
  components: {
    GameForm,
    Confirmation
  }
}
</script>
