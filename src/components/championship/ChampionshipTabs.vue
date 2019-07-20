<template>
  <v-flex xs12>
    <v-tabs touchless show-arrows>
      <v-tabs-slider color="red"></v-tabs-slider>
      <template v-for="item in tabs">
        <v-tab v-if="isTabVisible(item.public)" :key="item.name">{{ item.name }}</v-tab>
      </template>
      <v-tabs-items>
        <v-tab-item v-for="item in tabs" :id="item.name" :key="item.name">
          <v-card flat class="pa-1">
            <component
              :is="item.componentName"
              :_drivers="_drivers"
              :_championship="_championship"
              :_results="_results"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-flex>
</template>

<script>
import DriversManager from '@/components/championship/DriversManager.vue'
import ChampionshipCalendar from '@/components/championship/ChampionshipCalendar.vue'
import ChampionshipStandings from '@/components/championship/ChampionshipStandings.vue'
export default {
  name: 'ChampionshipTabs',
  data() {
    return {
      tabs: [
        {
          name: 'Standings',
          componentName: 'ChampionshipStandings',
          public: true
        },
        {
          name: 'Results',
          componentName: 'ChampionshipCalendar',
          public: true
        },
        // {
        //   name: 'Statistic',
        //   componentName: '',
        //   public: true
        // },
        {
          name: 'Manage drivers',
          componentName: 'DriversManager',
          public: false
        }
      ]
    }
  },
  props: {
    _results: Object,
    _championship: Object,
    _drivers: Object,
    isAdmin: Boolean,
    isAuthor: Boolean
  },
  methods: {
    isTabVisible (isPublic) {
      if(isPublic) {
        return true
      } else if(this.isAdmin || this.isAuthor) {
        return true
      } else {
        return false
      }
    }
  },
  components: {
    ChampionshipCalendar,
    ChampionshipStandings,
    DriversManager
  }
}
</script>
