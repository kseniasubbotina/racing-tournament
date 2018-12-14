<template>
  <v-dialog v-model="confirmDialog" max-width="500px">
    <v-card>
      <v-card-title class="py-4 title">Please confirm</v-card-title>
      <v-divider></v-divider>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 justify-space-between>{{_message}}</v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-layout>
          <v-btn color="red darken-2" flat @click.stop="confirmDialog=false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="confirm">
            <v-icon>delete</v-icon>Delete
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Confirmation',
  data() {
    return {
      confirmDialog: false,
      deleteData: null
    }
  },
  props: {
    _message: String
  },
  mounted() {
    this.$root.$on('confirmDeletion', this.openDialog)
  },
  methods: {
    openDialog(data) {
      this.confirmDialog = true
      this.deleteData = data
    },
    confirm() {
      this.$emit('confirmed', this.deleteData)
      this.confirmDialog = false
    }
  }
}
</script>
