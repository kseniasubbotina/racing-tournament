<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="_game.coverImageUrl">
      <v-layout>
        <v-spacer/>
        <v-menu v-if="isAdmin" bottom left>
          <v-btn class="black--text" color="white" slot="activator" icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="$emit('editGame', _game)">
              <v-list-tile-title>Edit</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="$emit('deleteGame', _game)">
              <v-list-tile-title>Delete</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-layout>
      <v-container fill-height fluid></v-container>
    </v-img>
    <v-card-title
      class="game-item_title"
      pointer
      primary-title
      @click="$router.push({name: 'Game', params: {id: _game.name}})"
    >
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{_game.name}}</span>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{_game.developer}}</span>
        <br>
        <span v-if="_game.platforms">{{_game.platforms.join(', ')}}</span>
        <br>
        <span>{{_game.releaseDate}}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed @click="$router.push({name: 'Game', params: {id: _game.name}})">Details</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GameItem',
  props: {
    _game: Object
  },
  computed: {
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return 0
    }
  }
}
</script>
