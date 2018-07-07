<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class=" py-2 title">
          All teams
          <v-btn color="red accent-21" flat @click.stop="createTeamDialog = true"><i class="material-icons">
            add
            </i>Add new
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-layout column>
          <v-data-table
            :headers="headers"
            :items="teams"
            :loading="loading"
            :search="search"
            class="elevation-1"
            item-key="name"
          >
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">
                  {{ props.item.name }}
                </td>
                <td class="text-xs-right">{{ props.item.seria }}
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat>
                <v-layout>
                  <v-flex>
                    <v-card-text class="text-xs-left">{{ props.item.name }} <br> Another details</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text class="text-xs-right">
                      <v-btn color="blue lighten-3" flat @click.stop="createTeamDialog = true">
                        <v-icon>edit</v-icon> Edit
                      </v-btn>
                      <v-btn color="red" flat @click.stop="confirmDialog = true">
                        <v-icon>delete</v-icon> Delete
                      </v-btn>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </v-data-table>
        </v-layout>
      </v-card>
    </v-flex>
    <v-dialog v-model="createTeamDialog" max-width="500px">
        <v-card>
          <v-card-title class="py-4 title">
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
            <v-btn color="blue lighten-3" flat @click.stop="createTeamDialog=false">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red accent-2">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="confirmDialog" max-width="500px">
        <v-card>
          <v-card-title class="py-4 title">
            Please confirm
          </v-card-title>
          <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12 justify-space-between>
                  Delete ItemName? 
                </v-flex>
              </v-layout>
          </v-container>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn color="blue lighten-3" flat @click.stop="confirmDialog=false">Close</v-btn>
              <v-btn dark color="red"><v-icon>delete</v-icon> Delete</v-btn>
            </v-layout>
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
      confirmDialog: false,
      image: '',
      search: '',
      loading: false,
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { 
          text: 'Seria', 
          value: 'seria', 
          align: 'right' 
        }
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
          seria: 'Formula 1'
        },
        {
          value: false,
          name: 'Citroen Racing',
          seria: 'Rally'
        },
        {
          value: false,
          name: 'M-Sport',
          seria: 'Rally'
        },
        {
          value: true,
          name: 'Sauber',
          seria: 'Formula 1'
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
