<template>
  <v-dialog v-model="confirmDialog" max-width="500px">
    <v-card>
      <v-card-title class="py-4 title">Please confirm</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 justify-space-between>{{_message}}</v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-layout justify-center>
          <v-btn color="red darken-2" flat @click.stop="confirmDialog=false">Close</v-btn>
          <v-btn dark color="red" @click="$emit('confirmed')">
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
      confirmDialog: false
    }
  },
  props: {
    _message: String
  },
  created() {
    this.$on('confirmDeletion', (this.confirmDialog = true))
  }
}
</script>
