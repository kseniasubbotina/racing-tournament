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
        <div>{{trackData.name}}</div>
        <div>{{trackData.country}}</div>
        <div>length: {{trackData.length}}</div>
        <div>First GP: {{trackData.firstGP}}</div>
        <div>{{trackData.description}}</div>
        <img :src="trackData.trackPhoto" width="50%" alt>
        <img :src="trackData.trackScheme" width="50%" alt>
      </v-container>
      <Confirmation @confirmed="deleteTrack" _message="Delete this track?"/>
    </div>
  </v-card>
</template>
 <script>
import fb from '@/firebase/config.js'
import EditTrackForm from '@/components/tracks/EditTrackForm.vue'
import Confirmation from '@/components/Confirmation.vue'

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
    },
    isAdmin() {
      if (
        this.$store.getters.user &&
        this.$store.getters.userData.role == '1'
      ) {
        return true
      } else return 0
    }
  },
  methods: {
    openForm(track) {
      this.$root.$emit('openDialog', track)
    },
    openConfirmation(track) {
      this.$root.$emit('confirm', track)
    },
    getTrack() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.tracksCollection.doc(this.$route.params.id).onSnapshot(doc => {
        if (doc.exists) {
          this.trackData = doc.data()
          this.trackData.id = doc.id
          this.$store.commit('set', { type: 'loading', val: false })
        }
      })
    },
    deleteTrack() {
      fb.tracksCollection
        .doc(this.trackData.id)
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
  components: {
    EditTrackForm,
    Confirmation
  }
}
</script>
 