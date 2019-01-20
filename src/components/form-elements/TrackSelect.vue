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
      const matchedCountry = this.countries.filter(
        item => item.track === nextVal
      )
      this.$emit('changeTrack', nextVal, matchedCountry[0].country)
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
      var tracksArr = []
      var countries = [
        {
          track: '',
          country: ''
        }
      ]
      fb.tracksCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          tracksArr.push(doc.id)
          countries.push({ track: doc.id, country: data.country })
        })
        this.tracks = tracksArr
        this.track = tracksArr[0]
        this.countries = countries
      })
    }
  }
}
</script>
