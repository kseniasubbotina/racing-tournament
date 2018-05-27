<template>
  <v-layout>
    <v-flex sx12>
      <v-btn
        color="success" :to="{name: 'createChampionship'}">Add championship</v-btn>
    </v-flex>
    <router-view/>
  </v-layout>
</template>

<script>

export default {
  name: 'Championships'
}
</script>
