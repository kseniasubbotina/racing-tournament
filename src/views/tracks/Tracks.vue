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
        <v-flex xs12 md6 pa-1 v-for="track in tracks" :key="track.id">
          <TrackItem :_track="track" @editTrack="editTrack" @deleteTrack="deleteTrack"/>
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
import message from '@/components/Message.vue'
import CountryFlag from '@/components/CountryFlag.vue'
import fb from '@/firebase/config.js'
import EditTrackForm from '@/components/tracks/EditTrackForm.vue'
import TrackItem from '@/components/tracks/TrackItem.vue'

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
    editTrack(track) {
      this.trackData = track
      this.editDialog = true
    },
    deleteTrack(track) {
      fb.tracksCollection
        .doc(track.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.getTracks()
          if (track.imageUrl) {
            fb.storageRef
              .child('tracks_images/' + track.id)
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
  components: {
    TrackItem,
    message,
    CountryFlag,
    EditTrackForm
  }
}
</script>
