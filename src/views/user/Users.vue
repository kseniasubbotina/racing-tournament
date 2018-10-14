<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class="py-2 title">
          Users
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
            item-key="username"
          >
          <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">
                  {{ props.item.username }}
                </td>
                <td class="text-xs-right">
                    {{ props.item.country }}
                </td>
                <td class="text-xs-right">
                  <div v-if="props.item.role == 1">Administrator</div>
                  <div v-if="props.item.role == 0">Subscriber</div>
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
                      <v-btn color="red darken-2"  flat @click.stop="createTeamDialog = true">
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
import fb from '@/firebase/config.js'

export default {
  name: 'Users',
  data () {
    return {
      users: [],
      name: '',
      createTeamDialog: false,
      confirmDialog: false,
      image: '',
      search: '',
      headers: [
        {
          text: 'Username',
          align: 'left',
          sortable: true,
          value: 'username'
        },
        { 
          text: 'Country', 
          align: 'right',
          sortable: true,
          value: 'country' 
        },
        { 
          text: 'Role', 
          align: 'right',
          sortable: true,
          value: 'role' 
        }
      ]
    }
  },
  created () {
    this.getUsers()
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    getUsers () {
      this.$store.commit('set', {type: 'loading', val: true})
      var usersArr = []
      fb.usersCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        usersArr.push(doc.data())
        })
        this.users = usersArr
        this.$store.commit('set', {type: 'loading', val: false})
      })
    }
  },
  components: {
    CountrySelect
  }
}
</script>
