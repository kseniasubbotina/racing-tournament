<template>
  <v-select
  v-validate="'required'" type="text" name="name" :error-messages="errors.collect('name')"
    :items="series"
    label="Seria"
    autocomplete
    v-model="seria"
  ></v-select>
</template>

<script>
export default {
  name: 'CountrySelector',
  data: function () {
    return {
    seria: null,
    series: ['Rally', 'Open Wheels']
    }
  },
  watch: {
    seria: function(nextVal, prevVal) {
      this.$emit('changeSeria', nextVal)
    }
  }
}
</script>
