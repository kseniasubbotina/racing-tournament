<template>
  <div>
    <ActiveChampionships :isGuest="isGuest" :userData="_userData"/>
    <CreatedChampionships :isGuest="isGuest" :userData="_userData"/>
    <ChampionshipsHistory :isGuest="isGuest" :userData="_userData"/>
  </div>
</template>

<script>
import ActiveChampionships from '@/widgets/active-championships/ActiveChampionships.vue'
import CreatedChampionships from '@/widgets/created-championships/CreatedChampionships.vue'
import ChampionshipsHistory from '@/widgets/championships-history/ChampionshipsHistory.vue'
export default {
  name: 'UserChampionships',
  props: {
    _userData: Object,
    isGuest: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ActiveChampionships,
    CreatedChampionships,
    ChampionshipsHistory
  }
}
</script>
