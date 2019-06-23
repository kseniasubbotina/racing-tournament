<template>
  <v-layout row wrap>
    <!--  -->
    <!-- <v-flex xs12 sm3 class="text-xs-center">
      <v-layout d-block pa-1>
        <v-flex>
          <v-avatar size="100">
            <img v-if="_userData.avatarURL" :src="_userData.avatarURL" alt>
            <img v-else src="http://pol.audio/media/user-avatar.png" alt>
          </v-avatar>
        </v-flex>
        <v-flex>
          <h2>{{_userData.username}}</h2>
        </v-flex>
        <v-layout align-center justify-center>
          <CountryFlag class="mx-2" :_country="_userData.country" :_width="30"/>
          <span class="subheading">{{_userData.country}}</span>
        </v-layout>
      </v-layout>
    </v-flex>-->
    <!--  -->
    <v-flex>
      <ActiveChampionships :isGuest="isGuest" :userData="_userData"/>
    </v-flex>
  </v-layout>
</template>

<script>
// import CountryFlag from '@/components/CountryFlag.vue'

import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships.vue'
export default {
  name: 'user-overview',
  props: {
    _userData: Object,
    isGuest: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ActiveChampionships
    // CountryFlag
  }
}
</script>
