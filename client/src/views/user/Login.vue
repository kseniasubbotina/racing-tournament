<template>
  <v-flex xs12 sm6>
    <v-card>
      <v-card-title class="py-4 title">
        Login
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 justify-space-between>
              <v-text-field label="Email" v-model="email" v-validate="'required|email'" type="text" name="email" :error-messages="errors.collect('email')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
              v-model="password"
              :append-icon="show ? 'visibility_off' : 'visibility'"
              v-validate="{required: true, min: 6, max: 25 }"
              :type="show ? 'text' : 'password'"
              label="Password"
              name="password" 
              :error-messages="errors.collect('password')"
              counter
              @click:append="show = !show"
            ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
      <message />
      <v-card-actions>
        <v-btn to="register" color="primary" flat>Create account</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark  @click="submit">submit</v-btn>
      </v-card-actions>
      <v-flex v-if="loading">
        <v-progress-linear ma-0 :indeterminate="true"></v-progress-linear>
      </v-flex>
    </v-card>  
  </v-flex>
</template>

<script>
import firebase from 'firebase'
import message from '@/components/Message.vue'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
      show: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    submit: function (){
      let router = this.$router
      this.$validator.validate().then(result => {
        if(result) {
          let credentials = {
          "email": this.email,
          "password": this.password
          }
          this.$store.dispatch('signIn', credentials)
        }
      })
    }
  },
  watch: {
    user (newVal, oldVal) {
      if (newVal && newVal !== undefined) {
        this.$router.push('/user_' + this.user.id)
      }
    }
  },
  components: {
    message
  }
}
</script>
