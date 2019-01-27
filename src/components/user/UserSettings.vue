<template>
  <v-layout>
    <form>
      <v-layout row wrap>
        <v-flex xs12 justify-space-between>
          <CountrySelect @changeCountry="onChangeCountry" :_selectedCountry="_userData.country"/>
        </v-flex>
      </v-layout>
      <!-- <v-layout column justify-center align-center> -->
      <v-flex>User image</v-flex>
      <ImageInput
        :_url="_userData.avatarURL"
        @fileSelected="onfileSelected"
        @deleteImage="deleteImage"
      />
      <!-- </v-layout> -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-layout column wrap>
          <v-flex>
            <v-btn
              class="white--text"
              depressed
              color="red"
              @click="update(userData.id, userData.username, userData.country, userData.avatarURL, userData.role)"
              :loading="loading"
            >Save</v-btn>
          </v-flex>
          <v-flex>
            <message/>
          </v-flex>
        </v-layout>
      </v-card-actions>
    </form>
  </v-layout>
</template>

<script>
import ImageInput from '@/components/form-elements/ImageInput.vue'
import Message from '@/components/Message.vue'
import CountrySelect from '@/components/CountrySelect.vue'
import updateUser from '@/mixins/users/updateUser.js'

export default {
  name: 'user-settings',
  data() {
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
    _userData(val) {
      this.userData = val
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    message() {
      return this.$store.getters.message
    }
  },
  methods: {
    onChangeCountry(val) {
      this.userData.country = val
    },
    onfileSelected(file) {
      this.selectedFile = file
    },
    deleteImage() {
      this.userData.avatarURL = ''
      this.deleteAvatar(
        this.userData.id,
        this.userData.username,
        this.userData.country,
        this.userData.avatarURL,
        this.userData.role
      )
    }
  },
  components: {
    CountrySelect,
    Message,
    ImageInput
  },
  mixins: [updateUser]
}
</script>