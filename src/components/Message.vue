<template>
  <v-layout>
    <v-flex>
      <span v-if="message">{{message}}</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'message',
  computed: {
    message () {
      return this.$store.getters.message
    }
  }
}
</script>
