<template>
  <v-card>
    <div>
      <div v-if="loading" class="text-xs-center">
        <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
      </div>
      <v-container v-else>
        <div v-if="isAdmin">
          <v-btn flat @click="openForm(trackData)">
            <v-icon>edit</v-icon>Edit
          </v-btn>
          <v-btn color="error" flat @click="openConfirmation">
            <v-icon>delete</v-icon>Delete
          </v-btn>
        </div>
        <EditTrackForm :_trackData="trackData"/>
        <v-layout>
          <v-flex>
            <div>
              <h1>{{trackData.name}}</h1>
            </div>
            <h3>Track info:</h3>
            <div>{{trackData.country}}</div>
            <div>length: {{trackData.length}}</div>
            <div>First GP: {{trackData.firstGP}}</div>
          </v-flex>
          <!-- <v-flex sm4 xs12>
            <img :src="trackData.trackPhoto" width="100%" alt>
          </v-flex>-->
        </v-layout>
        <v-layout>
          <v-flex>
            <div v-html="trackData.description"></div>
          </v-flex>
        </v-layout>

        <img :src="trackData.trackScheme" width="100%" alt>
      </v-container>
      <Confirmation @confirmed="deleteTrack" _message="Delete this track?"/>
    </div>
  </v-card>
</template>
 <script>
import fb from '@/firebase/config.js'
import EditTrackForm from '@/components/tracks/EditTrackForm.vue'
import Confirmation from '@/components/Confirmation.vue'
import tracks from '@/mixins/tracks/tracks.js'
import isAdmin from '@/mixins/isAdmin.js'

export default {
  name: 'trackPage',
  data() {
    return {
      showEditWindow: false,
      trackData: {}
    }
  },
  created() {
    this.getTrack()
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    openForm(track) {
      this.$root.$emit('openDialog', track)
    },
    openConfirmation(track) {
      this.$root.$emit('confirm', track)
    },
    deleteTrack() {
      fb.tracksCollection
        .doc(this.trackData.documentId)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.$router.push('/tracks')
          if (this.trackData.imageUrl) {
            fb.storageRef
              .child('tracks_images')
              .delete()
              .then(() => {
                // success
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
  mixins: [tracks, isAdmin],
  components: {
    EditTrackForm,
    Confirmation
  }
}
</script>
 