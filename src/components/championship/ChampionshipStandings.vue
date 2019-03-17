<template>
  <div>
    <v-layout column>
      <v-data-table
        :headers="headers"
        :items="drivers"
        :loading="false"
        :rows-per-page-items="[10, 20]"
        :search="search"
        class="elevation-1"
        item-key="username"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-center">
              <span class="font-weight-bold">{{ props.item.username }}</span>
            </td>
            <td class="text-xs-center">{{ props.item.team.name }}</td>
            <td class="text-xs-center" v-for="stage in _championship.calendar" :key="stage.id">
              results.
              username.
              Track
            </td>
            <td class="text-xs-center">-</td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-layout>
              <v-flex>
                <v-card-text class="text-xs-left">Choose the action with {{ props.item.username }}</v-card-text>
              </v-flex>
              <v-flex>
                <v-card-text class="text-xs-right">
                  <v-btn flat @click="$router.push('/user_'+props.item.username)">
                    <v-icon>account_circle</v-icon>View
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
  </div>
</template>

<script>
export default {
  name: 'ChampionshipStandings',
  data() {
    return {
      search: ''
    }
  },
  props: {
    _championship: Object
  },
  computed: {
    drivers() {
      let drivers = []
      for (let driver in this._championship.drivers) {
        drivers.push(this._championship.drivers[driver])
      }
      return drivers
    },
    headers() {
      let headers = [
        {
          text: 'Username',
          align: 'center',
          sortable: false,
          value: 'username'
        },
        {
          text: 'Team',
          align: 'center',
          sortable: false,
          value: 'team'
        }
      ]
      for (let i = 0; i < this._championship.calendar.length; i++) {
        let calendarHeaderItem = {
          text: this._championship.calendar[i].country,
          align: 'center',
          sortable: false,
          value: 'country'
        }
        headers.push(calendarHeaderItem)
      }
      let totalColumnHeader = {
        text: 'Total',
        align: 'center',
        sortable: true,
        value: 'total'
      }
      headers.push(totalColumnHeader)
      return headers
    }
  }
}
// results: {
//   championship1: {
//     brazil: {
//       suvorkin: {
//         start: 1,
//         finish: 2,
//         time: 1:21:14,
//         points: 18,
//         team: Ferrari
//       },
//       maxons: {

//       }
//     },
//     USA: {

//     }
//   },
//   championship1: {

//   }
// }
</script>