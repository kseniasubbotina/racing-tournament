<template>
  <v-layout>
    <form>
      <v-layout row wrap>
        <v-flex xs12 justify-space-between>
          <CountrySelect @changeCountry="onChangeCountry" :_selectedCountry="userData.country"/>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Username" v-model="userData.username" v-validate="{required: true, min: 2 }" type="text" name="name" :error-messages="errors.collect('name')">
          </v-text-field>
        </v-flex>
        <v-flex>
          <v-layout column wrap>
            <v-flex justify-start>
            <v-avatar size="100">
              <img v-if="userData.avatarURL" :src="userData.avatarURL" alt="">
              <img v-else src="http://pol.audio/media/user-avatar.png" alt="">
            </v-avatar>
            <div v-if="selectedFile">
              {{selectedFile.name}}
            </div>
            </v-flex>
            <v-flex justify-start>
              <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
              <v-btn v-if="userData.avatarURL" flat color="error" @click="deleteImage">Delete</v-btn>
            </v-flex>
          </v-layout>
          <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-layout column wrap>
          <v-flex>
            <v-btn @click="update(userData.id, userData.username, userData.country, userData.avatarURL, userData.role)"
            :loading="loading">
            Save
          </v-btn>
          </v-flex>
          <v-flex>
            {{message}}
          </v-flex>
        </v-layout>
      </v-card-actions>
  </form>
  </v-layout>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import updateUser from '@/mixins/updateUser.js'

export default {
  name: 'user-settings',
  data () {
    return {
      userData: {},
      selectedFile: null,
      loadingProgress: null
    }
  },
  props: {
    _userData: Object
  },
  watch: {
    storeUserData() {
      this.fetchuserData()
    }
  },
  created () {
    this.fetchuserData()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    storeUserData () {
      return this.$store.getters.userData
    },
    message () {
      return this.$store.getters.message
    }
  },
  methods: {
    fetchuserData () {
      this.userData = this.$store.getters.userData
    },
    onChangeCountry (val) {
      this.userData.country = val
    },
    deleteImage () {
      this.userData.avatarURL = ''
    },
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    }
  },
  components: {
    CountrySelect
  },
  mixins: [
    updateUser
  ]
}
</script>