<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular :size="50" color="red" indeterminate></v-progress-circular>
    </div>
    <v-container v-else>
      <v-btn flat @click.stop="showEditWindow = true">
        <v-icon>edit</v-icon>Edit
      </v-btn>
      <v-dialog v-model="showEditWindow" max-width="700px">
        <EditTrackForm @closeWindow="showEditWindow = false" :_trackData="trackData"/>
      </v-dialog>
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
    getTrack() {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.tracksCollection.doc(this.$route.params.id).onSnapshot(doc => {
        if (doc.exists) {
          this.trackData = doc.data()
          this.trackData.id = doc.id
          this.$store.commit('set', { type: 'loading', val: false })
        }
      })
    }
  },
  components: {
    EditTrackForm
  }
}
</script>
 