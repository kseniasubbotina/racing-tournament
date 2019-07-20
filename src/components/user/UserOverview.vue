<template>
  <v-layout row wrap>
    <v-flex>
      <ActiveChampionships :isGuest="isGuest" :userData="_userData"/>
    </v-flex>
  </v-layout>
</template>

<script>

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
  }
}
</script>
