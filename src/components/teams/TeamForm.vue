<template>
  <v-dialog v-model="teamFormDialog" max-width="500px">
    <v-card>
      <v-card-title v-if="_isNew" class="py-4 title">Create a new team</v-card-title>
      <v-card-title v-else class="py-4 title">Edit the team</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <form>
          <v-layout row wrap>
            <v-flex xs12 justify-space-between>
              <v-text-field
                label="Team Name"
                v-model="teamData.name"
                v-validate="'required|min:3'"
                type="text"
                name="name"
                :error-messages="errors.collect('name')"
              ></v-text-field>
              <v-text-field
                label="Drivers Places"
                v-model="teamData.places"
                v-validate="'required|min:1|numeric'"
                type="number"
                name="places"
                :error-messages="errors.collect('places')"
              ></v-text-field>
              <SeriaSelect :_selectedSeria="teamData.seria" @changeSeria="onChangeSeria"/>
            </v-flex>
            <v-flex xs12>
              <p>Picture</p>
              <ImageInput
                v-if="teamFormDialog"
                :_url="teamData.teamLogo"
                @fileSelected="onfileSelected"
                @deleteImage="deleteTeamLogo"
              />
            </v-flex>
          </v-layout>
        </form>
      </v-container>
      <v-card-actions>
        <v-btn color="red darken-2" flat @click.stop="teamFormDialog=false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!_isNew"
          color="red darken-2"
          @click="updateTeam(teamData)"
          :loading="imageLoading"
          dark
        >Save</v-btn>
        <v-btn v-else color="red darken-2" @click="addTeam" :loading="imageLoading" dark>Add a team</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
 <script>
import fb from '@/firebase/config.js'
import SeriaSelect from '@/components/SeriaSelect.vue'
import ImageInput from '@/components/form-elements/ImageInput.vue'
import teams from '@/mixins/teams/teams.js'
export default {
  name: 'TeamForm',
  data() {
    return {
      teamFormDialog: false,
      teamData: {},
      selectedFile: null,
      imageLoading: false
    }
  },
  props: {
    _isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$root.$on('openTeamFormDialog', this.openDialog)
  },
  methods: {
    onChangeSeria(seria) {
      this.teamData.seria = seria
    },
    openDialog(teamData) {
      this.teamData = teamData
      this.teamFormDialog = true
    },
    closeDialog() {
      this.teamFormDialog = false
    },
    onfileSelected(file) {
      this.selectedFile = file
    }
  },
  mixins: [teams],
  components: {
    SeriaSelect,
    ImageInput
  }
}
</script>
 