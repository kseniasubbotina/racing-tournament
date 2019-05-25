<template>
  <div>
    <ActiveChampionships/>
  </div>
</template>

<script>
import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships.vue'
export default {
  name: 'user-overview',
  components: {
    ActiveChampionships
  }
}
</script>
