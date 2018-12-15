<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="_game.coverImageUrl">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{_game.name}}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>
    <v-card-title>
      <div>
        <span class="grey--text">{{_game.developer}}</span>
        <br>
        <span>Whitehaven Beach</span>
        <br>
        <span>Whitsunday Island, Whitsunday Islands</span>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'GameItem',
  props: {
    _game: Object
  }
}
</script>
