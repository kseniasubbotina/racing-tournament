<template>
  <v-card class="track-item_card">
    <v-layout justify-center>
      <v-card-title
        class="track-item_title"
        pointer
        primary-title
        @click="$router.push({name: 'Track', params: {id: _track.id}})"
      >
        <v-layout justify-center align-center row>
          <v-flex pr-2>
            <CountryFlag :_country="_track.country"/>
          </v-flex>
          <div class="headline track-item_name">{{_track.name}}</div>
        </v-layout>
      </v-card-title>
      <v-spacer/>
      <v-menu v-if="isAdmin" bottom left>
        <v-btn slot="activator" icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="$emit('editTrack', _track)">
            <v-list-tile-title>Edit</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="$emit('deleteTrack', _track)">
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>
    <v-card-text>
      <v-layout align-center>
        <v-flex>
          Country:
          <b>{{_track.country}}</b>
        </v-flex>
        <v-flex>
          Length:
          <b>{{_track.length}} km</b>
        </v-flex>
        <v-btn
          @click="$router.push({name: 'Track', params: {id: _track.id}})"
          color="success"
          flat
          round
        >View</v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'

export default {
  name: 'TrackItem',
  props: {
    _track: Object
  },
  computed: {
    isAdmin() {
      if (this.$store.getters.userData.role == '1') {
        return true
      } else return 0
    }
  },
  components: {
    CountryFlag
  }
}
</script>
