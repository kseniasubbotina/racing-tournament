<template>
  <div>
    <v-layout>
      <v-flex>
        <h1>{{_championship.info.name}}</h1>
        <v-spacer></v-spacer>
      </v-flex>
      <v-flex>Approved: {{_championship.approved}}</v-flex>
    </v-layout>
    <v-layout column>
      <h3>{{_championship.info.game.name}}</h3>
      {{_championship.info.description}}
      Drivers: {{_championship.drivers.length}}/{{_championship.info.playersCount}}
    </v-layout>
    <div
      v-for="stage in _championship.calendar"
      :key="stage.documentId"
    >{{stage.track}} - {{stage.date}} {{stage.time}}</div>
  </div>
</template>

<script>
export default {
  name: 'ChampionshipInfo',
  props: {
    _championship: Object
  }
}
</script>

