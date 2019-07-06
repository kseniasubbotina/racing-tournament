<template>
  <div class="home">
    <template>
      <Intro v-if="!isLoggedIn"/>
    </template>
    <ActiveChampionships
      v-if="isLoggedIn && currentUser"
      :showMessage="false"
      :userData="currentUser"
    />
    <v-layout align-center>
      <v-flex shrink>
        <h3 class="my-3">Available Championships</h3>
      </v-flex>
      <v-flex shrink>
        <v-btn to="/championships" depressed small>see all</v-btn>
      </v-flex>
    </v-layout>
    <ChampionshipsList :limit="6" :showAddButton="false"/>
  </div>
</template>

<script>
  import ChampionshipsList from '@/components/championship/ChampionshipsList.vue'
  import championships from '@/views/championships/Championships'
  import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships'
  import Intro from '@/components/Intro.vue'

  export default {
  name: 'home',
  computed: {
    currentUser () {
      return this.$store.getters.userData
    },
    isLoggedIn () {
      return this.$store.getters.user ? true : false
    }
  },
  components: {
    ChampionshipsList,
    championships,
    ActiveChampionships,
    Intro
  }
}
</script>
