<template>
  <div>
    <h2>Calendar</h2>
    <div
      v-for="stage in _championship.calendar"
      :key="stage.documentId"
    >{{stage.country}} - {{stage.time}}</div>
  </div>
</template>

<script>
export default {
  name: 'ChampionshipCalendar',
  props: {
    _championship: Object
  }
}
</script>