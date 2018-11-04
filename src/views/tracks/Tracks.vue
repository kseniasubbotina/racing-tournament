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
      <v-dialog v-model="addTeamDialog" max-width="500px">
        <v-card>
          <v-container grid-list-sm class="pa-4">
            <v-card-title class="py-4 title">
              Add new track
            </v-card-title>
            <form>
              <v-layout row wrap>
                <v-flex>
                  <v-text-field label="Name" 
                    v-validate="'required|min:2'" 
                    type="text" name="name"
                    v-model="name"
                    :error-messages="errors.collect('name')">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 justify-space-between>
                  <CountrySelect />
                </v-flex>
                <v-flex xs12>
                  Track length
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-validate="'numeric|required'" name="length" type="text"
                    :error-messages="errors.collect('length')"
                    label="Km"
                    v-model="length"
                    suffix="km"
                  ></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    v-validate="'numeric|required'" name="length" type="text"
                    :error-messages="errors.collect('length')"
                    label="M"
                    v-model="length"
                    suffix="m"
                  ></v-text-field>
                </v-flex>
                Track image
                <v-flex xs12 justify-center>
                  <v-btn @click="$refs.filenput.click()" flat>Browse</v-btn>
                  <v-btn flat color="error">Delete</v-btn>
                  <input style="display: none" ref="filenput" type="file" @change="onFileSelected">
                </v-flex>
                <v-flex>
                  <v-textarea
                    v-model="trackDescription"
                    label="Track description"
                  ></v-textarea>
                </v-flex>

              </v-layout>
            </form>
            <message />
            <v-card-actions>
              <v-btn color="red darken-2"  flat @click.stop="addTeamDialog=false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red darken-2" dark>Save</v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'

export default {
  data () {
    return {
      addTeamDialog: false,
      tracks: [],
      selectedFile: null,
      name: '',
      length: '',
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
    }
  },
  components: {
    CountrySelect,
    message
  }
}
</script>
