<template>
  <v-autocomplete
    :disabled="_disabled"
    v-validate="'required'"
    type="text"
    name="game"
    :error-messages="errors.collect('Game')"
    :items="games"
    label="Game"
    v-model="game"
  ></v-autocomplete>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'CountrySelector',
  data: function() {
    return {
      game: '',
      games: []
    }
  },
  props: {
    _selectedGame: String,
    _disabled: Boolean
  },
  created() {
    this.getGames()
  },
  watch: {
    game(nextVal, prevVal) {
      this.$emit('changeGame', nextVal)
    },
    _selectedGame(val) {
      if (!val) {
        this.game = this.games[0]
      } else {
        this.game = val
      }
    }
  },
  methods: {
    getGames() {
      // this.$store.commit('set', { type: 'loading', val: true })
      var gamesArr = []
      fb.gamesCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          gamesArr.push(data.id)
        })
        // this.$store.commit('set', { type: 'loading', val: false })
        this.games = gamesArr
      })
    }
  }
}
</script>
