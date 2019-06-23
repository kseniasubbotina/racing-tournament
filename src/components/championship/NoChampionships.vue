<template>
  <v-layout>
    <v-card width="100%">
      <v-card-title class="text-xs-center">
        <v-layout column>
          <v-flex>
            <v-icon>block</v-icon>
          </v-flex>
          <v-flex justify-center>There are no championships yet</v-flex>
        </v-layout>
      </v-card-title>
      <v-card-text>
        <v-layout column justify-center>
          <v-btn color="green" dark to="/create">Create a championships</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'NoChampionships'
}
</script>

