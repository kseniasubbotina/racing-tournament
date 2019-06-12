<template>
  <v-card flat>
    <v-layout column justify-center align-center>
      <v-flex>
        <v-img style="border-radius: 100%" top width="200" :src="data.image" aspect-ratio="1"></v-img>
      </v-flex>
      <v-card-title>
        <v-flex class="subheading">{{data.name}}</v-flex>
      </v-card-title>
      <v-card-text>
        <v-flex>{{data.about}}</v-flex>
        <v-flex>E-mail: {{data.mail}}</v-flex>
        <v-flex>
          GitHub:
          <a :href="data.github">{{data.github}}</a>
        </v-flex>
      </v-card-text>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    data: Object
  }
}
</script>

