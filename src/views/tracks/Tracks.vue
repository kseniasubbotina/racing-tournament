<template>
  <v-layout wrap>
    <v-flex xs12 sm6 md4 pa-1 v-for="item in 4" :key="item.id">
      <v-card>
        <v-card-title primary-title>
          <div class="headline">Track #1</div>
        </v-card-title>
        <v-card-text>
          <div>Track information</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green">View</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        tracks: []
      }
    },
    computed: {
      isLoggedIn () {
        var isLoggedIn = this.$store.getters.user ? true : false
        return isLoggedIn
      },
    }
  }
</script>
