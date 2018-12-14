<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-container v-else>
      <v-btn flat @click="openForm(trackData)">
        <v-icon>edit</v-icon>Edit
      </v-btn>
      <v-btn color="error" flat @click.stop="deleteTrack">
        <v-icon>delete</v-icon>Delete
      </v-btn>
      <EditTrackForm :_trackData="trackData"/>
      <div>{{trackData.name}}</div>
      <div>{{trackData.country}}</div>
      <div>length: {{trackData.length}}</div>
      <div>First GP: {{trackData.firstGP}}</div>
      <div>{{trackData.description}}</div>
      <img :src="trackData.imageUrl" width="100%" alt>
    </v-container>
  </div>
</template>
 <script>
import fb from '@/firebase/config.js'
import EditTrackForm from '@/components/tracks/EditTrackForm.vue'

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
              .child('tracks_images/' + this.trackData.id)
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
    EditTrackForm
  }
}
</script>
 