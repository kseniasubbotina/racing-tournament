<template>
  <div>
    <v-layout column>
      <!-- <v-data-table
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
              <span class="font-weight-bold">1</span>
            </td>
            <td class="text-xs-center">
              <span class="font-weight-bold">{{ props.item.username }}</span>
            </td>
            <td class="text-xs-center">{{ props.item.team.name }}</td>
            <td class="text-xs-center" v-for="stage in _championship.calendar" :key="stage.id">
              <span
                v-if="_results[stage.trackDocumentId][props.item.userId]"
              >{{_results[stage.trackDocumentId][props.item.userId].points}}</span>
            </td>
            <td class="text-xs-center">total pts</td>
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
      </v-data-table>-->
      <v-layout align-center>
        <v-flex xs1>Position</v-flex>
        <v-flex xs2>Username</v-flex>
        <v-flex xs2>Team</v-flex>
        <v-flex xs1 v-for="header in headers" :key="header.id">
          <CountryFlag v-if="header.value === 'country'" :_country="header.text" :_width="30"/>
          {{header.text}}
        </v-flex>
      </v-layout>
      <v-layout v-for="driver in _drivers" :key="driver.id">
        <v-flex xs1>1</v-flex>
        <v-flex xs2>{{driver.username}}</v-flex>
        <v-flex xs2>{{driver.team.name}}</v-flex>
        <v-flex
          xs1
          v-if="result[driver.userId]"
          v-for="result in _results"
          :key="result.id"
        >{{result[driver.userId]['points']}}</v-flex>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import CountryFlag from '@/components/CountryFlag.vue'
export default {
  name: 'ChampionshipStandings',
  data() {
    return {
      search: ''
    }
  },
  props: {
    _championship: Object,
    _drivers: Object,
    _results: Object
  },
  computed: {
    drivers() {
      if (this._drivers) {
        return Object.values(this._drivers)
      }
    },
    headers() {
      let headers = [
        // {
        //   text: 'Pos',
        //   align: 'center',
        //   sortable: true,
        //   value: 'pos'
        // },
        // {
        //   text: 'Username',
        //   align: 'center',
        //   sortable: false,
        //   value: 'username'
        // },
        // {
        //   text: 'Team',
        //   align: 'center',
        //   sortable: false,
        //   value: 'team'
        // }
      ]
      for (let i = 0; i < this._championship.calendar.length; i++) {
        let calendarHeaderItem = {
          text: this._championship.calendar[i].stageCountry,
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
    },
    items () {
      // 
    }
  },
  components: {
    CountryFlag
  }
}
</script>