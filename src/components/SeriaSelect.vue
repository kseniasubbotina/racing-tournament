<template>
  <v-autocomplete
    v-validate="'required'"
    type="text"
    name="name"
    :error-messages="errors.collect('name')"
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
      seria: null,
      series: ['F1', 'WEC', 'Rally', 'IndyCar', 'All']
    }
  },
  watch: {
    seria: function(nextVal, prevVal) {
      this.$emit('changeSeria', nextVal)
    }
  }
}
</script>
