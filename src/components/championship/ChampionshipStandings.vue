<template>
  <div>
    <v-layout column>
      <v-data-table
        :headers="headers"
        :items="_drivers"
        :loading="false"
        :rows-per-page-items="[10, 20]"
        :search="search"
        class="elevation-1"
        item-key="username"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
        <template slot="items" slot-scope="props">
          <tr @click="props.expanded = !props.expanded">
            <td class="text-xs-left">
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
                <v-card-text class="text-xs-left">Choose the action with {{ props.item.username }}</v-card-text>
              </v-flex>
              <v-flex>
                <v-card-text class="text-xs-right">
                  <v-btn flat @click="$router.push('/user_'+props.item.username)">
                    <v-icon>account_circle</v-icon>View
                  </v-btn>
                  <v-btn flat>
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
  </div>
</template>

<script>
export default {
  name: 'ChampionshipStandings',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Username',
          align: 'left',
          sortable: true,
          value: 'username'
        },
        {
          text: 'Team',
          align: 'right',
          sortable: true,
          value: 'team'
        }
      ]
    }
  },
  props: {
    _drivers: Object
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