<template>
  <v-autocomplete
    :disabled="_disabled"
    v-validate="'required'"
    type="text"
    name="seria"
    :error-messages="errors.collect('Seria')"
    :items="series"
    label="Seria"
    v-model="seria"
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'CountrySelector',
  data: function() {
    return {
      seria: 'F1',
      series: ['F1', 'WEC', 'Rally', 'IndyCar', 'All']
    }
  },
  props: {
    _selectedSeria: String,
    _disabled: Boolean
  },
  watch: {
    seria(nextVal, prevVal) {
      this.$emit('changeSeria', nextVal)
    },
    _selectedSeria(val) {
      if (!val) {
        this.seria = this.series[0]
      } else {
        this.seria = val
      }
    }
  }
}
</script>
