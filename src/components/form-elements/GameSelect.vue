<template>
  <v-autocomplete
    :disabled="_disabled"
    v-validate="'required'"
    type="text"
    name="Game"
    :error-messages="errors.collect('Game')"
    :items="games"
    label="Game"
    v-model="game"
  ></v-autocomplete>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'GameSelect',
  data: function() {
    return {
      game: 'F1 2018',
      games: [],
      keys: []
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
      const matchedGame = this.keys.filter(item => item.name === nextVal)
      this.$emit('changeGame', matchedGame[0])
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
      var gamesArr = []
      let keys = []
      fb.gamesCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          gamesArr.push(data.name)
          keys.push({ id: doc.id, name: data.name })
        })
        this.games = gamesArr
        this.game = gamesArr[0]
        this.keys = keys
      })
    }
  }
}
</script>
