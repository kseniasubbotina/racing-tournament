<template>
  <div>
    <v-layout wrap>
      <h1>Available Championships</h1>
      <v-spacer></v-spacer>
      <v-btn :to="'/create'" depressed color="success">
        <v-icon>add</v-icon>Create Championship
      </v-btn>
    </v-layout>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 pa-1>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Championship #1</div>
          </v-card-title>
          <v-card-text>
            <div>F1 2017 championship - no assists</div>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="green">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-layout>
        <v-flex sx12>
          <v-btn
            @click.stop="showCreateForm = true"
            color="red darken-2"
            dark
            fixed
            bottom
            right
            fab
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
      <v-dialog v-model="showCreateForm" max-width="800px">
        <ChampionshipCreateForm/>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import ChampionshipCreateForm from '@/components/championship/ChampionshipCreateForm'
import firebase from 'firebase'

export default {
  name: 'Championships',
  data() {
    return {
      showCreateForm: false
    }
  },
  components: {
    ChampionshipCreateForm
  }
}
</script>
