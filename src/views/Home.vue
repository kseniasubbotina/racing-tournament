<template>
  <div class="home">
    <ActiveChampionships :userData="currentUser"/>
    <championships :showAddButton="false"/>
  </div>
</template>

<script>
import championships from '@/views/championships/Championships'
import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships'
export default {
  name: 'home',
  computed: {
    currentUser () {
      return this.$store.getters.userData
    }
  },
  components: {
    championships,
    ActiveChampionships
  }
}
</script>
