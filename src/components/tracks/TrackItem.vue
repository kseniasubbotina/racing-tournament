<template>
  <v-card class="track-item_card">
    <v-img class="white--text" height="200px" :src="_track.imageUrl">
      <v-layout justify-center>
        <v-spacer/>
        <v-menu v-if="isAdmin" bottom left>
          <v-btn class="black--text" color="white" slot="activator" icon>
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
      <v-container fill-height fluid></v-container>
    </v-img>
    <v-card-title
      class="track-item_title"
      pointer
      primary-title
      @click="$router.push({name: 'Track', params: {id: _track.id}})"
    >
      <!-- <v-layout justify-center align-center row>
        <v-flex pr-2>
          <CountryFlag :_country="_track.country"/>
        </v-flex>
        <div class="headline track-item_name">{{_track.name}}</div>
      </v-layout>-->
      <v-layout fill-height>
        <v-flex pr-2>
          <CountryFlag :_country="_track.country"/>
        </v-flex>
        <v-flex xs12 align-end flexbox>
          <span class="headline">{{_track.name}}</span>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex>Country: {{_track.country}}</v-flex>
        <br>
        <v-flex>Length: {{_track.length}}</v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$router.push({name: 'Track', params: {id: _track.id}})" depressed>Details</v-btn>
    </v-card-actions>
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
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return 0
    }
  },
  components: {
    CountryFlag
  }
}
</script>
