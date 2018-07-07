<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class="py-2 title">
          Users
          <v-btn color="primary" dark  flat @click.stop="createTeamDialog = true"><i class="material-icons">
            add
            </i>Add new user
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
            :items="users"
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
                <td class="text-xs-right">
                    {{ props.item.email }}
                </td>
                <td class="text-xs-right">
                    {{ props.item.role }}
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
                      <v-btn color="primary"  flat @click.stop="createTeamDialog = true">
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
  </v-layout>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'

export default {
  name: 'Users',
  data () {
    return {
      name: '',
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
          text: 'E-mail', 
          align: 'right',
          sortable: true,
          value: 'email' 
        },
        { 
          text: 'Role', 
          align: 'right',
          value: 'role' 
        }
      ],
      users: [
        {
          value: true,
          name: 'SUVORKIN',
          role: 'Administrator',
          email: 'example@ex.com'
        },
        {
          value: true,
          name: 'Shomacher',
          role: 'Driver',
          email: 'example@ex.com'
        },
        {
          value: true,
          name: 'Alonso777',
          role: 'Driver',
          email: 'example@ex.com'
        },
        {
          value: true,
          name: 'Ivanov',
          role: 'Driver',
          email: 'example@ex.com'
        },
        {
          value: true,
          name: 'MadMAX',
          role: 'Driver',
          email: 'example@ex.com'
        }
      ]
    }
  },
  components: {
    CountrySelect
  }
}
</script>
