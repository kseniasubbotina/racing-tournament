<template>
  <v-layout>
    <v-flex>
      <v-card flat>
        <v-layout>
        <v-flex sm5 xs12 ma-2>
          <v-layout d-block pa-1>
          <v-flex>
            <v-avatar size="100">
              <img src="https://cdn-5.motorsport.com/images/amp/Y9oMo9q0/s6/f1-hungarian-gp-2017-fernando-alonso-mclaren.jpg" alt="">
            </v-avatar>
          </v-flex>
          <v-flex>
            <h2>Name</h2>
          </v-flex>
          <v-flex>
            Country
          </v-flex>
          Rating #7
          </v-layout>
        </v-flex>
        <v-flex ma-2 xs12>
          <v-flex>
            <v-tabs
                slot="extension"
                v-model="tab"
                color="light"
                grow
              >
              <v-tabs-slider color="blue"></v-tabs-slider>
              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
              </v-flex>
              <v-flex>
              <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item">
                <v-card flat>
                  <v-card-text>{{ tabContent }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
        </v-flex>
      </v-layout>
      </v-card>
      
    </v-flex>
  </v-layout>
  
</template>

<script>
export default {
  name: 'UserProfile',
  data () {
      return {
        tab: null,
        items: [
          'Overview', 'Statistic', 'Activity', 'Settings'
        ],
        tabContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
  }
}
</script>