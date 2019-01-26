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
      track: '',
      keys: {},
      tracks: [],
      countries: []
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
      if (nextVal) {
        const matchedTrack = this.keys.filter(item => item.name === nextVal)
        this.$emit('changeTrack', matchedTrack[0])
      }
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
      let tracksArr = []
      let keys = []
      // let countries = [
      //   {
      //     track: '',
      //     country: ''
      //   }
      // ]
      fb.tracksCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let data = doc.data()
          tracksArr.push(data.name)
          keys.push({ id: doc.id, name: data.name, country: data.country })
          // countries.push({ track: data.name, country: data.country })
        })
        this.tracks = tracksArr
        this.keys = keys
        this.track = tracksArr[0]
        // this.countries = countries
      })
    }
  }
}
</script>
