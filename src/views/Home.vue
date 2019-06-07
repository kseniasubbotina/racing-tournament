<template>
  <div class="home">
    <template>
      <Intro v-if="!currentUser"/>
    </template>
    <ActiveChampionships v-if="currentUser" :userData="currentUser"/>
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
    }
  },
  components: {
    championships,
    ActiveChampionships,
    Intro
  }
}
</script>
