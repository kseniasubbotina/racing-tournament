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
              <v-text-field label="Username" v-model="username" v-validate="'required'" type="text" name="username" :error-messages="errors.collect('username')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" v-model="password" v-validate="'required'" type="password" name="password" :error-messages="errors.collect('password')">
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
    </v-card>  
  </v-flex>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
    password: ''
    }
  },
  methods: {
    submit: function (){
      if (this.$validator.validateAll()) {
        console.log('Validated')
      }
    }
  }
}
</script>
