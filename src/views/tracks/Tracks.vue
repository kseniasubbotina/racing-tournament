<template>
  <v-layout wrap>
    <v-spacer></v-spacer>
     <v-btn color="white"  flat 
        @click.stop="addTeamDialog = true">
        <v-icon>add</v-icon> Add new
      </v-btn>
    <v-flex xs12 pa-1 v-for="item in 4" :key="item.id">
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Track #1</div>
        </v-card-title>
        <v-card-text>
          <div>Track information</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green">View</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
      <v-dialog v-model="addTeamDialog" max-width="700px">
        <v-card>
          <v-container grid-list-sm class="pa-4">
            <v-card-title class="py-4 title">
              Add new track
            </v-card-title>
            <form>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field label="Circuit Name" 
                    v-validate="'required|min:2'" 
                    type="text" name="name"
                    v-model="name"
                    :error-messages="errors.collect('name')">
                  </v-text-field>
                </v-flex>
                <v-flex xs8 justify-space-between>
                  <CountrySelect />
                </v-flex>
                <v-flex xs4>
                 <v-text-field
                    v-validate="'numeric|required'" name="first grand prix" type="text"
                    :error-messages="errors.collect('first grand prix')"
                    label="First grand prix"
                    v-model="firstGP"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  Circuit Length
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-validate="'numeric|required'" name="length" type="text"
                    :error-messages="errors.collect('length')"
                    label="Km"
                    v-model="length.km"
                    suffix="km"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-validate="'numeric|required'" name="length" type="text"
                    :error-messages="errors.collect('length')"
                    label="M"
                    v-model="length.m"
                    suffix="m"
                  ></v-text-field>
                </v-flex>
                Track Image
                <v-flex xs12 justify-center>
                  <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                  <v-btn flat color="error">Delete</v-btn>
                  <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
                </v-flex>
                <v-flex>
                  <v-textarea
                    v-model="trackDescription"
                    label="Track Description"
                  ></v-textarea>
                </v-flex>

              </v-layout>
            </form>
            <message />
            <v-card-actions>
              <v-btn color="red darken-2"  flat @click.stop="addTeamDialog=false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" @click="addTrack" dark>Save</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'
import fb from '@/firebase/config.js'

export default {
  data () {
    return {
      addTeamDialog: false,
      tracks: [],
      selectedFile: null,
      name: '',
      length: {
        km: '',
        m: ''
      },
      firstGP: '',
      trackDescription: '',
      country: ''
    }
  },
  computed: {
    isLoggedIn () {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile)
    },
    addTrack () {
      fb.tracksCollection.doc(this.name).set({
        name: this.name,
        country: this.country,
        firstGP: this.firstGP,
        length: this.length.km + '.' + this.length.m,
        description: this.trackDescription
      }).then(
        console.log('Track note created!')
      )
    }
  },
  components: {
    CountrySelect,
    message
  }
}
</script>
