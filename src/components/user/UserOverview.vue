<template>
  <div>
    <ActiveChampionships :isGuest="isGuest" :userData="_userData"/>
  </div>
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
