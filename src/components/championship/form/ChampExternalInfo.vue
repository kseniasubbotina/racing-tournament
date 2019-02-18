<template>
  <div>
    <v-layout column wrap>Social links
      <v-flex>
        <v-text-field
          label="YouTube channel"
          v-model="YouTube"
          v-validate="'min:5|max:50'"
          counter="50"
          type="text"
          name="YouTube"
          :error-messages="errors.collect('YouTube')"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-text-field
          label="Twitch channel"
          v-model="Twitch"
          v-validate="'min:5|max:50'"
          counter="50"
          type="text"
          name="Twitch"
          :error-messages="errors.collect('Twitch')"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout justify-end>
      <v-btn flat @click="$emit('backStep')">Back</v-btn>
      <v-btn depressed dark color="green" @click="nextStep">Continue</v-btn>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ChampExternalInfo',
  data() {
    return {
      YouTube: '',
      Twitch: ''
    }
  },
  props: {
    _externalInfo: Object
  },
  mounted() {
    this.fetchExternalInfo()
  },
  methods: {
    fetchExternalInfo() {
      if (this._externalInfo) {
        this.YouTube = this._externalInfo.YouTube
        this.Twitch = this._externalInfo.Twitch
      }
    },
    nextStep() {
      this.$validator.validate().then(result => {
        if (result) {
          let data = {
            YouTube: this.YouTube,
            Twitch: this.Twitch
          }
          this.$emit('nextStep', data, 'externalInfo')
        }
      })
    }
  }
}
</script>