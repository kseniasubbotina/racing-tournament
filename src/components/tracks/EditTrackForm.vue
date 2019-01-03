<template>
  <v-dialog v-model="trackDialog" max-width="700px">
    <v-card>
      <v-card-title v-if="!_isNew" class="title">Edit track</v-card-title>
      <v-card-title v-else class="title">Add track</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <form v-if="trackData">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                label="Circuit Name"
                v-validate="'required|min:2'"
                type="text"
                name="name"
                v-model="trackData.name"
                :error-messages="errors.collect('name')"
              ></v-text-field>
            </v-flex>
            <v-flex xs8 justify-space-between>
              <CountrySelect
                @changeCountry="onChangeCountry"
                :_selectedCountry="trackData.country"
                :_isRequired="false"
              />
            </v-flex>
            <v-flex xs4>
              <v-text-field
                v-validate="'numeric|required'"
                name="first grand prix"
                type="text"
                :error-messages="errors.collect('first grand prix')"
                label="First grand prix"
                v-model="trackData.firstGP"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>Circuit Length</v-flex>
            <v-flex xs12>
              <v-text-field
                v-validate="{required: true, regex: '^([0-9.]+)$' }"
                name="length"
                type="text"
                :error-messages="errors.collect('length')"
                label="x.xx"
                v-model="trackData.length"
                suffix="km"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center">
              <div v-if="selectedFile">{{selectedFile.name}}</div>
              <div v-else>Track Photo</div>
              <ImageInput
                :_url="trackData.trackPhoto"
                @deleteImage="deleteImage('trackPhoto')"
                @fileSelected="trackPhotoSelected"
              />
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center">
              <div v-if="selectedFile">{{selectedFile.name}}</div>
              <div v-else>Track Scheme</div>
              <ImageInput
                :_url="trackData.trackScheme"
                @deleteImage="deleteImage('trackScheme')"
                @fileSelected="trackSchemeSelected"
              />
            </v-flex>
            <v-flex>
              <v-textarea v-model="trackData.description" label="Track Description"></v-textarea>
            </v-flex>
          </v-layout>
        </form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="red darken-2" flat @click="trackDialog=false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!_isNew"
          color="red darken-2"
          @click="updateTrack(trackData.id)"
          :loading="imageLoading"
          dark
        >Save</v-btn>
        <v-btn v-else color="red darken-2" @click="addTrack" :loading="imageLoading" dark>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ImageInput from '@/components/ImageInput.vue'
import message from '@/components/Message.vue'
import CountrySelect from '@/components/CountrySelect.vue'
import tracks from '@/mixins/tracks.js'
import fb from '@/firebase/config.js'

export default {
  name: 'editTrackForm',
  data() {
    return {
      trackData: {},
      selectedFile: null,
      selectedFiles: [],
      imageLoading: false,
      trackDialog: false
    }
  },
  props: {
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$root.$on('openDialog', this.openDialog)
  },
  methods: {
    openDialog(trackData) {
      this.trackData = trackData
      this.trackDialog = true
    },
    onfileSelected(file) {
      this.selectedFile = file
    },
    trackPhotoSelected(file) {
      file.trackImageType = 'trackPhoto'
      this.selectedFiles.push(file)
    },
    trackSchemeSelected(file) {
      file.trackImageType = 'trackScheme'
      this.selectedFiles.push(file)
    },
    onChangeCountry(val) {
      if (val) this.trackData.country = val
    },
    closeWindow() {
      this.trackDialog = false
      this.$store.commit('set', {
        type: 'message',
        val: { error: '', success: '' }
      })
    }
  },
  mixins: [tracks],
  components: {
    ImageInput,
    message,
    CountrySelect
  }
}
</script>