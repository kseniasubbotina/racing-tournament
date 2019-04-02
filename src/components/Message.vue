<template>
  <v-layout>
    {{dialog}}
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <!-- <v-card-title class="headline">Use Google's location service?</v-card-title> -->
        <v-card-text>
          <span class="green--text">{{message.success}}</span>
          <span class="red--text">{{message.error}}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Disagree</v-btn>

          <v-btn color="green darken-1" flat="flat" @click="dialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-flex>
      <!-- <span class="green--text">{{message.success}}</span>
      <span class="red--text">{{message.error}}</span>-->
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
  // watch: {
  //   message (val) {
  //     debugger
  //     if (val.success || val.error) {
  //       this.dialog = true
  //     } else {
  //       this.dialog = false
  //     }
  //   }
  // },
  computed: {
    message () {
      this.dialogShow(this.$store.getters.message)
      return this.$store.getters.message
    }
  },
  beforeDestroy () {
    this.clearMessage()
  },
  methods: {
    dialogShow (val) {
      debugger
      if (val.success || val.error) {
        this.dialog = true
      } else {
        this.dialog = false
      }
    },
    clearMessage () {
      this.$store.commit('set', {type: 'message', val: {error: '', success: ''}})
    }
  }
}
</script>
