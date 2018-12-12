<template>
  <v-container>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-layout wrap>
        <v-spacer></v-spacer>
        <v-btn v-if="isAdmin" flat @click="createDialog = true">
          <v-icon>add</v-icon>Add new
        </v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex xs4 pa-1 v-for="track in tracks" :key="track.id">
          <v-card>
            <v-layout>
              <v-card-title primary-title>
                <v-flex pr-4>
                  <CountryFlag :_country="track.country"/>
                </v-flex>
                <div class="headline">{{track.name}}</div>
              </v-card-title>
              <v-spacer/>
              <v-menu v-if="isAdmin" bottom left>
                <v-btn slot="activator" icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click="editTrack(track)">
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile @click="deleteTrack">
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-layout>
            <v-card-text>{{track.description}}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="$router.push({name: 'Track', params: {id: track.id}})"
                flat
                color="green"
              >View</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <!-- Dialog for edit track info -->
        <v-dialog v-model="editDialog" max-width="700px">
          <EditTrackForm :_trackData="trackData" @closeWindow="editDialog = false"/>
        </v-dialog>
        <!-- Dialog for create a new track -->
        <v-dialog v-model="createDialog" max-width="700px">
          <EditTrackForm
            :_isNew="true"
            @updateTracks="getTracks"
            @closeWindow="createDialog = false"
          />
        </v-dialog>
      </v-layout>
    </div>
  </v-container>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'
import CountryFlag from '@/components/CountryFlag.vue'
import fb from '@/firebase/config.js'
import EditTrackForm from '@/components/tracks/EditTrackForm.vue'

export default {
  data() {
    return {
      createDialog: false,
      editDialog: false,
      tracks: [],
      trackData: {}
    }
  },
  computed: {
    isAdmin() {
      if (this.$store.getters.userData.role == '1') {
        return true
      } else return 0
    },
    loading() {
      return this.$store.getters.loading
    },
    isLoggedIn() {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  created() {
    this.getTracks()
  },
  methods: {
    getTracks() {
      this.$store.commit('set', { type: 'loading', val: true })
      var tracksArr = []
      fb.tracksCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          for (let i = 0; i < data.length; i++) {
            data.id = doc.id
          }
          tracksArr.push(data)
        })
        this.$store.commit('set', { type: 'loading', val: false })
        this.tracks = tracksArr
      })
    },
    editTrack(data) {
      this.trackData = data
      this.editDialog = true
    },
    deleteTrack() {
      //
    }
  },
  components: {
    CountrySelect,
    message,
    CountryFlag,
    EditTrackForm
  }
}
</script>
