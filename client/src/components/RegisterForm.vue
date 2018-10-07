<template>
    <v-flex xs12 sm8>
    <v-card>
      <v-card-title class="py-4 title">
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
            <!-- <v-flex xs12 sm6>
              <v-text-field label="Confirm password" v-model="confirmPassword" v-validate="'required|min:6'" type="password" name="password_confirmation" :error-messages="errors.collect('password_confirmation')">
              </v-text-field>
            </v-flex> -->
            <!-- <v-flex xs12 sm6>
              <v-text-field label="Name" v-model="name" v-validate="'required|min:3|alpha'" type="text" name="name" :error-messages="errors.collect('name')">
              </v-text-field>
            </v-flex> -->
            <v-flex xs12 sm6>
              <CountrySelect @changeCountry="onChangeCountry"/>
            </v-flex>
          </v-layout>
        </form>
      </v-container>
      <message />
      <v-card-actions>
        <v-btn flat color="error" @click="clear">clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" dark @click="submit">submit</v-btn>
      </v-card-actions>
      <v-flex v-if="loading">
        <v-progress-linear ma-0 :indeterminate="true"></v-progress-linear>
      </v-flex>
        <v-card color="" flat>
          <v-flex pa-3>
            Already have an account?
            <v-btn to="login" color="blue" flat>Login</v-btn>
          </v-flex>
        </v-card>
    </v-card>
  </v-flex>
</template>

<style>
.progress-linear {
  margin: 0 !important;
}
</style>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'
import firebase from 'firebase'
export default {
    name: 'RegisterForm',
    data: () => ({
    valid: true,
    username: '',
    email: '',
    password: '',
    show: false,
    confirmPassword: '',
    name: '',
    country: '',
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (newVal, oldVal) {
      if (newVal && newVal !== undefined) {
        this.$router.push('/user_' + this.user.id)
      }
    }
  },
  methods: {
    onChangeCountry (val) {
      this.country = val
    },
    submit () {
      this.$validator.validate().then(result => {
        if(result) {
          let credentials = {
            email: this.email,
            password: this.password,
            username: this.username,
            country: this.country
          }
        this.$store.dispatch('signUp', credentials) 
        }
      })
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
    CountrySelect,
    message
  }
}
</script>
