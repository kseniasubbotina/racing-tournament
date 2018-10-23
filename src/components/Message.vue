<template>
  <v-layout>
    <v-flex>
      <span class="green--text">{{message.success}}</span>
      <span class="red--text">{{message.error}}</span>
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
  },
  beforeDestroy () {
    this.clearMessage()
  },
  methods: {
    clearMessage () {
      this.$store.commit('set', {type: 'message', val: {error: '', success: ''}})
    }
  }
}
</script>
