<template>
<v-flex xs8>
<v-card>
        <v-card-title class="grey lighten-4 py-4 title">
          Create your account
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-layout row wrap>
              <v-flex xs12 sm6 justify-space-between>
              <v-text-field label="Username" v-model="username" :rules="usernameRules" :counter="3" required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="E-mail" v-model="email" :rules="emailRules" required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field :rules="passwordRules" label="Password" v-model="password" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field label="Repeat password" v-model="repeatPassword" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-text-field :rules="usernameRules" label="Name" v-model="name" required>
              </v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
        <CountrySelect @changeCountry="onChangeCountry"/>
      </v-flex>
            <v-flex xs12 sm3>
              <v-text-field  :counter="3" label="Short name" v-model="shortName" required>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-btn @click="clear">clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="submit" :disabled="!valid">submit</v-btn>
      </v-card-actions>
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
      usernameRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [],
      repeatPassword: '',
      country: '',
      name: '',
      shortName: ''
    }),

    methods: {
      onChangeCountry (val) {
        this.country = val
      },
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/api/submit', {
            username: this.username,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    components: {
      CountrySelect
    }
  }
</script>
