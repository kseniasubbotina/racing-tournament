<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class="py-2 title">Users
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
            :rows-per-page-items="[10, 20]"
            :search="search"
            class="elevation-1"
            item-key="username"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">
                  <v-avatar size="32px" style="margin-right: 4px">
                    <img v-if="props.item.avatarURL" :src="props.item.avatarURL" alt="user-avatar">
                    <img v-else src="http://pol.audio/media/user-avatar.png" alt="user-avatar">
                  </v-avatar>
                  <span class="font-weight-bold">{{ props.item.username }}</span>
                </td>
                <td class="text-xs-right">{{ props.item.country }}</td>
                <td class="text-xs-right">
                  <div v-if="props.item.role == '1'">Administrator</div>
                  <div v-if="props.item.role == '0'">Subscriber</div>
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat dark>
                <v-layout>
                  <v-flex>
                    <v-card-text
                      class="text-xs-left"
                    >Choose the action with {{ props.item.username }}</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text class="text-xs-right">
                      <v-btn flat @click="$router.push('/user_'+props.item.username)">
                        <v-icon>account_circle</v-icon>View
                      </v-btn>
                      <v-btn
                        flat
                        @click="onEditClick(props.item.id, props.item.username, props.item.country, props.item.avatarURL, props.item.role)"
                      >
                        <v-icon>edit</v-icon>Edit
                      </v-btn>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </v-data-table>
        </v-layout>
      </v-card>
    </v-flex>
    <!-- Dialog -->
    <v-dialog v-model="editUserDialog" max-width="500px">
      <v-card>
        <v-card-title class="py-4 title">Edit user info</v-card-title>
        <v-container grid-list-sm class="pa-4">
          <form>
            <v-layout row wrap>
              <v-flex xs12 justify-space-between>
                <CountrySelect @changeCountry="onChangeCountry" :_selectedCountry="country"/>
              </v-flex>
              <v-flex class="text-lg-right" justify-start xs12>Select role
                <v-radio-group v-model="role">
                  <v-radio :label="`Administrator`" :value="'1'"></v-radio>
                  <v-radio :label="`Subscriber`" :value="'0'"></v-radio>
                </v-radio-group>
              </v-flex>
            </v-layout>
          </form>
          <message/>
        </v-container>
        <v-card-actions>
          <v-btn color="red darken-2" flat @click.stop="editUserDialog=false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-2"
            @click="update(userId, username, country, avatarURL, role)"
            dark
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import fb from '@/firebase/config.js'
import updateUser from '@/mixins/users/updateUser.js'
import isAdminGuard from '@/mixins/isAdminGuard.js'
import message from '@/components/Message.vue'

export default {
  name: 'Users',
  data() {
    return {
      users: [],
      userId: '',
      username: '',
      country: '',
      avatarURL: '',
      role: '',
      editUserDialog: false,
      confirmDialog: false,
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
  watch: {
    isAdmin(newVal, oldVal) {
      if (newVal) {
        this.getUsers()
      }
    }
  },
  computed: {
    userRole() {
      if (this.$store.getters.userData) return this.$store.getters.userData.role
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    onEditClick(userId, username, country, avatarURL, role) {
      this.userId = userId
      this.username = username
      this.country = country
      this.role = role
      this.avatarURL = avatarURL
      this.editUserDialog = true
    },
    onChangeCountry(val) {
      this.country = val
    },
    getUsers() {
      this.$store.commit('set', { type: 'loading', val: true })
      var usersArr = []
      fb.usersCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          usersArr.push(doc.data())
        })
        this.users = usersArr
        this.$store.commit('set', { type: 'loading', val: false })
      })
    }
  },
  components: {
    CountrySelect,
    message
  },
  mixins: [updateUser, isAdminGuard]
}
</script>
