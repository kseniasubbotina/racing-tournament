<template>
  <v-layout class="image-input">
    <v-flex xs12 class="text-xs-center">
      <v-layout justify-center align-center column wrap>
        <v-flex style="cursor: pointer" @click="$refs.filenput.click()">
          <img v-if="previewUrl" width="200px" :src="previewUrl" alt>
          <div v-else alt>
            <v-icon style="font-size: 40px">collections</v-icon>
          </div>
        </v-flex>
        <v-flex>
          <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
          <v-btn v-if="url || _url" flat color="error" @click="deleteImage">Delete</v-btn>
          <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
        </v-flex>
        <!-- <message/> -->
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import message from '@/components/Message.vue'
export default {
  name: 'ImageInput',
  data() {
    return {
      selectedFile: null,
      url: ''
    }
  },
  props: {
    _url: String
  },
  computed: {
    previewUrl() {
      if (this.selectedFile) {
        return this.url
      } else {
        return this._url
      }
    }
  },
  methods: {
    onFileSelected(event) {
      let type = event.target.files[0].type
      if (type == 'image/png' || type == 'image/jpg' || type == 'image/jpeg') {
        this.selectedFile = event.target.files[0]
        this.url = URL.createObjectURL(this.selectedFile)
        this.$emit('fileSelected', this.selectedFile)
      } else {
        this.$store.commit('setMessage', {
          type: 'error',
          text: 'Incorrect type of file. Only PNG, JPEG allowed.'
        })
      }
    },
    deleteImage() {
      if (this.selectedFile) {
        this.selectedFile = null
        this.url = ''
      } else {
        this.$emit('deleteImage')
      }
    }
  },
  components: {
    message
  }
}
</script>
