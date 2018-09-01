<template>
  <v-flex xs6>
    <v-card>
      <v-card-title class="py-4 title">
        Login
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <form>
          <v-layout row wrap>
            <v-flex xs12 justify-space-between>
              <v-text-field label="Username" v-model="email" v-validate="'required|email'" type="text" name="username" :error-messages="errors.collect('username')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" v-model="password" v-validate="{required: true, min: 6 }" type="password" name="password" :error-messages="errors.collect('password')">
              </v-text-field>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
      <v-card-actions>
        <v-btn to="register" color="primary"  flat>Create account</v-btn>
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

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: '',
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
      let valid = this.$validator.validate().then(function(result) {
          return result
      })
      if (valid) {
        let credentials = {
          "email": this.email,
          "password": this.password
        }
        this.$store.dispatch('signIn', credentials)
      }    
    }
  },
  watch: {
    user (newVal, oldVal) {
      if (newVal && newVal !== undefined) {
        this.$router.push('/user')
      }
    }
  }
}
</script>
