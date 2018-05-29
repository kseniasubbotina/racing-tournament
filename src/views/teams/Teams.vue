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
          <v-data-table
    :headers="headers"
    :items="teams"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.seria }}</td>
    </template>
  </v-data-table>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog v-model="createTeamDialog" max-width="500px">
        <v-card>
          <v-card-title class="grey lighten-4 py-4 title">
            Create a new team
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
            <form>
              <v-layout row wrap>
                <v-flex xs12 justify-space-between>
                  <v-text-field label="Name" v-model="name" v-validate="'required|min:5'" type="text" name="name" :error-messages="errors.collect('name')"
                  ></v-text-field>
                  <SeriaSelect @changeSeria="onChangeSeria"/>
                </v-flex>
                <v-flex xs12>
                  <p>Picture</p>
                  
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
import SeriaSelect from '@/components/SeriaSelect.vue'

export default {
  name: 'Teams',
  data () {
    return {
      name: '',
      seria: '',
      createTeamDialog: false,
      image: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Seria', value: 'seria', align: 'right' }
      ],
      teams: [
        {
          value: false,
          name: 'Ferrari',
          seria: 'Formula 1',
          align: 'left'
        },
        {
          value: false,
          name: 'Renault',
          calories: 'Formula 2'
        }
      ]
    }
  },
  methods: {
    onChangeSeria (val) {
      this.seria = val
    }
  },
  components: {
    SeriaSelect
  }
}
</script>
