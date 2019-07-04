<template>
  <v-card>
    <div :style="champImageStyles"></div>
    <v-card-title
      class="game-item_title"
      pointer
      primary-title
      @click="$router.push({name: 'Championship', params: {id: path}})"
    >
      <!--  -->
      <v-layout fill-height>
        <v-flex xs12 align-end flexbox>
          <span class="subheading">{{_championship.info.name}}</span>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <div>
        <span class="grey--text">{{_championship.info.game.name}}</span>
        <div>Platform: {{_championship.info.platform}}</div>
        <div>Start: {{dateTimeToBrowser(_championship.calendar[0].date, _championship.calendar[0].time, 'date')}}</div>
        <div>Drivers: {{driversCount}}/{{_championship.info.playersCount}}</div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn depressed @click="$router.push({name: 'Championship', params: {id: path}})">Details</v-btn>
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
import convertDateTime from '@/mixins/convertDateTime.js'

export default {
  name: 'ChampionshipItem',
  props: {
    _championship: Object,
    _drivers: Object
  },
  computed: {
    path () {
      return this._championship.info.name
    },
    driversCount() {
      return this._drivers ? Object.keys(this._drivers).length : 0
    },
    champImageStyles() {
      let imageUrl = this._championship && this._championship.info ? this._championship.info.champImage : ''
      return {
        'background-image': 'url("' + imageUrl + '")',
        height: '200px',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }
    }
  },
  mixins: [
    convertDateTime
  ]
}
</script>