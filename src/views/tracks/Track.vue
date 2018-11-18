<template>
  <div>
    <div v-if="loading" class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="red"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <div>{{trackData.name}}</div>
      <div>{{trackData.country}}</div>
      <div>length: {{trackData.length}}</div>
      <div>First GP: {{trackData.firstGP}}</div>
      <div>{{trackData.description}}</div>
  </v-container>
  </div>
</template>
 <script>
import fb from '@/firebase/config.js'
export default {
  name: 'trackPage',
  data () {
    return {
    trackData: {}
    }
  },
  created () {
    this.getTrack()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getTrack () {
      this.$store.commit('set', { type: 'loading', val: true })
      fb.tracksCollection.doc(this.$route.params.id).onSnapshot(doc => {
        if(doc.exists) {
          this.trackData = doc.data()
          this.$store.commit('set', { type: 'loading', val: false })
        }
      })
    }
  }
}
 </script>
 