<template>
  <div class="home">
    <template>
      <Intro v-if="!isLoggedIn"/>
    </template>
    <ActiveChampionships
      v-if="isLoggedIn && currentUser"
      :showMessage="false"
      :userData="currentUser"
    />
    <championships :showAddButton="false"/>
  </div>
</template>

<script>
  import championships from '@/views/championships/Championships'
  import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships'
  import Intro from '@/components/Intro.vue'

  export default {
  name: 'home',
  computed: {
    currentUser () {
      return this.$store.getters.userData
    },
    isLoggedIn () {
      return this.$store.getters.user ? true : false
    }
  },
  components: {
    championships,
    ActiveChampionships,
    Intro
  }
}
</script>
