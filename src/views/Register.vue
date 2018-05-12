<template>
  <v-flex xs8>
    <v-card>
      <v-card-title class="grey lighten-4 py-4 title">
        Create your account
      </v-card-title>
      <v-container grid-list-sm class="pa-4">
        <form>
          <v-layout row wrap>
            <v-flex xs12 sm6 justify-space-between>
              <v-text-field label="Username" v-model="username" v-validate="'required|min:5'" type="text" name="username" :error-messages="errors.collect('username')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="E-mail" v-model="email" v-validate="'required|email'" type="email" name="email" :error-messages="errors.collect('email')"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Password" v-model="password" v-validate="{ is: confirmPassword, required: true, min: 6 }" type="password" name="password" :error-messages="errors.collect('password')">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Confirm password" v-model="confirmPassword" v-validate="'required|min:6'" type="password" name="password_confirmation" :error-messages="errors.collect('password_confirmation')">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Name" v-model="name" v-validate="'required|min:3|alpha'" type="text" name="name" :error-messages="errors.collect('name')">
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <CountrySelect @changeCountry="onChangeCountry"/>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
      <v-card-actions>
        <v-btn flat color="error" @click="clear">clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="submit">submit</v-btn>
      </v-card-actions>
        <v-card color="grey lighten-4" flat>
          <v-flex pa-3>
            Already have an account?
            <v-btn to="login" color="primary" flat>Login</v-btn>
          </v-flex>
        </v-card>
    </v-card>
  </v-flex>
</template>
<script>
import CountrySelect from '@/components/CountrySelect.vue'

export default {
  name: 'register',
  data: () => ({
    valid: true,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    country: ''
  }),
  methods: {
    onChangeCountry (val) {
      this.country = val
    },
    submit () {
      if (this.$validator.validateAll()) {
        console.log('Validated')
      }
    },
    clear () {
      this.name = ''
      this.email = ''
      this.username = ''
      this.password = ''
      this.confirmPassword = ''
      this.country = ''
      this.$validator.reset()
    }
  },
  components: {
    CountrySelect
  }
}
</script>
