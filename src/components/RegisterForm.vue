<template>
  <v-flex xs12 sm8>
    <v-card>
      <v-card-title class="py-4 title">Create your account</v-card-title>
      <v-container grid-list-sm class="pa-4">
        <form>
          <v-layout row wrap>
            <v-flex xs12 sm6 justify-space-between>
              <v-tooltip top>
                <v-text-field
                  slot="activator"
                  label="Username"
                  v-model="username"
                  v-validate="'required|min:3'"
                  type="text"
                  name="username"
                  :error-messages="errors.collect('username')"
                ></v-text-field>
                <span>You will not be able to change your username after registering.</span>
              </v-tooltip>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field
                label="E-mail"
                v-model="email"
                v-validate="'required|email'"
                type="email"
                name="email"
                :error-messages="errors.collect('email')"
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
            <v-flex xs12 sm6>
              <CountrySelect @changeCountry="onChangeCountry"/>
            </v-flex>
          </v-layout>
        </form>
        <vue-recaptcha
          ref="recaptcha"
          class="captcha-container"
          :sitekey="sitekey"
          @verify="onCaptchaSuccess"
          @expired="onCaptchaExpired"
        />
        <message/>
      </v-container>
      <v-card-actions>
        <v-btn flat color="error" @click="clear">clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn 
          color="red darken-2"
          :dark="!isSubmitDisabled"
          :disabled="isSubmitDisabled"
          @click="submit">
            submit
        </v-btn>
      </v-card-actions>
      <v-flex v-if="loading">
        <v-progress-linear ma-0 :indeterminate="true"></v-progress-linear>
      </v-flex>
      <v-card color flat>
        <v-flex pa-3>Already have an account?
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
.captcha-container {
  margin-top: 20px;
}
</style>

<script>
import CountrySelect from '@/components/CountrySelect.vue'
import message from '@/components/Message.vue'
import fb from '@/firebase/config.js'
import VueRecaptcha from 'vue-recaptcha'

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
    sitekey: '6Lev1Z4UAAAAAGPygpI3kfg-qT8giGp0xw97gzXC',
    isSubmitDisabled: true
  }),
  computed: {
    user() {
      return this.$store.getters.user
    },
    userData() {
      if (this.$store.getters.userData) return this.$store.getters.userData
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch: {
    userData(newVal, oldVal) {
      if (newVal && newVal !== undefined) {
        this.$router.push('/user_' + this.userData.username)
      }
    }
  },
  methods: {
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    },
    onCaptchaSuccess () {
      this.isSubmitDisabled = false
    },
    onChangeCountry(val) {
      this.country = val
    },
    submit() {
      this.$validator.validate().then(result => {
        if (result) {
          this.$store.commit('set', { type: 'loading', val: true })
          fb.usersCollection
            .doc(this.username)
            .get()
            .then(doc => {
              this.$store.commit('set', { type: 'loading', val: false })
              if (doc.exists) {
                this.$store.commit('setMessage', {
                  type: 'error',
                  text: 'The username is already in use by another account.'
                })
              } else {
                let credentials = {
                  email: this.email,
                  password: this.password,
                  username: this.username,
                  country: this.country || ''
                }
                this.$store.dispatch('signUp', credentials)
              }
            })
            .catch(err => {
              this.$store.commit('set', { type: 'loading', val: false })
              this.$store.commit('setMessage', {
                type: 'error',
                text: err.message
              })
            })
        }
      })
    },
    clear() {
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
    message,
    VueRecaptcha
  }
}
</script>
