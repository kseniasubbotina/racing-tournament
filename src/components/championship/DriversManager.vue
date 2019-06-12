<template>
  <v-layout column>
    <!-- <v-flex v-for="driver in _drivers" :key="driver.userId">
      <v-card class="my-1">
        <v-layout>
          <v-card-text>{{driver.username}} - {{driver.team.name}}</v-card-text>
          <v-btn dark flat color="red">remove</v-btn>
        </v-layout>
      </v-card>
    </v-flex>-->
    <v-data-table
      :headers="headers"
      :items="driversArray"
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
          <td class="text-xs-right">{{ props.item.team.name }}</td>
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
                <v-btn
                  color="red"
                  flat
                  @click="leaveChampionship(_championship, _drivers, props.item.userId)"
                >
                  <v-icon>remove</v-icon>Remove
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
</template>

<script>
import champinship from '@/mixins/championship/championship.js' 
export default {
  name: 'DriversManager',
  data () {
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
    _drivers: Object,
    _championship: Object
  },
  computed: {
    driversArray () {
      return Object.values(this._drivers)
    }
  },
  mixins: [
    champinship
  ]
}
</script>
