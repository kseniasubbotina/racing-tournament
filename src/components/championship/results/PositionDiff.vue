<template>
  <v-layout :class="differenceClass" xs1 justify-center align-center>
    <v-icon v-if="posDifference > 0" :class="differenceClass">keyboard_arrow_up</v-icon>
    <v-icon v-else-if="posDifference < 0" :class="differenceClass">keyboard_arrow_down</v-icon>
    <v-icon v-else>keyboard_arrow_right</v-icon>
    {{posDifference}}
  </v-layout>
</template>

  <script>
  export default {
    name: 'PositionDiff',
    props: {
      _start: Number,
      _finish: Number
    },
  computed: {
    posDifference () {
      return this._start - this._finish
    },
    differenceClass () {
      if (this.posDifference > 0) {
        return 'green--text'
      } else if (this.posDifference < 0) {
        return 'red--text'
      } else {
        return ''
      }
    }
  }
  }
  </script>