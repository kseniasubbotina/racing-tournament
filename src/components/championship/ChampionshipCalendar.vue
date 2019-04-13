<template>
  <div>
    <v-layout wrap>
      <v-flex xs12 v-for="stage in _championship.calendar" :key="stage.id">
        <CalendarItem :_stage="stage" :_drivers="_championship.drivers"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import CalendarItem from '@/components/championship/CalendarItem.vue'
export default {
  name: 'ChampionshipCalendar',
  props: {
    _championship: Object
  },
  components: {
    CalendarItem
  }
}
</script>