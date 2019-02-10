<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="_championship.info.champImage">
      <v-container fill-height fluid></v-container>
    </v-img>
    <v-card-title
      class="game-item_title"
      pointer
      primary-title
      @click="$router.push({name: 'Championship', params: {id: _championship.info.name}})"
    >
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{_championship.info.name}}</span>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{_championship.info.game.name}}</span>
        <br>
        <span>Start: {{_championship.calendar[0].date}}</span>
        <br>
        <span>Drivers: {{_championship.drivers.length}}/{{_championship.info.playersCount}}</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        depressed
        @click="$router.push({name: 'Championship', params: {id: _championship.info.name}})"
      >Details</v-btn>
      <v-spacer></v-spacer>
      <v-layout align-center justify-end>
        <template v-if="_championship.approved">
          <v-icon color="success">check_circle_outline</v-icon>
          <!-- <span>Approved</span> -->
        </template>
        <template v-else>
          <v-icon color="amber">schedule</v-icon>
          <!-- <span>Pending</span> -->
        </template>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'ChampionshipItem',
  props: {
    _championship: Object
  }
}
</script>