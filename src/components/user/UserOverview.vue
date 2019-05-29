<template>
  <div>
    <ActiveChampionships :userData="_userData"/>
  </div>
</template>

<script>
import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships.vue'
export default {
  name: 'user-overview',
  props: {
    _userData: Object
  },
  components: {
    ActiveChampionships
  }
}
</script>
