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
          <v-card-title class="py-4 title">
            Add new track
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <form>
              <v-layout row wrap>
                <v-flex xs12 justify-space-between>
                  <CountrySelect />
                </v-flex>
              </v-layout>
            </form>
            <message />
          </v-container>
          <v-card-actions>
            <v-btn color="red darken-2"  flat @click.stop="addTeamDialog=false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red darken-2" dark>Save</v-btn>
          </v-card-actions>
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
      tracks: []
    }
  },
  computed: {
    isLoggedIn () {
      var isLoggedIn = this.$store.getters.user ? true : false
      return isLoggedIn
    }
  },
  components: {
    CountrySelect,
    message
  }
}
</script>
