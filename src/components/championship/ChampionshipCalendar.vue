<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 sm6 v-for="stage in _championship.calendar" :key="stage.id">
        <CalendarItem :_drivers="_drivers" :_stage="stage" :_championship="_championship"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CalendarItem from '@/components/championship/CalendarItem.vue'
export default {
  name: 'ChampionshipCalendar',
  props: {
    _championship: Object,
    _drivers: Object
  },
  components: {
    CalendarItem
  }
}
</script>