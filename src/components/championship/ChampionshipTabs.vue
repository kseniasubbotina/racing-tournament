<template>
  <v-flex xs12>
    <v-tabs show-arrows>
      <v-tabs-slider color="red"></v-tabs-slider>
      <v-tab v-for="item in tabs" :key="item.name">{{ item.name }}</v-tab>
      <v-tabs-items>
        <v-tab-item v-for="item in tabs" :id="item.name" :key="item.name">
          <v-card flat class="pa-1">
            <component :is="item.componentName" :_championship="_championship"/>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-flex>
</template>

<script>
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
          name: 'Calendar',
          componentName: '',
          public: true
        },
        {
          name: 'Statistic',
          componentName: '',
          public: true
        }
      ]
    }
  },
  props: {
    _championship: Object
  },
  components: {
    ChampionshipStandings
  }
}
</script>
