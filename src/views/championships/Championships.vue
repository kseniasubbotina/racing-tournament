<template>
  <v-layout wrap>
    <div v-if="loggedIn">You are logged in</div>
    <v-flex xs4 pa-1>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Championship #1</div>
          <div>F1 2017 championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="green">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4 pa-1>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Championship #2</div>
          <div>F1 2017 championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="green">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4 pa-1>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Championship #3</div>
          <div>Project Cars championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="green">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-layout>
      <v-flex sx12>
        <v-btn
        @click.stop="showCreateForm = true"
        color="red darken-2" dark
        fixed
        bottom
        right
        fab>
        <v-icon>add</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-dialog v-model="showCreateForm" max-width="800px">
          <ChampionshipCreateForm/>
    </v-dialog>
  </v-layout>
</template>

<script>
import ChampionshipCreateForm from '@/components/ChampionshipCreateForm'
import firebase from 'firebase'

export default {
  name: 'Championships',
  data () {
    return {
      showCreateForm: false,
      loggedIn: false
    }
  },
  components: {
    ChampionshipCreateForm
  }
}
</script>
