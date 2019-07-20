<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <template v-else>
      <div v-if="isAdmin">
        <v-btn flat @click="openForm(trackData)">
          <v-icon>edit</v-icon>Edit
        </v-btn>
        <v-btn color="error" flat @click="openConfirmation">
          <v-icon>delete</v-icon>Delete
        </v-btn>
      </div>
      <v-card>
        <v-container>
          <EditTrackForm :_trackData="trackData"/>
          <h1>{{trackData.name}}</h1>
          <v-layout class="my-3" wrap>
            <v-flex>
              <span>Country:</span>

              <v-layout justify-center class="subheading">
                <v-flex shrink class="mr-1">
                  <CountryFlag :_width="20" :_country="trackData.country"/>
                </v-flex>
                <v-flex>{{trackData.country}}</v-flex>
              </v-layout>
            </v-flex>
            <v-flex>
              <span>Length:</span>
              <div class="subheading">{{trackData.length}} km</div>
            </v-flex>
            <v-flex>
              <span>First GP:</span>
              <div class="subheading">{{trackData.firstGP}}</div>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <div v-html="trackData.description"></div>
            </v-flex>
          </v-layout>
          <v-layout justify-center class="ma-4">
            <img :src="trackData.trackScheme" width="100%" alt>
          </v-layout>
        </v-container>
      </v-card>
    </template>

    <Confirmation @confirmed="deleteTrack" _message="Delete this track?"/>
  </div>
</template>
 <script>
import CountryFlag from '@/components/CountryFlag.vue'
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
    CountryFlag,
    EditTrackForm,
    Confirmation
  }
}
</script>
 