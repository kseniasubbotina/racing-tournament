<template>
  <v-autocomplete
    :disabled="_disabled"
    v-validate="'required'"
    type="text"
    name="Track"
    :error-messages="errors.collect('Track')"
    :items="tracks"
    label="Track"
    v-model="track"
  ></v-autocomplete>
</template>

<script>
import fb from '@/firebase/config.js'

export default {
  name: 'TrackSelect',
  data: function() {
    return {
      track: 'F1 2018',
      tracks: []
    }
  },
  props: {
    _selectedTrack: String,
    _disabled: Boolean
  },
  created() {
    this.getTracks()
  },
  watch: {
    track(nextVal, prevVal) {
      this.$emit('changeTrack', nextVal)
    },
    _selectedTrack(val) {
      if (!val) {
        this.track = this.tracks[0]
      } else {
        this.track = val
      }
    }
  },
  methods: {
    getTracks() {
      // this.$store.commit('set', { type: 'loading', val: true })
      var tracksArr = []
      fb.tracksCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          tracksArr.push(data.id)
        })
        // this.$store.commit('set', { type: 'loading', val: false })
        this.tracks = tracksArr
      })
    }
  }
}
</script>
