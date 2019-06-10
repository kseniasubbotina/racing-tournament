<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <v-img style="border-radius: 100%" width="200" :src="data.image" aspect-ratio="1"></v-img>
      <img :src="data.image" alt>
    </v-flex>
    <v-flex class="subheading">{{data.name}}</v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    data: Object
  }
}
</script>

