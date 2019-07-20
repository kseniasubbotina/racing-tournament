<template>
  <v-autocomplete
    v-validate="'required'"
    type="text"
    name="Platform"
    :error-messages="errors.collect('Platform')"
    :items="platforms"
    label="Platform"
    v-model="selectedPlatform"
  ></v-autocomplete>
</template>

<script>
import fb from '@/firebase/config.js'
export default {
  name: 'PlatformSelect',
  data() {
    return {
      selectedPlatform: '',
      platforms: []
    }
  },
  props: {
    _selectedPlatform: String,
    _disabled: { type: Boolean, default: false }
  },
  watch: {
    selectedPlatform(nextVal, prevVal) {
      this.$emit('changePlatform', nextVal)
    },
    _selectedPlatform(val) {
      if (!val) {
        this.selectedPlatform = this.platforms[0]
      } else {
        this.selectedPlatform = val
      }
    }
  },
  created() {
    this.getPlatforms()
  },
  methods: {
    getPlatforms() {
      var platformsArr = []
      fb.platformsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          platformsArr.push(data.name)
        })
        this.platforms = platformsArr
        this.selectedPlatform = platformsArr[0]
      })
    }
  }
}
</script>
