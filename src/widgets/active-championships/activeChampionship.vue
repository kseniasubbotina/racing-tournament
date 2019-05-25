<template>
  <v-card>
    <v-card-title>{{championshipName}}</v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex>
          <div class>Team:</div>
          <img :src="team.teamLogo" alt width="150">
        </v-flex>
        <v-flex>pos</v-flex>
        <v-flex>points</v-flex>
        <v-flex>teammate</v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'activeChampionship',
  props: {
    championship: Object,
    userId: String
  },
  computed: {
    championshipName () {
      return this.championship.championship.info.name
    },
    team () {
      return this.championship.drivers[this.userId].team
    }
  }
}
</script>
