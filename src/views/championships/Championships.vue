<template>
  <v-layout wrap>
    <v-flex xs4 pa-1>
      <v-card color="pink darken-1" class="white--text">
        <v-card-title primary-title>
          <div class="headline">Championship #1</div>
          <div>F1 2017 championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark>Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4 pa-1>
      <v-card color="grey" class="white--text">
        <v-card-title primary-title>
          <div class="headline">Championship #2</div>
          <div>F1 2017 championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark>Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs4 pa-1>
      <v-card color="blue" class="white--text">
        <v-card-title primary-title>
          <div class="headline">Championship #3</div>
          <div>Project Cars championship - no assists</div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat dark>Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-layout>
      <v-flex sx12>
        <v-btn
        color="success" :to="{name: 'createChampionship'}">Add championship</v-btn>
      </v-flex>
    </v-layout>

    <router-view/>
  </v-layout>
</template>

<script>

export default {
  name: 'Championships'
}
</script>
