<template>
  <v-card>
    <v-container>
      <v-layout justify-center align-center column>
        <h1>Welcome to F1-esport.com</h1>
        <v-flex
          class="text-xs-center subheading mb-3"
        >Take a part in championships or create your own!</v-flex>
        <v-flex>
          <v-btn @click="$router.push('/login')" dark color="green">Login</v-btn>or
          <v-btn @click="$router.push('/register')" dark color="red">Register</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="$router.push('/about')" flat>About the project</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
