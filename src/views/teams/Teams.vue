<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class="grey lighten-4 py-2 title">
          All teams
          <v-spacer></v-spacer>
          <v-btn color="success" @click.stop="createTeamDialog = true">Add new</v-btn>
        </v-card-title>
        <v-layout column>
          <v-flex pa-1>
            Team 1
          </v-flex>
          <v-divider></v-divider>
          <v-flex pa-1>
            Team 1
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog v-model="createTeamDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span>Add new team</span>
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <form>
              <v-layout row wrap>
                <v-flex xs12 justify-space-between>
                  <v-text-field label="Name" v-model="name" v-validate="'required|min:5'" type="text" name="name" :error-messages="errors.collect('name')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Password" v-model="password" v-validate="'required'" type="password" name="password" :error-messages="errors.collect('password')">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="createTeamDialog=false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'Teams',
  data () {
    return {
      name: '',
      createTeamDialog: false
    }
  }
}
</script>
