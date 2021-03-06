<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-card-title justify-end class="py-2 title">All teams
          <v-btn color="success" flat @click.stop="openTeamFormDialog">
            <i class="material-icons">add</i>Add new
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
            :rows-per-page-items="[10, 20]"
            :loading="loading"
            :search="search"
            class="elevation-1"
            item-key="name"
          >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
              <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-left">
                  <v-layout align-center justify-start>
                    <img
                      v-if="props.item.teamLogo"
                      :src="props.item.teamLogo"
                      width="100px"
                      align="middle"
                      style="margin-right: 5px"
                    >
                    {{ props.item.name }}
                  </v-layout>
                </td>
                <td class="text-xs-right">{{ props.item.seria }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-card flat dark>
                <v-layout>
                  <v-flex>
                    <v-card-text class="text-xs-left">Choose the action with {{ props.item.name }}</v-card-text>
                  </v-flex>
                  <v-flex>
                    <v-card-text class="text-xs-right">
                      <v-btn flat @click.stop="openTeamFormDialog(props.item)">
                        <v-icon>edit</v-icon>Edit
                      </v-btn>
                      <v-btn color="red" flat @click.stop="deleteTeam(props.item)">
                        <v-icon>delete</v-icon>Delete
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
    <TeamForm @updateTeams="getTeams" :_isNew="isNew"/>
  </v-layout>
</template>

<script>
import TeamForm from '@/components/teams/TeamForm.vue'
import fb from '@/firebase/config.js'
export default {
  name: 'Teams',
  data() {
    return {
      name: '',
      isNew: false,
      teamFormDialog: false,
      search: '',
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
      teams: []
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    this.getTeams()
  },
  methods: {
    openTeamFormDialog(team) {
      if (!team.id) {
        var teamData = {
          name: '',
          seria: '',
          teamLogo: '',
          places: '2'
        }
        this.isNew = true
      } else {
        this.isNew = false
        var teamData = team
      }
      this.$root.$emit('openTeamFormDialog', teamData)
    },
    getTeams() {
      this.$store.commit('set', { type: 'loading', val: true })
      var teamsArr = []
      fb.teamsCollection.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          var data = doc.data()
          data.id = doc.id
          teamsArr.push(data)
        })
        this.teams = teamsArr
        this.$store.commit('set', { type: 'loading', val: false })
      })
    },
    deleteTeam(team) {
      fb.teamsCollection
        .doc(team.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!')
          this.getTeams()
          if (team.teamLogo) {
            fb.storageRef
              .child('team_logos/' + team.id + '/' + team.id + '_logo')
              .delete()
              .then(() => {
                this.$store.commit('setMessage', {
                  type: 'success',
                  text: 'The image has been deleted from server.'
                })
              })
              .catch(error => {
                console.log(error)
                this.$store.commit('setMessage', {
                  type: 'error',
                  text: error.message
                })
              })
          }
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    }
  },
  components: {
    TeamForm
  }
}
</script>
