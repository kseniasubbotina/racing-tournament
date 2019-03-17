<template>
  <div>
    <h2>Calendar</h2>
    <v-layout wrap justify-center>
      <CalendarItem
        v-for="stage in _championship.calendar"
        :key="stage.documentId"
        :_stage="stage"
      />
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