<template>
  <div>
    <ActiveChampionships :userId="userId"/>
  </div>
</template>

<script>
import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships.vue'
export default {
  name: 'user-overview',
  props: {
    userId: String
  },
  components: {
    ActiveChampionships
  }
}
</script>
