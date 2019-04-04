<template>
  <v-layout>
    <v-flex>
      <v-alert v-if="message" :value="true" :type="message.type">{{message.text}}</v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'message',
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    message () {
      if(this.$store.getters.message.error) {
        return {type: 'error', text: this.$store.getters.message.error}
      } else if (this.$store.getters.message.success) {
        return {type: 'success', text: this.$store.getters.message.success}
      } else {
        return null
      }
    }
  },
  beforeDestroy () {
    this.clearMessage()
  },
  methods: {
    clearMessage () {
      this.$store.commit('setMessage', { type: 'error', text: '' })
      this.$store.commit('setMessage', { type: 'success', text: '' })
    }
  }
}
</script>
