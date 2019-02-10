<template>
  <div>
    <v-card>
      <v-card-title class="py-4 title">Message for author</v-card-title>
      <v-divider></v-divider>
      <v-container grid-list-sm class="pa-4">
        <v-layout row wrap>
          <v-flex xs12 justify-space-between>
            <v-textarea
              name="Message"
              label="Message"
              v-model="message"
              hint="Required"
              v-validate="'max:50|required'"
              :error-messages="errors.collect('Message')"
              counter="50"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-layout>
          <v-spacer></v-spacer>
          <v-btn @click="$emit('close')" flat>Close</v-btn>
          <v-btn @click="sendReject" flat color="success">Send</v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>
 <script>
export default {
  name: 'RejectChampionship',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    sendReject() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$emit('sendReject', this.message)
        }
      })
    }
  }
}
</script>
 